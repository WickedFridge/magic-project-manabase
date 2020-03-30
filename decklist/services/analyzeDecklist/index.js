const config = require('config');
const Parallel = require('paralleljs');
const { performance } = require('perf_hooks');
const { customLogger } = require('../../../common/logger');
const { hasTypeLand, markEtb, cachedCanPlaySpellOnCurve } = require('../../cards/utils');
const { cachedGetAllCombinationsOfMaxLength, getAllCombinationsOfMaxLengthWithRedis } = require("../../../common/tools/utils");

const { createClient: createScryfallClient } = require('../../../common/api-client/scryfall/factory');

const scryfallApiClient = createScryfallClient(config.apiClients.scryfall);
const logger = customLogger('index');

async function createDeck(decklist) {
    const cards = [];
    const deck = [];
    const cardData = {};

    (await Promise.all(decklist.map(cardCountAndName => {
        const [count, name] = cardCountAndName.split(/ (.+)/);
        cards.push({ name, count: parseInt(count) });
        return scryfallApiClient.getCardByName(name);
    })))
        .forEach((card, i) => cardData[cards[i].name] = card);

    cards.forEach(({ name, count }) => {
        deck.push(...Array(count).fill(cardData[name]));
    });
    return deck
}

async function getDeckStats(spells, landsCombinations) {
    const data = {};

    for(const spell of spells) {
        const keepable = (c) => c.length >= Math.max(spell.cmc, 2) && c.length <= Math.max(spell.cmc, 5);
        const t0 = performance.now();
        const NManaLandCombinations = landsCombinations.filter(keepable);
        const t1 = performance.now();
        logger.info(`filter : ${t1-t0}`);
        logger.info(spell.name);
        logger.info(NManaLandCombinations.length);
        const playableHands = NManaLandCombinations.filter(lands => cachedCanPlaySpellOnCurve(lands, spell));
        const stats = (playableHands.length / NManaLandCombinations.length * 100).toFixed(2);
        data[spell.name] = `${stats}%`;
    }

    return data;
}

async function analyzeDecklist(decklist) {
    const t0 = performance.now();
    const deck = await createDeck(decklist);
    const t1 = performance.now();
    logger.info('deck created !');
    const lands = deck
        .filter(card => hasTypeLand(card))
        .map(land => markEtb(land));
    const t2 = performance.now();
    logger.info('lands marked');
    const spells = [...new Set(deck.filter(card => !hasTypeLand(card)))];
    const maxCMC = Math.max(...spells.map(s => s.cmc), 5);

    const landCombinations = cachedGetAllCombinationsOfMaxLength(lands, maxCMC);
    const t3 = performance.now();
    logger.info('combinations created !');
    const data = await getDeckStats(spells, landCombinations);
    const t5 = performance.now();
    logger.info(data);
    logger.info(`create deck: ${t1-t0}`);
    logger.info(`mark Lands: ${t2-t1}`);
    logger.info(`get combinations: ${t3-t2}`);
    logger.info(`get Stats: ${t5-t3}`);
    return data;
}

module.exports = {
    analyzeDecklist,
};
