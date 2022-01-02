const { customLogger } = require('../../../common/logger');
const { getLandNOnCurveProba } = require('../../../common/tools/hypergeometric');

const logger = customLogger('processOutput');

function processSimilarCostData(data) {
    const referenceSpellNames = {};
    Object.entries(data.spells).forEach(([spellName, value]) => {
        // We find the first spell with the same manaCost in the data
        const [referenceSpellName, referenceSpellValue] = Object.entries(data.spells).find(
            ([spellName, spellValue]) => spellValue.manaCost === value.manaCost,
        );
        data.spells[spellName] = referenceSpellValue;
        referenceSpellNames[spellName] = referenceSpellName;
    });
    Object.entries(data.lands).forEach(([landName, landValue]) => {
        Object.keys(landValue).forEach((spellName) => {
            const referenceSpellName = referenceSpellNames[spellName];
            data.lands[landName][spellName] = data.lands[landName][referenceSpellName];
        });
    });
}

function processOutputData(data, deckSize, lands, cardCounts) {
    Object.entries(data.spells).forEach(([spellName, spellData]) => {
        spellData.p1 = (100 * spellData.ok) / (spellData.ok + spellData.nok) || 0;
        spellData.p2 =
            ((100 * spellData.ok) / (spellData.ok + spellData.nok)) *
                getLandNOnCurveProba(deckSize, lands.length, spellData.cmc) || 0;
        // spellData.p3 = 100 * getLandNOnCurveProba(deckSize - sideboardSize, lands.length, spellData.cmc);
    });

    processSimilarCostData(data);

    Object.entries(data.lands).forEach(([landName, landData]) => {
        Object.entries(landData).forEach(([spellName, spellData]) => {
            spellData.p1 = (100 * spellData.ok) / (spellData.ok + spellData.nok) || 0;
        });
        let count = 0;
        landData.p1 = Object.entries(landData).reduce((acc, [key, val]) => {
            if (!cardCounts.deck[key]) {
                return acc;
            }
            count += cardCounts.deck[key];
            return acc + cardCounts.deck[key] * landData[key].p1;
        }, 0);
        landData.p1 /= count;
    });
    lands.forEach((l) => {
        l.colors.forEach((color) => data.sources[color].count++);
    });
}

module.exports = {
    processOutputData,
};
