const {
    getAllCombinations,
    getAllCombinationsOfMaxLength,
    getAllCombinationsOfMinAndMaxLengthWithCallback,
    getAllCombinationsOfMinAndMaxLengthWithCallback2,
    getAllPermutations,
} = require('../tools/utils');

describe('test getAllCombinations length', () => {
    it('4 elements table', () => {
        const array = Array(4)
            .fill(0)
            .map((el, i) => i);
        const combinations = getAllCombinations(array);
        console.log(combinations.length);
    });

    it('5 elem combinations of 5', () => {
        const array = Array(25)
            .fill(0)
            .map((el, i) => i);
        const combinations = getAllCombinationsOfMaxLength(array, 8);
        console.log(combinations.length);
    });

    it('3 elem combinations of 5', () => {
        const array = Array(5)
            .fill(0)
            .map((el, i) => i);
        const results = [
            [ 0, 1, 2 ],
            [ 0, 1, 3 ],
            [ 0, 1, 4 ],
            [ 0, 2, 3 ],
            [ 0, 2, 4 ],
            [ 0, 3, 4 ],
            [ 1, 2, 3 ],
            [ 1, 2, 4 ],
            [ 1, 3, 4 ],
            [ 2, 3, 4 ],
            [ 0, 1, 2, 3 ],
            [ 0, 1, 2, 4 ],
            [ 0, 1, 3, 4 ],
            [ 0, 2, 3, 4 ],
            [ 1, 2, 3, 4 ],
            [ 0, 1, 2, 3, 4 ]
        ];
        const callback = (comb) => {
            const idx = results.findIndex(element => element.length === comb.length && element.every((val, index) => val === comb[index]));
            if (idx != -1) {
                results.splice(idx, 1);
            }
        };
        getAllCombinationsOfMinAndMaxLengthWithCallback2(callback, array, 3, 5);
        expect(results).toHaveLength(0)
    });

    it('stop combination', () => {
        const array = Array(5)
            .fill(0)
            .map((el, i) => i);
        const results = Array();
        const callback = (comb) => {
            results.push(comb.slice())
            if (comb.length >= 4) {
                return "stop";
            }
        };
        const cond = getAllCombinationsOfMinAndMaxLengthWithCallback2(callback, array, 3, 5);

        expect(cond).toBe("stop")
        expect(results).toHaveLength(11)
    });
});
