const { getManaCost } = require('./services/cards/utils');

const forest = (id) => ({
    name: `Forest ${id}`,
    type: 'land',
    colors: ['G'],
    etbTapped: false
});

const island = (id) => ({
    name: `Island ${id}`,
    type: 'land',
    colors: ['U'],
    etbTapped: false
});

const mountain = (id) => ({
    name: `Mountain ${id}`,
    type: 'land',
    colors: ['R'],
    etbTapped: false
});

const guildGate = (id) => ({
    name: `Simic GuildGate ${id}`,
    type: 'land',
    colors: ['U', 'G'],
    etbTapped: true,
});

const growthSpiral = (id) => ({
    name: `Growth Spiral ${id}`,
    type: 'spell',
    cmc: 2,
    mana_cost: '{U}{G}',
    cost: getManaCost('{U}{G}'),
});

const giantGrowth = (id) => ({
    name: `giant Growth ${id}`,
    type: 'spell',
    cmc: 1,
    mana_cost: '{G}',
    cost: getManaCost('{G}'),
});

const mockIsland = () => ({
    etbTapped: false,
    id: '92daaa39-cd2f-4c03-8f41-92d99d0a3366',
    name: 'Island',
    cmc: 0,
    colors: ['U'],
    type: 'Basic Land — Island',
    text: '({T}: Add {U}.)',
    cost: {},
});

const mockTemple = () => ({
    etbTapped: true,
    id: '0c284acd-4407-42ad-9f4c-359041223609',
    name: 'Temple of Mystery',
    cmc: 0,
    colors: ['U','G'],
    type: 'Land',
    text:
        'Temple of Mystery enters the battlefield tapped.\nWhen Temple of Mystery enters the battlefield, scry 1.\n{T}: Add {G} or {U}.',
    cost: {},
});

const mockGrowthSpiral = () => ({
    id: '7c77a6b1-ef06-4da5-8e86-a5204216cb77',
    name: 'Growth Spiral',
    cmc: 2,
    colors: [ 'G', 'U' ],
    type: 'Instant',
    text: 'Draw a card. You may put a land card from your hand onto the battlefield.',
    cost: { G: 1, U: 1 },
});

module.exports = {
    forest,
    island,
    mountain,
    guildGate,
    growthSpiral,
    giantGrowth,
    mockIsland,
    mockTemple,
    mockGrowthSpiral,
};