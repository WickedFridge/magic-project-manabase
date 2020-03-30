const { getAllCombinationsOfMaxLength } = require('../../common/tools/utils');
const { performance } = require('perf_hooks');

// const array = Array(28).fill(0).map((el, i) => i);
// const t0 = performance.now();
// const combinations = getAllCombinationsOfMaxLength(array, 10);
// const t1 = performance.now();
// console.log(combinations.length);
// console.log(`${t1 - t0}ms`);

const array = Array(24821333);
const t0 = performance.now();
const finalArray = array.map((el, i) => [i-1, i, i+1]);
const t1 = performance.now();
console.log(`${t1 - t0}ms`);
