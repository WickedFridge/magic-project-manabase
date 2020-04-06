const config = require('config');
const { performance } = require('perf_hooks');
const { customLogger } = require('../../../common/logger');
const { hasTypeLand, markEtb, cachedCanPlaySpellOnCurve } = require('../../cards/utils');
const { getAllCombinationsOfMinAndMaxLengthWithCallback } = require("../../../common/tools/utils");

const { createClient: createScryfallClient } = require('../../../common/api-client/scryfall/factory');

const scryfallApiClient = createScryfallClient(config.apiClients.scryfall);
const logger = customLogger('index');

async function createDeck(decklist) {
    const cardCounts = {};
    const spells = [];
    const lands = [];

    (await Promise.all(decklist.map(cardCountAndName => {
        const [count, name] = cardCountAndName.split(/ (.+)/);
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
                spells.push(cardInfo);
            } else {
                // handle lands
                lands.push(...Array(cardCounts[cardInfo.name]).fill(markEtb(cardInfo)));
            }
        });
    return [lands, spells]
}


async function analyzeDecklist(decklist) {
    const t0 = performance.now();
    const [lands, spells] = await createDeck(decklist);
    logger.info(spells);
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
            if (keepable(comb)) {
                if (cachedCanPlaySpellOnCurve(comb, spell)) {
                    data[spell.name].ok ++;
                } else {
                    data[spell.name].nok ++;
                }
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
};
