const stats = {
    'C': { 12: 86, 13: 89, 14: 91, 15: 93, 16: 95, 17: 96, 18: 98, 19: 95, 20: 97 },
    '1C': { 12: 70, 13: 75, 14: 80, 15: 82, 16: 88, 17: 90, 18: 92, 19: 95, 20: 97 },
    'CC': { 12: 70, 13: 75, 14: 80, 15: 82, 16: 88, 17: 90, 18: 92, 19: 95, 20: 97 },
    '2C': { 12: 70, 13: 75, 14: 80, 15: 82, 16: 88, 17: 90, 18: 92, 19: 95, 20: 97 },
};

function getManaCost(codifiedCmc) {
    const manacost = {};
    const matches = codifiedCmc.substr(1).slice(0,-1).split('}{');

    console.log(matches);
    matches.forEach((val) => {
        if (!!parseInt(val)) {
            manacost.generic = parseInt(val);
        } else {
            manacost[val] = (manacost[val] || 0) + 1;
        }
    });
    return manacost;
}

const risenReef = (id) => ({
    name: `risen reef ${id}`,
    type: 'spell',
    cmc: 3,
    mana_cost: '{1}{U}{G}{G}',
    cost: getManaCost('{1}{U}{G}{G}'),
});

const satyrWayfinder = (id) => ({
    name: `satyr Wayfinder ${id}`,
    type: 'spell',
    cmc: 2,
    mana_cost: '{1}{G}',
    cost: getManaCost('{1}{G}'),
});

const risenReefStats = {
    G: 90,
    U: 75,
};

const coloredCount = {
    U: [14, 20, 20, 20],
    G: [14, 18, 18, 20],
};

const cards = [
    risenReef(1),
    satyrWayfinder(1),
];

function getColoredStats(card, coloredCounts) {
    console.log('count : ');
    Object.entries(card.cost).forEach(([manaType, manaCount]) => {
        const stat = stats[manaCount]
    });
}

getColoredStats(cards[0]);