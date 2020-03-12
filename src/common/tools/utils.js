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

module.exports = {
    copy,
    getAllPermutations,
    getAllCombinations,
};