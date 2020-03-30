const redis = require('redis');
const { promisify } = require('util');
const { createClient } = require('../cache/factory');

const cache = createClient({ type: 'memory' });

// const client = redis.createClient();

function copy (obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Returns the Sets of all permutations of cards
 * @param xs
 * @returns {[]}
 */
function getAllPermutations(xs) {
    let ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = getAllPermutations(xs.slice(0, i).concat(xs.slice(i + 1)));

        if(!rest.length) {
            ret.push([xs[i]])
        } else {
            for(let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]))
            }
        }
    }
    return ret;
}

/**
 * Returns the Sets of all combinations of cards
 * @param rest
 * @param active
 * @param res
 * @returns {Array}
 */
function getAllCombinations(rest, active = [], res = []){
    if (rest.length === 0){
        res.push(active);
        return active;
    } else {
        getAllCombinations(rest.slice(1), [...active, rest[0]], res);
        getAllCombinations(rest.slice(1), active, res);
    }
    return res;
}

/**
 * Returns the Sets of all combinations of cards of length n
 * @param rest
 * @param length of the combinations
 * @param
 * @param active
 * @param res
 * @returns {Array}
 */
function getAllCombinationsOfMaxLength(rest, length, active = [], res = []){
    if (rest.length === 0 || active.length === length){
        res.push(active);
        return active;
    } else {
        getAllCombinationsOfMaxLength(rest.slice(1), length, [...active, rest[0]], res);
        getAllCombinationsOfMaxLength(rest.slice(1), length, active, res);
    }
    return res;
}

function cachedGetAllCombinationsOfMaxLength(array, length) {
    const key = cache.generateCacheKey([array, length]);
    if(cache.get(key)){
        return cache.get(key);
    }
    const value = getAllCombinationsOfMaxLength(array, length);
    cache.set(key, value);
    return value;
}

module.exports = {
    copy,
    getAllPermutations,
    getAllCombinations,
    getAllCombinationsOfMaxLength,
    cachedGetAllCombinationsOfMaxLength,
};
