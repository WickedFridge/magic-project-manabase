const { getAllCombinations, getAllCombinationsOfMaxLength, getAllPermutations } = require('../src/common/tools/utils');

describe('test getAllCombinations length', () => {
    it('4 elements table', () => {
        const array = Array(27).fill(0).map((el, i) => i);
        const combinations = getAllCombinations(array);
        console.log(combinations.length);
    });

    it('3 elem combinations of 5', () => {
        const array = Array(27).fill(0).map((el, i) => i);
        const combinations = getAllCombinationsOfMaxLength(array, 7);
        console.log(combinations.length);
    });
});