const { customLogger } = require('../../common/logger');
const { copy, getAllCombinations } = require('../../common/tools/utils');

const logger = customLogger('utils');

let cache = new Map();

function getArrayOfCards(cardsCount, card, name) {
    const cardname = Object.keys(cardsCount).find((key) => key.includes(name) || name.includes(key));
    const count = cardsCount[cardname];
    return Array(count).fill(markEtbAndLandType(card));
}

function calculateCMC(cost) {
    return Object.values(cost).reduce((acc, cur) => acc + cur, 0);
}

function isDFC(card) {
    return Boolean(card.card_faces);
}

function canTransform(splitcard) {
    return (
        splitcard.text.toLowerCase().includes(`transform ${splitcard.name}`) ||
        splitcard.text.match(
            /[Ee]xile [\w, ']+, then return (him|her|them) to the battlefield transformed under (his|her|their) owner's control/,
        )
    );
}

function isTransformableCard(card) {
    if (!isDFC(card)) {
        return false;
    }
    return card.card_faces.some((splitcard) => canTransform(splitcard));
}

function isMDFC(card) {
    if (!isDFC(card)) {
        return false;
    }
    return !isTransformableCard(card);
}

function hasTypeLand(card) {
    return card.type.includes('Land');
}

function isPathway(card) {
    return card.card_faces.every((splitcard) => {
        return splitcard.type.includes('Land');
    });
}

function isFastland(text) {
    return RegExp(/enters the battlefield tapped unless you control two or fewer other lands./).test(text);
}

function isVeryFastland(text) {
    return RegExp(/If you control two or more other lands, [\w ]+ enters the battlefield tapped./).test(text);
}

function isSlowland(text) {
    return RegExp(/enters the battlefield tapped unless you control two or more other lands./).test(text);
}

function isFetchland(text) {
    const test =
        /Search your library for an? (basic land|Plains|Island|Swamp|Mountain|Forest)(?: or )?(Plains|Island|Swamp|Mountain|Forest)? card, put it onto the battlefield\s?(tapped)?, then shuffle( your library)?\.(?: Then if you control )?(four or more)?(?: lands, untap that land.)?/;
    const match = text.match(test);
    if (!match) {
        return false;
    }
    if (match[1] === 'basic land') {
        match[1] = 'Basic';
    }
    return match.slice(1, 5).filter((e) => !!e);
}

function isRavland(text) {
    return RegExp(`you may pay \\d life. If you don't, it enters the battlefield tapped.`).test(text);
}

function isCheckLand(text) {
    const test =
        /enters the battlefield tapped unless you control an? (Plains|Island|Swamp|Mountain|Forest)( or an? (Plains|Island|Swamp|Mountain|Forest))?\./;
    const match = text.match(test);
    if (!match) {
        return false;
    }
    return [match[1], match[3]].filter((e) => !!e);
}

function evaluateEtb(text) {
    const fetchlandData = isFetchland(text);
    if (isFetchland(text)) {
        const wouldEtb = fetchlandData.includes('tapped');
        if (fetchlandData.includes('four or more')) {
            return { etbTapped: (lands) => lands.length < 4, fetchland: fetchlandData };
        }
        return { etbTapped: () => wouldEtb, fetchland: fetchlandData };
    }
    const basicEtbTapped = RegExp('(enters|onto) the battlefield tapped').test(text);
    if (!basicEtbTapped) {
        return { etbTapped: () => false };
    }
    if (isFastland(text)) {
        return { etbTapped: (lands, cmc) => lands.length > 3 && cmc > 3 };
    }
    if (isVeryFastland(text)) {
        return { etbTapped: (lands, cmc) => lands.length > 2 && cmc > 2 };
    }
    if (isSlowland(text)) {
        return { etbTapped: (lands) => lands.length < 3 };
    }
    if (isRavland(text)) {
        return { etbTapped: () => false, ravland: true };
    }
    const checkLands = isCheckLand(text);
    if (checkLands) {
        return {
            etbTapped: (lands) => !lands.some((l) => checkLands.some((check) => l.type.includes(check))),
            checkland: true,
        };
    }
    return { etbTapped: () => true };
}

function markEtbAndLandType(card) {
    return {
        ...evaluateEtb(card.text),
        ...card,
    };
}

function hasCorrectColors(lands, spell) {
    const findLandforEachColor = (color) => lands.some((l) => l.colors.includes(color));
    const regularColors = Object.keys(spell.cost).filter((color) => color !== 'generic' && !color.includes('/'));
    const hybridColors = [
        ...new Set(
            Object.keys(spell.cost)
                .filter((color) => color.includes('/'))
                .reduce((acc, cur) => [...acc, ...cur.split('/')], []),
        ),
    ];
    const foundRegularColors = regularColors.every(findLandforEachColor);
    if (!foundRegularColors) {
        return false;
    }
    if (hybridColors.length === 0) {
        return true;
    }
    return hybridColors.some(findLandforEachColor);
}

function hasUntappedLand(lands, spell) {
    return lands.some((l) => l.etbTapped(lands, spell.cmc) === false);
}

function findCorrectLand(lands, color) {
    if (color === 'generic') {
        return lands[0];
    }
    if (color.includes('/')) {
        return lands.find((land) => land.colors.some((c) => color.split('/').includes(c)));
    }
    const exactMatchs = lands.filter((land) => land.colors.length === 1 && land.colors.includes(color));
    if (exactMatchs.length > 0) {
        return exactMatchs[0];
    }
    return lands.find((land) => land.colors.includes(color));
}

/**
 * Evaluate if the cost can be paid with the lands
 * /!\ still basic algorythm for now
 * return true if it can be paid
 * @param lands
 * @param cost
 * @param cmc
 * @returns {boolean}
 */
function evaluateCost(lands, cost, cmc) {
    const colorsToFind = copy(cost);
    const remainingLands = lands.map((l) => copy(l)).sort((land1, land2) => land1.colors.length - land2.colors.length);
    const usedLands = [];
    const sortedLandsToFind = Object.keys(cost).sort((c1, c2) => c1.length - c2.length);
    sortedLandsToFind.forEach((color) => {
        for (let i = 0; i < cost[color]; i++) {
            const foundLand = findCorrectLand(remainingLands, color);
            if (!foundLand) {
                return;
            }
            usedLands.push(
                ...remainingLands.splice(
                    remainingLands.findIndex((l) => l.name === foundLand.name),
                    1,
                ),
            );
            colorsToFind[color]--;
        }
    });
    return Object.values(colorsToFind).every((l) => l === 0) && hasUntappedLand(usedLands, cmc);
}

function canPlaySpellOnCurve(lands, spell) {
    if (!hasCorrectColors(lands, spell)) {
        return false;
    }
    if (!hasUntappedLand(lands, spell)) {
        return false;
    }

    const comb = getAllCombinations(lands).filter((l) => l.length === spell.cmc);
    if (comb.length === 0) {
        return false;
    }
    return comb.some((comb) => evaluateCost(comb, spell.cost, spell.cmc));
}

function cachedCanPlaySpellOnCurve(lands, spell) {
    const key = JSON.stringify([spell.mana_cost, lands.map((l) => l.name).sort()]);
    const value = cache.has(key) ? cache.get(key) : canPlaySpellOnCurve(lands, spell);

    cache.set(key, value);
    return value;
}

function getManaCost(codifiedCmc) {
    const manacost = {};
    if (!codifiedCmc) {
        return manacost;
    }
    const matches = codifiedCmc.substr(1).slice(0, -1).split('}{');

    matches.forEach((val) => {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!parseInt(val)) {
            manacost.generic = parseInt(val);
        } else {
            manacost[val] = (manacost[val] || 0) + 1;
        }
    });
    return manacost;
}

function getCache() {
    return cache;
}

module.exports = {
    hasTypeLand,
    markEtbAndLandType,
    evaluateCost,
    getManaCost,
    cachedCanPlaySpellOnCurve,
    hasCorrectColors,
    getCache,
    findCorrectLand,
    isCheckLand,
    isFetchland,
    isFastland,
    isVeryFastland,
    isSlowland,
    evaluateEtb,
    isDFC,
    isTransformableCard,
    isMDFC,
    isPathway,
    getArrayOfCards,
    calculateCMC,
};
