const { promisify } = require('util');
const redis = require('redis');
const { createClient } = require('../cache/factory');

const cache = createClient({ type: 'memory' });

// const client = redis.createClient();

function copy(obj) {
    const output = JSON.parse(JSON.stringify(obj));
    Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'function') {
            output[key] = value;
        }
    });
    return output;
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

        if (!rest.length) {
            ret.push([xs[i]]);
        } else {
            for (let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]));
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
function getAllCombinations(rest, active = [], res = []) {
    if (rest.length === 0) {
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
function getAllCombinationsOfMaxLength(rest, length, active = [], res = []) {
    if (rest.length === 0 || active.length === length) {
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
    if (cache.get(key)) {
        return cache.get(key);
    }
    const value = getAllCombinationsOfMaxLength(array, length);
    cache.set(key, value);
    return value;
}

function getAllCombinationsOfMinAndMaxLengthWithCallback(callback, rest, min, max, active = [], res = []) {
    if (rest.length === 0 || active.length === max) {
        if (active.length >= min) {
            callback(active);
        }
        return;
    }
    getAllCombinationsOfMinAndMaxLengthWithCallback(callback, rest.slice(1), min, max, [...active, rest[0]], res);
    getAllCombinationsOfMinAndMaxLengthWithCallback(callback, rest.slice(1), min, max, active, res);
}

function getAllCombinationsOfMinAndMaxLengthWithCallback2(callback, rest, min, max) {
    for (var i = min;i <= max;i++) {
        var res = internalGetAllCombinationsOfMinAndMaxLengthWithCallback2(callback, rest, i);
        if (res !== undefined) {
            return res;
        }
    }
}

function internalGetAllCombinationsOfMinAndMaxLengthWithCallback2(callback, elements, len) {
    var combination = Array(len)
                .fill(0)
                .map((el, i) => i);
    var result = Array(len)
    while (combination[len - 1] < elements.length) {
        for (var i = 0;i < len;i++) {
            result[i] = elements[combination[i]];
        }
        const res = callback(result);
        if (res !== undefined) {
            return res;
        }
        var t = len - 1;
        while (t != 0 && combination[t] == (elements.length - len + t)) {
            t--;
        }
        combination[t]++;
        for (var i = t + 1;i < len;i++) {
            combination[i] = combination[i - 1] + 1;
        }
    }
}

module.exports = {
    copy,
    getAllPermutations,
    getAllCombinations,
    getAllCombinationsOfMaxLength,
    getAllCombinationsOfMinAndMaxLengthWithCallback,
    getAllCombinationsOfMinAndMaxLengthWithCallback2,
    cachedGetAllCombinationsOfMaxLength,
};
