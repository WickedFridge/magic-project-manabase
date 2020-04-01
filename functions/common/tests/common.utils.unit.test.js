const { getAllCombinations, getAllCombinationsOfMaxLength, getAllCombinationsOfMaxLengthWithCallback, getAllPermutations } = require('../tools/utils');

describe('test getAllCombinations length', () => {
    it('4 elements table', () => {
        const array = Array(27).fill(0).map((el, i) => i);
        const combinations = getAllCombinations(array);
        console.log(combinations.length);
    });

    it('5 elem combinations of 5', () => {
        const array = Array(27).fill(0).map((el, i) => i);
        const combinations = getAllCombinationsOfMaxLength(array, 8);
        console.log(combinations.length);
    });

    it('3 elem combinations of 5', () => {
        const array = Array(5).fill(0).map((el, i) => i);
        const callback = comb => console.log(comb);
        getAllCombinationsOfMaxLengthWithCallback(callback, array, 3);
    });
});
