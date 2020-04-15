const { getManaCost } = require('./cards/utils');

const forest = (id) => ({
    name: `Forest ${id}`,
    type: ['Basic', 'Land', '—', 'Forest'],
    colors: ['G'],
    etbTapped: () => false
});

const island = (id) => ({
    name: `Island ${id}`,
    type: ['Basic', 'Land', '—', 'Island'],
    colors: ['U'],
    etbTapped: () => false
});

const swamp = (id) => ({
    name: `Swamp ${id}`,
    type: ['Basic', 'Land', '—', 'Swamp'],
    colors: ['B'],
    etbTapped: () => false
});

const mountain = (id) => ({
    name: `Mountain ${id}`,
    type: ['Basic', 'Land', '—', 'Mountain'],
    colors: ['R'],
    etbTapped: () => false
});

const simicGuildGate = (id) => ({
    name: `Simic GuildGate ${id}`,
    type: ['Land'],
    colors: ['U', 'G'],
    etbTapped: () => true,
});

const volcanicIsland = (id) => ({
    name: `Volcanic Island ${id}`,
    type: ['Land', 'Island', 'Mountain'],
    colors: ['U', 'R'],
    etbTapped: () => false,
});

const fabledPassage = (id) => ({
    name: `Fabled Passage ${id}`,
    type: ['Land'],
    colors: [],
    text: '{T}, Sacrifice Fabled Passage: Search your library for a basic land card, put it onto the battlefield tapped, then shuffle your library. Then if you control four or more lands, untap that land.',
});

const prismaticVista = (id) => ({
    name: `Prismatic Vista ${id}`,
    type: ['Land'],
    colors: [],
    text: '{T}, Pay 1 life, Sacrifice Prismatic Vista: Search your library for a basic land card, put it onto the battlefield, then shuffle your library.',
});

const mistyRainforest = (id) => ({
    name: `Misty Rainforest ${id}`,
    type: ['Land'],
    colors: [],
    text: '{T}, Pay 1 life, Sacrifice Misty Rainforest: Search your library for a Forest or Island card, put it onto the battlefield, then shuffle your library.',
});

const bloodstainedMire = (id) => ({
    name: `Bloodstained Mire ${id}`,
    type: ['Land'],
    colors: [],
    text: '{T}, Pay 1 life, Sacrifice Bloodstained Mire: Search your library for a Swamp or Mountain card, put it onto the battlefield, then shuffle your library.',
});

const marshFlats = (id) => ({
    name: `Marsh Flats ${id}`,
    type: ['Land'],
    colors: [],
    text: '{T}, Pay 1 life, Sacrifice Marsh Flats: Search your library for a Plains or Swamp card, put it onto the battlefield, then shuffle your library.',
});

const evolvingWilds = (id) => ({
    name: `Evolving Wilds ${id}`,
    type: ['Land'],
    colors: [],
    text: '{T}, Sacrifice Evolving Wilds: Search your library for a basic land card, put it onto the battlefield tapped, then shuffle your library.',
});

const growthSpiral = (id) => ({
    name: `Growth Spiral ${id}`,
    type: ['spell'],
    cmc: 2,
    mana_cost: '{U}{G}',
    cost: getManaCost('{U}{G}'),
});

const giantGrowth = (id) => ({
    name: `giant Growth ${id}`,
    type: ['spell'],
    cmc: 1,
    mana_cost: '{G}',
    cost: getManaCost('{G}'),
});

const mockIsland = () => ({
    etbTapped: () => false,
    id: '92daaa39-cd2f-4c03-8f41-92d99d0a3366',
    name: 'Island',
    cmc: 0,
    colors: ['U'],
    type: ['Basic', 'Land', '—', 'Island'],
    text: '({T}: Add {U}.)',
    cost: {},
});

const mockTempleSimic = () => ({
    etbTapped: () => true,
    id: '0c284acd-4407-42ad-9f4c-359041223609',
    name: 'Temple of Mystery',
    cmc: 0,
    colors: ['U','G'],
    type: ['Land'],
    text:
        'Temple of Mystery enters the battlefield tapped.\nWhen Temple of Mystery enters the battlefield, scry 1.\n{T}: Add {G} or {U}.',
    cost: {},
});

const mockGrowthSpiral = () => ({
    id: '7c77a6b1-ef06-4da5-8e86-a5204216cb77',
    name: 'Growth Spiral',
    cmc: 2,
    colors: [ 'G', 'U' ],
    type: ['Instant'],
    text: 'Draw a card. You may put a land card from your hand onto the battlefield.',
    cost: { G: 1, U: 1 },
});

const mockTempleGolgari = () => ({
    etbTapped: () => true,
    id: '6e327d94-5540-49f0-b1a2-a3fb614c9651',
    name: 'Temple of Malady',
    cmc: 0,
    colors: [ 'B', 'G' ],
    type: ['Land'],
    text:
        'Temple of Malady enters the battlefield tapped.\nWhen Temple of Malady enters the battlefield, scry 1.\n{T}: Add {B} or {G}.',
    cost: {},
});

const mockUro = () => ({
    id: 'a0b6a71e-56cb-4d25-8f2b-7a4f1b60900d',
    name: "Uro, Titan of Nature's Wrath",
    cmc: 3,
    colors: [ 'G', 'U' ],
    type: ['Legendary', 'Creature', '—', 'Elder', 'Giant'],
    text:
        'When Uro enters the battlefield, sacrifice it unless it escaped.\nWhenever Uro enters the battlefield or attacks, you gain 3 life and draw a card, then you may put a land card from your hand onto the battlefield.\nEscape—{G}{G}{U}{U}, Exile five other cards from your graveyard. (You may cast this card from your graveyard for its escape cost.)',
    cost: { generic: 1, G: 1, U: 1 },
});

const frilledMystic = () => ({
    id: '50595d02-edad-48a6-b10c-6fa859cc88bb',
    name: 'Frilled Mystic',
    cmc: 4,
    colors: [ 'G', 'U' ],
    type: ['Creature', '—', 'Elf', 'Lizard', 'Wizard'],
    text:
        'Flash\nWhen Frilled Mystic enters the battlefield, you may counter target spell.',
    cost: { G: 2, U: 2 }
});

const deathRite = () => ({
    name: 'Deathrite Shaman',
    cmc: 1,
    colors: [ 'B', 'G' ],
    type: ['Creature', '—', 'Elf', 'Shaman'],
    text: '{T}: Exile target land card from a graveyard. Add one mana of any color.\n{B}, {T}: Exile target instant or sorcery card from a graveyard. Each opponent loses 2 life.\n{G}, {T}: Exile target creature card from a graveyard. You gain 2 life.',
    cost: { 'B/G': 1 },
    mana_cost: '{B/G}',
   card_faces: undefined,
});

const saheeli = () => ({
    name: 'Saheeli, Sublime Artificer',
    cmc: 3,
    colors: [ 'R', 'U' ],
    type: ['Legendary', 'Planeswalker', '—', 'Saheeli'],
    text: 'Whenever you cast a noncreature spell, create a 1/1 colorless Servo artifact creature token.\n−2: Target artifact you control becomes a copy of another target artifact or creature you control until end of turn, except it\'s an artifact in addition to its other types.',
    cost: { generic: 1, 'U/R': 2 },
    mana_cost: '{1}{U/R}{U/R}',
    card_faces: undefined,
});

const glacialFortress = () => ({
    etbTapped: (lands) => {
        const untapped = !(lands.some(l => {
            return ['Plains', 'Island'].some(land => l.type.includes(land))
        }));
        return untapped;
    },
    name: 'Glacial Fortress',
    cmc: 0,
    colors: [ 'U', 'W' ],
    type: [ 'Land' ],
    text: 'Glacial Fortress enters the battlefield tapped unless you control a Plains or an Island.\n{T}: Add {W} or {U}.',
    cost: {},
    mana_cost: '',
    card_faces: undefined,
});

const irrigatedFarmland = () => ({
    etbTapped: () => true,
    name: 'Irrigated Farmland',
    cmc: 0,
    colors: [ 'U', 'W' ],
    type: [ 'Land', '—', 'Plains', 'Island' ],
    text: '({T}: Add {W} or {U}.)\nIrrigated Farmland enters the battlefield tapped.\nCycling {2} ({2}, Discard this card: Draw a card.)',
    cost: {},
    mana_cost: '',
    card_faces: undefined,
});

const meddlingMage = () => ({
    name: 'Meddling Mage',
    cmc: 2,
    colors: [ 'U', 'W' ],
    type: [ 'Creature'],
    text: '',
    cost: { U: 1, W: 1 },
    mana_cost: '{W}{U}',
    card_faces: undefined,
});

module.exports = {
    forest,
    island,
    mountain,
    swamp,
    volcanicIsland,
    simicGuildGate,
    fabledPassage,
    evolvingWilds,
    prismaticVista,
    mistyRainforest,
    bloodstainedMire,
    marshFlats,
    growthSpiral,
    giantGrowth,
    mockIsland,
    mockTempleSimic,
    mockTempleGolgari,
    mockGrowthSpiral,
    mockUro,
    frilledMystic,
    deathRite,
    saheeli,
    irrigatedFarmland,
    glacialFortress,
    meddlingMage,
};
