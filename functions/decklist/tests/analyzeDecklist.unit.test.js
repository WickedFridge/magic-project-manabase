const { splitCountAndName } = require('../../decklist/services/analyzeDecklist');

describe('splitCountAndName testing', () => {
    it('basic decklist', () => {
        const input = '4 Thought Erasure';
        const expectedCount = '4';
        const expectedName = 'Thought Erasure';
        const [count, name] = splitCountAndName(input);
        expect(count).toEqual(expectedCount);
        expect(name).toEqual(expectedName);
    });

    it('basic decklist with Arena format', () => {
        const input = '4 Polukranos, Unchained';
        const expectedCount = '4';
        const expectedName = 'Polukranos, Unchained';
        const [count, name] = splitCountAndName(input);
        expect(count).toEqual(expectedCount);
        expect(name).toEqual(expectedName);
    });
});
