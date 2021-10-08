const { cachedCanPlaySpellOnCurve } = require('../../cards/utils');

const getCallback = (averageLandCount) => (data, spells) => (comb) => {
    spells.forEach((spell) => {
        const keepable = (c) =>
            c.length >= Math.max(spell.cmc, 2) && c.length <= Math.max(2, Math.max(spell.cmc, averageLandCount));
        if (!keepable(comb)) {
            return;
        }
        if (!comb.every((land) => land.producesMana)) {
            data.spells[spell.name].nok++;
            comb.forEach((land) => data.lands[land.name][spell.name].nok++);
            return;
        }
        if (cachedCanPlaySpellOnCurve(comb, spell)) {
            data.spells[spell.name].ok++;
            comb.forEach((land) => data.lands[land.name][spell.name].ok++);
        } else {
            data.spells[spell.name].nok++;
            comb.forEach((land) => data.lands[land.name][spell.name].nok++);
        }
    });
};

module.exports = {
    getCallback,
};
