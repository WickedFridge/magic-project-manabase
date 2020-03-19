const config = require('config');
const { customLogger } = require('../../common/logger');
const { copy, getAllCombinations } = require('../../common/tools/utils');

const logger = customLogger('utils');

function hasTypeLand(card) {
    return RegExp('Land').test(card.type);
}

function markEtb(card) {
    return {
        etbTapped: RegExp('enters the battlefield tapped').test(card.text),
        ...card,
    }
}

function hasCorrectColors(lands, spell) {
    return Object.keys(spell.cost).filter(color => color !== 'generic').every(color => {
        return lands.some(l => l.colors.includes(color));
    });
}

function hasUntappedLand(lands) {
    return lands.some(l => l.etbTapped === false);
}

/**
 * Evaluate if the cost can be paid with the lands
 * /!\ still basic algorythm for now
 * return true if it can be paid
 * @param lands
 * @param cost
 * @returns {boolean}
 */
function evaluateCost(lands, cost) {
    const colorsToFind = copy(cost);
    const remainingLands = copy(lands).sort((land1, land2) => land1.colors.length - land2.colors.length);
    const usedLands = [];
    const sortedLandsToFind = Object.keys(cost).sort((c1, c2) => c1.length - c2.length);
    sortedLandsToFind.forEach((color) => {
        for(let i=0; i<cost[color]; i++) {
            // if we look for generic, take any land
            if (color === 'generic') {
                usedLands.push(remainingLands.pop());
                colorsToFind[color]--;
                break;
            }
            // look for a land that exactly match the color
            const exactMatchs = remainingLands.filter(land => land.colors.length === 1 && land.colors.includes(color));
            if (exactMatchs.length > 0) {
                const foundLand = exactMatchs.pop();
                usedLands.push(...remainingLands.splice(remainingLands.findIndex(l => l.name === foundLand.name), 1));
                colorsToFind[color]--;
                break;
            }
            remainingLands.some((land) => {
                if (land.colors.includes(color)) {
                    usedLands.push(...remainingLands.splice(remainingLands.findIndex(l => l.name === land.name), 1));
                    colorsToFind[color]--;
                    return true
                }
                return false;
            });
        }
    });
    return Object.values(colorsToFind).every(l => l === 0) && hasUntappedLand(usedLands);
}

function canPlaySpellOnCurve(lands, spell) {
    if (!hasCorrectColors(lands, spell)) {
        logger.error('has no correct colors');
        logger.error(lands);
        logger.error(spell);
        return false;
    }
    if (!hasUntappedLand(lands)) {
        logger.error('has no untapped land');
        logger.error(lands.map(l => l.name));
        return false;
    }

    const comb = getAllCombinations(lands).filter(l => l.length === spell.cmc);
    if (comb.length === 0) {
        return false;
    }
    const canPlay = comb.some(comb => evaluateCost(comb, spell.cost));
    if (!canPlay) {
        logger.error(lands.map(l => l.name));
    } else {
        logger.info(lands.map(l => l.name));
    }
    return canPlay;
}

function getManaCost(codifiedCmc) {
    const manacost = {};
    if (!codifiedCmc) {
        return manacost;
    }
    const matches = codifiedCmc.substr(1).slice(0,-1).split('}{');

    matches.forEach((val) => {
        if (!!parseInt(val)) {
            manacost.generic = parseInt(val);
        } else {
            manacost[val] = (manacost[val] || 0) + 1;
        }
    });
    return manacost;
}


module.exports = {
    hasTypeLand,
    markEtb,
    evaluateCost,
    getManaCost,
    canPlaySpellOnCurve,
    hasCorrectColors,
};