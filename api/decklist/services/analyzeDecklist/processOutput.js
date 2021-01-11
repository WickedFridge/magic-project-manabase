const { getLandNOnCurveProba } = require("../../../common/tools/hypergeometric");

function processOutputData(data, deckSize, lands, cardCounts) {
    Object.entries(data.spells).forEach(([spellName, spellData]) => {
        spellData.p1 = 100 * spellData.ok / (spellData.ok + spellData.nok) || 0;
        spellData.p2 = 100 * spellData.ok / (spellData.ok + spellData.nok) * getLandNOnCurveProba(deckSize, lands.length, spellData.cmc) || 0;
        // spellData.p3 = 100 * getLandNOnCurveProba(deckSize - sideboardSize, lands.length, spellData.cmc);
    });
    Object.entries(data.lands).forEach(([landName, landData]) => {
        Object.entries(landData).forEach(([spellName, spellData]) => {
            spellData.p1 = 100 * spellData.ok / (spellData.ok + spellData.nok) || 0;
        });
        let count = 0;
        landData.p1 = Object.entries(landData)
            .reduce((acc, [key, val]) => {
                if (!cardCounts.deck[key]) {
                    return acc;
                }
                count += cardCounts.deck[key];
                return acc + cardCounts.deck[key] * landData[key].p1;
            }, 0)
        landData.p1 /= count;
    });
}

module.exports = {
    processOutputData,
};