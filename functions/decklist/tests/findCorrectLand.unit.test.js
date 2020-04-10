const { forest, simicGuildGate, deathRite } = require('../cards');
const { findCorrectLand } = require('../cards/utils');
const { copy } = require('../../common/tools/utils');

describe('findCorrectLand test', () => {
    it('hybrid mana testing 1', () => {
        const lands = [forest(), simicGuildGate()];
        const color = 'B/G';
        const remainingLands = copy(lands).sort((land1, land2) => land1.colors.length - land2.colors.length);
        expect(findCorrectLand(remainingLands, color)).toEqual(forest());
    });

    it('hybrid mana testing 2', () => {
        const lands = [simicGuildGate(), forest()];
        const color = 'B/G';
        const remainingLands = copy(lands).sort((land1, land2) => land1.colors.length - land2.colors.length);
        expect(findCorrectLand(remainingLands, color)).toEqual(forest());
    });
});
