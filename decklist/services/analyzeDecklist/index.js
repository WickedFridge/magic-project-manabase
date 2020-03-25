const config = require('config');
const bluebird = require('bluebird');
const Parallel = require('paralleljs');
const { customLogger } = require('../../../common/logger');
const { hasTypeLand, markEtb, cachedCanPlaySpellOnCurve } = require('../../cards/utils');
const { getAllCombinationsOfMaxLength } = require("../../../common/tools/utils");

const { createClient: createScryfallClient } = require('../../../common/api-client/scryfall/factory');
const { createClient: createSpellClient } = require('../../../common/api-client/spell/factory');

const spellApiClient = createSpellClient(config.apiClients.spell);
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
        const NManaLandCombinations = landsCombinations.filter(keepable);
        logger.info(spell.name);
        logger.info(NManaLandCombinations.length);
        const playableHands = NManaLandCombinations.filter(lands => cachedCanPlaySpellOnCurve(lands, spell));
        const stats = (playableHands.length / NManaLandCombinations.length * 100).toFixed(2);
        data[spell.name] = `${stats}%`;
    }
    // spells.forEach(spell => {
    //
    // });
    return data;
}

async function analyzeDecklist(decklist) {
    const deck = await createDeck(decklist);

    const lands = deck
        .filter(card => hasTypeLand(card))
        .map(land => markEtb(land));

    const spells = [...new Set(deck.filter(card => !hasTypeLand(card)))];
    const maxCMC = Math.max(...spells.map(s => s.cmc + 2), 5);

    const landCombinations = getAllCombinationsOfMaxLength(lands, maxCMC);

    const data = await getDeckStats(spells, landCombinations);

    logger.info(data);
    return data;
}

module.exports = {
    analyzeDecklist,
};
