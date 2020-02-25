function copy (obj) {
    return JSON.parse(JSON.stringify(obj));
}

function hasCorrectColors(lands, spell) {
    return Object.keys(spell.cost).every(color => {
        return lands.some(l => l.colors.includes(color));
    });
}

function hasUntappedLand(lands) {
    return lands.some(l => l.etbTapped === false);
}

/**
 * Evaluate if the cost can be paid with the lands
 * /!\ still basic algorythm for now
 * return true if it can be paid
 * @param lands
 * @param cost
 * @returns {boolean}
 */
function evaluateCost(lands, cost) {
    const colorsToFind = copy(cost);
    const tempLand = copy(lands).sort((land1, land2) => land1.colors.length - land2.colors.length);
    const usedLands = [];
    Object.keys(cost).forEach((color) => {
        tempLand.forEach((land) => {
            if (land.colors.includes(color)) {
                usedLands.push(...tempLand.splice(tempLand.findIndex(l => l.name === land.name), 1));
                colorsToFind[color]--;
            }
        });
    });
    return Object.values(colorsToFind).every(l => l === 0) && hasUntappedLand(usedLands);
}

function canPlaySpellOnCurve(lands, spell) {
    if (!hasCorrectColors(lands, spell)) {
        return false;
    }
    if (!hasUntappedLand(lands)) {
        return false
    }
    const comb = getAllCombinations(lands).filter(l => l.length === spell.cmc);
    const canPlay = comb.some(comb => evaluateCost(comb, spell.cost));
    return canPlay;
}

function getManaCost(codifiedCmc) {
    const manacost = {};
    const matches = codifiedCmc.substr(1).slice(0,-1).split('}{');

    matches.forEach((val) => {
        if (!!parseInt(val)) {
            manacost.generic = parseInt(val);
        } else {
            manacost[val] = (manacost[val] || 0) + 1;
        }
    });
    return manacost;
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
    evaluateCost,
    getManaCost,
    getAllPermutations,
    getAllCombinations,
    canPlaySpellOnCurve,
};