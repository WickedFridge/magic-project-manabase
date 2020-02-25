const breedingPool = (id) => ({
    name: `Breeding Pool ${id}`,
    type: 'land',
    colors: ['G', 'U'],
    untapped: {
        landCount: 'any',
        condition: {
            life: 'pay',
            amount: 2,
        },
    },
    tap: null,
});

const manaConfluence = (id) => ({
    name: `Mana Confluence ${id}`,
    type: 'land',
    colors: ['W', 'U', 'B', 'R', 'G'],
    untapped: {
        landCount: 'any',
        condition: null,
    },
    tap: {
        life: 'pay',
        amount: 1,
    },
});

const risenReef = (id) => ({
    name: `risen reef ${id}`,
    type: 'spell',
    cost: '1UG',
});

const deck = [
    breedingPool(1),
    breedingPool(2),
    manaConfluence(1),
    manaConfluence(2),
    risenReef(1),
];

/**
 * Returns the Sets of all permutations of cards
 * @param xs
 * @returns {[]}
 */
function perm(xs) {
    let ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

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
function search(rest, active = [], res = []){
    if (rest.length === 0){
        res.push(active);
        return active;
    } else {
        search(rest.slice(1), [...active, rest[0]], res);
        search(rest.slice(1), active, res);
    }
    return res;
}

function evaluateCombination(lands, spell) {

}

function evaluateLands(deck) {
    const spells = deck.filter(card => card.type === 'spell');
    const lands = deck.filter(card => card.type === 'land');
    spells.forEach(s => {
        const ccm = s.cost.length;
        const landsCombinations = search(lands).filter(t => t.length === 3);
        // console.log(landsCombinations);
        landsCombinations.forEach(comb => {
            const landsPermutations = perm(comb);
            console.log(landsPermutations);
        });
    });
}

evaluateLands(deck);