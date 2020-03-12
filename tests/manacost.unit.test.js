const { forest, island, mountain, guildGate, giantGrowth, growthSpiral } = require('../src/cards');
const { evaluateCost } = require('../src/services/cards/utils');

describe('manacost 1', () => {
    it('test 0', () => {
        const cost = { U: 1, G: 1};
        const lands = [forest(0), island(0)];
        expect(evaluateCost(lands, cost)).toBe(true);
    });

    it('test 1', () => {
        const cost = { U: 1, G: 1};
        const lands = [forest(0), forest(0)];
        expect(evaluateCost(lands, cost)).toBe(false);
    });

    it('test 2', () => {
        const cost = { U: 1, G: 1};
        const lands = [mountain(0), guildGate(0)];
        expect(evaluateCost(lands, cost)).toBe(false);
    });

    it('test 3', () => {
        const cost = { U: 1, G: 1};
        const lands = [mountain(0), guildGate(0), guildGate(1)];
        expect(evaluateCost(lands, cost)).toBe(false);
    });

    it('test 4', () => {
        const cost = { U: 2, G: 2};
        const lands = [guildGate(0), guildGate(1), guildGate(2), island(0)];
        expect(evaluateCost(lands, cost)).toBe(true);
    });
});
