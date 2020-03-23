const { cachedCanPlaySpellOnCurve, hasCorrectColors } = require('../src/services/cards/utils');
const { forest, island, mountain, swamp, simicGuildGate, giantGrowth, growthSpiral,
        mockGrowthSpiral, mockTempleSimic, mockIsland, mockTempleGolgari, mockUro,
        frilledMystic } = require('../src/cards');

describe('has Correct Colors unit testing', () => {
    it('handling generic mana', () => {
        const lands = [island(), swamp(), mockTempleGolgari()];
        const spell = mockUro();
        expect(hasCorrectColors(lands, spell)).toBe(true);
    });
});

const testCanPlayOnCurve = ({ text, lands, spell, outcome }) => () => {
    expect(cachedCanPlaySpellOnCurve(lands, spell)).toBe(outcome);
};

describe('Basic can play spell testing - color', () => {
    it('basic can play giant growth', testCanPlayOnCurve({
        lands: [forest()],
        spell: giantGrowth(),
        outcome: true,
    }));

    it(`basic can't play giant growth`, testCanPlayOnCurve({
        lands: [island()],
        spell: giantGrowth(),
        outcome: false,
    }));

    it('basic can play growth spiral', testCanPlayOnCurve({
        lands: [forest(), island()],
        spell: growthSpiral(),
        outcome: true,
    }));

    it(`basic can't play growth spiral 1`, testCanPlayOnCurve({
        lands: [island(0), island(1)],
        spell: growthSpiral(),
        outcome: false,
    }));

    it(`basic can't play growth spiral 2`, testCanPlayOnCurve({
        lands: [forest(0), forest(1)],
        spell: growthSpiral(),
        outcome: false,
    }));

    it(`mock can play growth spiral 0`, testCanPlayOnCurve({
        lands: [mockTempleSimic(), mockIsland()],
        spell: mockGrowthSpiral(),
        outcome: true,
    }));
});

describe('Basic can play spell testing - etb', () => {
    it('basic can play giant growth', testCanPlayOnCurve({
        lands: [forest(), simicGuildGate()],
        spell: giantGrowth(),
        outcome: true,
    }));
    it('basic can play growth spiral - 1', testCanPlayOnCurve({
        lands: [forest(), simicGuildGate()],
        spell: growthSpiral(),
        outcome: true,
    }));
    it('basic can play growth spiral - 2', testCanPlayOnCurve({
        lands: [simicGuildGate(), island()],
        spell: growthSpiral(),
        outcome: true,
    }));
    it(`can play growth spiral - 3`, testCanPlayOnCurve({
        lands: [simicGuildGate(0), simicGuildGate(1), island()],
        spell: growthSpiral(),
        outcome: true,
    }));
    it(`basic can't play growth spiral - 1`, testCanPlayOnCurve({
        lands: [simicGuildGate(0), simicGuildGate(1)],
        spell: growthSpiral(),
        outcome: false,
    }));
    it(`basic can't play growth spiral - 2`,testCanPlayOnCurve({
        lands: [simicGuildGate(0), simicGuildGate(1), mountain()],
        spell: growthSpiral(),
        outcome: false,
    }));
});

describe('can play spell testing - generic mana', () => {
    it('can play Uro', testCanPlayOnCurve({
        lands: [mockTempleGolgari(), island(), swamp()],
        spell: mockUro(),
        outcome: true,
    }));
    it('can play Frilled Mystic', testCanPlayOnCurve({
        lands: [mockTempleGolgari(0), mockTempleGolgari(1), island(0), island(1)],
        spell: frilledMystic(),
        outcome: true,
    }))
})