const {
    forest,
    island,
    mountain,
    simicGuildGate,
    volcanicIsland,
    saheeli,
    giantGrowth,
    growthSpiral,
    fieldOfRuin,
    darkslickShores,
} = require('../cards');
const { evaluateCost } = require('../cards/utils');

describe('manacost 1', () => {
    it('test 0', () => {
        const cost = { U: 1, G: 1 };
        const cmc = 2;
        const lands = [forest(0), island(0)];
        expect(evaluateCost(lands, cost, cmc)).toBe(true);
    });

    it('test 1', () => {
        const cost = { U: 1, G: 1 };
        const cmc = 2;
        const lands = [forest(0), forest(0)];
        expect(evaluateCost(lands, cost, cmc)).toBe(false);
    });

    it('test 2', () => {
        const cost = { U: 1, G: 1 };
        const cmc = 2;
        const lands = [mountain(0), simicGuildGate(0)];
        expect(evaluateCost(lands, cost, cmc)).toBe(false);
    });

    it('test 3', () => {
        const cost = { U: 1, G: 1 };
        const cmc = 2;
        const lands = [mountain(0), simicGuildGate(0), simicGuildGate(1)];
        expect(evaluateCost(lands, cost, cmc)).toBe(false);
    });

    it('test 4', () => {
        const cost = { U: 2, G: 2 };
        const cmc = 2;
        const lands = [simicGuildGate(0), simicGuildGate(1), simicGuildGate(2), island(0)];
        expect(evaluateCost(lands, cost, cmc)).toBe(true);
    });

    it('hybrid mana 1', () => {
        const cost = { 'B/G': 1 };
        const cmc = 1;
        const lands = [forest(0)];
        expect(evaluateCost(lands, cost, cmc)).toBe(true);
    });

    it('hybrid mana 2', () => {
        const cost = { 'B/G': 1 };
        const cmc = 1;
        const lands = [simicGuildGate(0)];
        expect(evaluateCost(lands, cost, cmc)).toBe(false);
    });

    it('hybrid mana 3', () => {
        const cost = { 'B/G': 1 };
        const cmc = 1;
        const lands = [mountain(0)];
        expect(evaluateCost(lands, cost, cmc)).toBe(false);
    });

    it('hybrid mana 4', () => {
        const cost = { 'U/R': 2, generic: 1 };
        const cmc = 3;
        const lands = [simicGuildGate(0), volcanicIsland(0), forest(0)];
        expect(evaluateCost(lands, cost, cmc)).toBe(true);
    });

    it('hybrid mana 5', () => {
        const cost = { 'U/R': 2, generic: 1 };
        const cmc = 3;
        const lands = [volcanicIsland(0), forest(0), forest(1)];
        expect(evaluateCost(lands, cost, cmc)).toBe(false);
    });

    it('tapped 4', () => {
        const cost = { 'B': 4 };
        const cmc = 4;
        const lands = [darkslickShores(0), darkslickShores(1), darkslickShores(2), darkslickShores(3)];
        expect(evaluateCost(lands, cost, cmc)).toBe(false);
    });

    it('tapped 4 and colorless 1', () => {
        const cost = { 'B': 4 };
        const cmc = 4;
        const lands = [darkslickShores(0), darkslickShores(1), darkslickShores(2), darkslickShores(3), fieldOfRuin(0)];
        expect(evaluateCost(lands, cost, cmc)).toBe(false);
    });
});
