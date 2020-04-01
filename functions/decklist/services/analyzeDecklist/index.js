const config = require('config');
const { performance } = require('perf_hooks');
const { customLogger } = require('../../../common/logger');
const { hasTypeLand, markEtb, cachedCanPlaySpellOnCurve } = require('../../cards/utils');
const { getAllCombinationsOfMinAndMaxLengthWithCallback } = require("../../../common/tools/utils");

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
            if (keepable(comb)) {
                if (cachedCanPlaySpellOnCurve(comb, spell)) {
                    data[spell.name].ok ++;
                } else {
                    data[spell.name].nok ++;
                }
            }
        });
    };

    const t3 = performance.now();
    getAllCombinationsOfMinAndMaxLengthWithCallback(callback(data, spells), lands, minCMC, maxCMC);
    const t4 = performance.now();
    Object.keys(data).forEach(spellName => data[spellName].ratio = `${(100 * data[spellName].ok / (data[spellName].ok + data[spellName].nok)).toFixed(2)}%`);
    logger.info(data);
    logger.info(`create deck: ${t1-t0}`);
    logger.info(`mark Lands: ${t2-t1}`);
    logger.info(`intermediate time: ${t3-t2}`);
    logger.info(`get Stats: ${t4-t3}`);
    return data;
}

module.exports = {
    analyzeDecklist,
};
