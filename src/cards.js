const { getManaCost } = require('./utils');

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

module.exports = {
    forest,
    island,
    mountain,
    guildGate,
    growthSpiral,
    giantGrowth
};