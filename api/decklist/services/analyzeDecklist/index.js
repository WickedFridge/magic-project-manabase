const { performance } = require('perf_hooks');
const { customLogger } = require('../../../common/logger');
const { getAllCombinationsOfMinAndMaxLengthWithCallback } = require("../../../common/tools/utils");
const { getAverageLandCountInHand } = require('../../../common/tools/hypergeometric');
const { getCallback } = require('./callback');
const { processOutputData } = require('./processOutput');
const { createDeck } = require('../createDeck');

const logger = customLogger('index');

async function analyzeDecklist(decklist, xValue = 2) {
    const t0 = performance.now();
    const [lands, spells, deckSize, cardCounts] = await createDeck(decklist, xValue);
    const landNames = [];
    lands.forEach((land) => {
        if(!landNames.includes(land.name)) {
            landNames.push(land.name);
        }
    })
    const averageLandCount = getAverageLandCountInHand(deckSize, lands.length);
    logger.info(`lands : ${lands.length}`);
    logger.info(`spells : ${spells.length}`);
    logger.info(`unique land names : `);
    logger.info(spells);
    logger.info(`deckSize : ${deckSize}`);
    logger.info('deck created !');
    const t1 = performance.now();
    const maxCMC = Math.max(...spells.map(s => s.cmc), 4);
    const minCMC = Math.min(...spells.map(s => s.cmc), 2);

    const zeroSpells = spells.filter(s => s.cmc === 0);
    const nonZeroSpells = spells.filter(s => s.cmc > 0);

    const data = {
        spells: {},
        lands: {},
    };
    zeroSpells.forEach(s => {
        data.spells[s.name] = {
            cmc: 0,
            ok: 1,
            nok: 0,
        };
    })

    nonZeroSpells.forEach(s => {
        data.spells[s.name] = {
            cmc: s.cmc,
            ok: 0,
            nok: 0,
        };
    });

    landNames.forEach(l => {
        data.lands[l] = {};
        nonZeroSpells.forEach(s => {
            data.lands[l][s.name] = {
                ok: 0,
                nok: 0,
            };
        });
    });

    const callback = getCallback(averageLandCount);
    const t2 = performance.now();
    getAllCombinationsOfMinAndMaxLengthWithCallback(callback(data, nonZeroSpells), lands, minCMC, maxCMC);
    const t3 = performance.now();
    processOutputData(data, deckSize, lands, cardCounts);
    logger.info(data);
    logger.info(`create deck: ${t1-t0}`);
    logger.info(`intermediate time: ${t2-t1}`);
    logger.info(`get Stats: ${t3-t2}`);
    return data;
}

module.exports = {
    analyzeDecklist,
};
