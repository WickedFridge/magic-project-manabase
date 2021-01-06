const { getAllCombinations, getAllCombinationsOfMaxLength, getAllCombinationsOfMinAndMaxLengthWithCallback, getAllPermutations } = require('../tools/utils');

describe('test getAllCombinations length', () => {
    it('4 elements table', () => {
        const array = Array(4).fill(0).map((el, i) => i);
        const combinations = getAllCombinations(array);
        console.log(combinations.length);
    });

    it('5 elem combinations of 5', () => {
        const array = Array(25).fill(0).map((el, i) => i);
        const combinations = getAllCombinationsOfMaxLength(array, 8);
        console.log(combinations.length);
    });

    it('3 elem combinations of 5', () => {
        const array = Array(5).fill(0).map((el, i) => i);
        const callback = comb => console.log(comb);
        getAllCombinationsOfMinAndMaxLengthWithCallback(callback, array, 3, 5);
    });
});
