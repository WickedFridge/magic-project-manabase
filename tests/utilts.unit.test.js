const { canPlaySpellOnCurve } = require('../src/services/cards/utils');
const { forest, island, mountain, guildGate, giantGrowth, growthSpiral,
        mockGrowthSpiral, mockTemple, mockIsland } = require('../src/cards');

describe('Basic can play spell testing - color', () => {
    it('basic can play giant growth', () => {
        const lands = [forest(0)];
        const spell = giantGrowth(0);
        expect(canPlaySpellOnCurve(lands, spell)).toBe(true);
    });
    it(`basic can't play giant growth`, () => {
        const lands = [island(0)];
        const spell = giantGrowth(0);
        expect(canPlaySpellOnCurve(lands, spell)).toBe(false);
    });
    it('basic can play growth spiral', () => {
        const lands = [forest(0), island(0)];
        const spell = growthSpiral(0);
        expect(canPlaySpellOnCurve(lands, spell)).toBe(true);
    });
    it(`basic can't play growth spiral 1`, () => {
        const lands = [island(0), island(1)];
        const spell = growthSpiral(0);
        expect(canPlaySpellOnCurve(lands, spell)).toBe(false);
    });
    it(`basic can't play growth spiral 2`, () => {
        const lands = [forest(0), forest(1)];
        const spell = growthSpiral(0);
        expect(canPlaySpellOnCurve(lands, spell)).toBe(false);
    });

    it(`mock can play growth spiral 0`, () => {
        const lands = [mockTemple(), mockIsland()];
        const spell = mockGrowthSpiral();
        expect(canPlaySpellOnCurve(lands, spell)).toBe(true);
    });
});

describe('Basic can play spell testing - etb', () => {
    it('basic can play giant growth', () => {
        const lands = [forest(0), guildGate(0)];
        const spell = giantGrowth(0);
        expect(canPlaySpellOnCurve(lands, spell)).toBe(true);
    });
    it('basic can play growth spiral - 1', () => {
        const lands = [forest(0), guildGate(0)];
        const spell = growthSpiral(0);
        expect(canPlaySpellOnCurve(lands, spell)).toBe(true);
    });
    it('basic can play growth spiral - 2', () => {
        const lands = [guildGate(0), island(0)];
        const spell = growthSpiral(0);
        expect(canPlaySpellOnCurve(lands, spell)).toBe(true);
    });
    it(`can play growth spiral - 3`, () => {
        const lands = [guildGate(0), guildGate(1), island(0)];
        const spell = growthSpiral(0);
        expect(canPlaySpellOnCurve(lands, spell)).toBe(true);
    });
    it(`basic can't play growth spiral - 1`, () => {
        const lands = [guildGate(0), guildGate(1)];
        const spell = growthSpiral(0);
        expect(canPlaySpellOnCurve(lands, spell)).toBe(false);
    });
    it(`basic can't play growth spiral - 2`, () => {
        const lands = [guildGate(0), guildGate(1), mountain(0)];
        const spell = growthSpiral(0);
        expect(canPlaySpellOnCurve(lands, spell)).toBe(false);
    });
});