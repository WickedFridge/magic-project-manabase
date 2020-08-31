const config = require('config');
const { performance } = require('perf_hooks');
const { customLogger } = require('../../../common/logger');
const { hasTypeLand, markEtbAndLandType, cachedCanPlaySpellOnCurve } = require('../../cards/utils');
const { getAllCombinationsOfMinAndMaxLengthWithCallback } = require("../../../common/tools/utils");

const { createClient: createScryfallClient } = require('../../../common/api-client/scryfall/factory');

const scryfallApiClient = createScryfallClient(config.apiClients.scryfall);
const logger = customLogger('index');

function splitCountAndName(input) {
    const words = input.split(' ');
    const count = words.shift();
    const name = words.join(' ');
    return [count, name];
}

function handleXSpell(card, xValue) {
    if (!card.cost.X) {
        return;
    }
    card.cost.generic = card.cost.X * xValue;
    card.cmc += card.cost.X * xValue;
    delete card.cost.X;
}

function handleFetchlands(lands) {
    const fetchs = new Set(lands.filter(land => land.fetchland));
    fetchs.forEach(fetch => {
        logger.info(`fetch : ${fetch.name}`);
        const landTypes = ['Basic', 'Plains', 'Island', 'Swamp', 'Forest', 'Mountain'];
        const targets = fetch.fetchland.filter(prop => landTypes.includes(prop));
        const colors = [];
        lands.map(land => {
            if (targets.some(t => land.type.includes(t))) {
                colors.push(...land.colors);
            }
        });
        fetch.colors.push(...new Set(colors));
    })
}

function handleNotManaProducingLands(lands) {
    lands.forEach(land => {
        land.producesMana = land.colors.length > 0;
    })
}

async function createDeck(decklist, xValue) {
    const cardCounts = {};
    const spells = [];
    const lands = [];

    (await Promise.all(decklist.map(cardCountAndName => {
        const [count, name] = splitCountAndName(cardCountAndName);
        cardCounts[name] = parseInt(count);
        return scryfallApiClient.getCardByName(name);
    })))
        .forEach((cardInfo) => {
            if (cardInfo.card_faces) {
                // handle splitcards
                cardInfo.card_faces.forEach(splitcard => {
                    if (!hasTypeLand(splitcard)) {
                        spells.push(splitcard);
                    }
                })
            }
            else if (!hasTypeLand(cardInfo)) {
                // handle regular spells
                handleXSpell(cardInfo, xValue);
                spells.push(cardInfo);
            } else {
                // handle lands
                const count = cardCounts[cardInfo.name];
                const landsToPush = Array(count).fill(markEtbAndLandType(cardInfo));
                lands.push(...landsToPush);
            }
        });
    handleFetchlands(lands);
    handleNotManaProducingLands(lands);
    return [lands, spells]
}


async function analyzeDecklist(decklist, xValue = 2) {
    const t0 = performance.now();
    const [lands, spells] = await createDeck(decklist, xValue);
    // logger.info(lands);
    // logger.info(spells);
    logger.info('deck created !');
    const t1 = performance.now();
    const maxCMC = Math.max(...spells.map(s => s.cmc), 4);
    const minCMC = Math.min(...spells.map(s => s.cmc), 2);

    const data = {};
    spells.forEach(s => {
        data[s.name] = {
            ok: 0,
            nok: 0,
        };
    });

    const callback = (data, spells) => (comb) => {
        spells.forEach(spell => {
            const keepable = (c) => c.length >= Math.max(spell.cmc, 2) && c.length <= Math.max(spell.cmc, 5);
            if (!keepable(comb)) {
                return;
            }
            if (!comb.every(land => land.producesMana)) {
                data[spell.name].nok ++;
                return;
            }
            if (cachedCanPlaySpellOnCurve(comb, spell)) {
                data[spell.name].ok ++;
            } else {
                data[spell.name].nok ++;
            }
        });
    };

    const t2 = performance.now();
    getAllCombinationsOfMinAndMaxLengthWithCallback(callback(data, spells), lands, minCMC, maxCMC);
    const t3 = performance.now();
    Object.keys(data).forEach(spellName => data[spellName].ratio = `${(100 * data[spellName].ok / (data[spellName].ok + data[spellName].nok)).toFixed(2)}%`);
    logger.info(data);
    logger.info(`create deck: ${t1-t0}`);
    logger.info(`intermediate time: ${t2-t1}`);
    logger.info(`get Stats: ${t3-t2}`);
    return data;
}

module.exports = {
    analyzeDecklist,
    splitCountAndName,
    handleFetchlands
};
