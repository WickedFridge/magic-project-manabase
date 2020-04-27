const { cachedCanPlaySpellOnCurve, hasCorrectColors, isCheckLand, isFetchland, isFastland, evaluateEtb } = require('../cards/utils');
const { handleFetchlands } = require('../services/analyzeDecklist');
const { forest, island, mountain, swamp, simicGuildGate, giantGrowth, growthSpiral,
        mockGrowthSpiral, mockTempleSimic, mockIsland, mockTempleGolgari, mockUro,
        frilledMystic, deathRite, saheeli, volcanicIsland, irrigatedFarmland, glacialFortress,
        meddlingMage, marshFlats, bloodstainedMire, mistyRainforest, prismaticVista, evolvingWilds, fabledPassage,
        bloomingMarsh, maelstromPulse,
} = require('../cards');

describe('has Correct Colors unit testing', () => {
    it('basic testing 1', () => {
        const lands = [forest()];
        const spell = giantGrowth();
        expect(hasCorrectColors(lands, spell)).toBe(true);
    });

    it('basic testing 2', () => {
        const lands = [island(), swamp()];
        const spell = giantGrowth();
        expect(hasCorrectColors(lands, spell)).toBe(false);
    });

    it('handling generic mana', () => {
        const lands = [island(), swamp(), mockTempleGolgari()];
        const spell = mockUro();
        expect(hasCorrectColors(lands, spell)).toBe(true);
    });

    it('handling hybrid mana 1', () => {
        const lands = [island(), swamp()];
        const spell = deathRite();
        expect(hasCorrectColors(lands, spell)).toBe(true);
    });

    it('handling hybrid mana 2', () => {
        const lands = [mountain(), island()];
        const spell = deathRite();
        expect(hasCorrectColors(lands, spell)).toBe(false);
    });
});

const testCanPlayOnCurve = ({ lands, spell, outcome }) => () => {
    expect(cachedCanPlaySpellOnCurve(lands, spell)).toBe(outcome);
};

describe('Basic can play spell testing - color', () => {
    it('basic can play giant growth', testCanPlayOnCurve({
        lands: [forest()],
        spell: giantGrowth(),
        outcome: true,
    }));

    it(`basic can't play giant growth`, testCanPlayOnCurve({
        lands: [island()],
        spell: giantGrowth(),
        outcome: false,
    }));

    it('basic can play growth spiral', testCanPlayOnCurve({
        lands: [forest(), island()],
        spell: growthSpiral(),
        outcome: true,
    }));

    it(`basic can't play growth spiral 1`, testCanPlayOnCurve({
        lands: [island(0), island(1)],
        spell: growthSpiral(),
        outcome: false,
    }));

    it(`basic can't play growth spiral 2`, testCanPlayOnCurve({
        lands: [forest(0), forest(1)],
        spell: growthSpiral(),
        outcome: false,
    }));

    it(`mock can play growth spiral 0`, testCanPlayOnCurve({
        lands: [mockTempleSimic(), mockIsland()],
        spell: mockGrowthSpiral(),
        outcome: true,
    }));
});

describe('Basic can play spell testing - etb', () => {
    it('basic can play giant growth', testCanPlayOnCurve({
        lands: [forest(), simicGuildGate()],
        spell: giantGrowth(),
        outcome: true,
    }));
    it('basic can play growth spiral - 1', testCanPlayOnCurve({
        lands: [forest(), simicGuildGate()],
        spell: growthSpiral(),
        outcome: true,
    }));
    it('basic can play growth spiral - 2', testCanPlayOnCurve({
        lands: [simicGuildGate(), island()],
        spell: growthSpiral(),
        outcome: true,
    }));
    it(`can play growth spiral - 3`, testCanPlayOnCurve({
        lands: [simicGuildGate(0), simicGuildGate(1), island()],
        spell: growthSpiral(),
        outcome: true,
    }));
    it(`basic can't play growth spiral - 1`, testCanPlayOnCurve({
        lands: [simicGuildGate(0), simicGuildGate(1)],
        spell: growthSpiral(),
        outcome: false,
    }));
    it(`basic can't play growth spiral - 2`,testCanPlayOnCurve({
        lands: [simicGuildGate(0), simicGuildGate(1), mountain()],
        spell: growthSpiral(),
        outcome: false,
    }));
});

describe('can play spell testing - generic mana', () => {
    it('can play Uro', testCanPlayOnCurve({
        lands: [mockTempleGolgari(), island(), swamp()],
        spell: mockUro(),
        outcome: true,
    }));
    it('can play Frilled Mystic', testCanPlayOnCurve({
        lands: [mockTempleGolgari(0), mockTempleGolgari(1), island(0), island(1)],
        spell: frilledMystic(),
        outcome: true,
    }));
});

describe('can play spell testing - hybrid mana', () => {
    it('can play Deathrite 1', testCanPlayOnCurve({
        lands: [forest(0)],
        spell: deathRite(0),
        outcome: true,
    }));
    it('can play Deathrite 2', testCanPlayOnCurve({
        lands: [swamp(0)],
        spell: deathRite(0),
        outcome: true,
    }));
    it('can play Saheeli 1', testCanPlayOnCurve({
        lands: [island(0), mountain(0), mountain(1)],
        spell: saheeli(0),
        outcome: true,
    }));
    it('can play Saheeli 2', testCanPlayOnCurve({
        lands: [volcanicIsland(0), volcanicIsland(1), swamp(0)],
        spell: saheeli(0),
        outcome: true,
    }));
    it('can not Saheeli 1', testCanPlayOnCurve({
        lands: [volcanicIsland(0), swamp(0), swamp(1)],
        spell: saheeli(0),
        outcome: false,
    }));
});


describe('can play spell testing - checklands', () => {
    it('can play Meddling Mage 1', testCanPlayOnCurve({
        lands: [irrigatedFarmland(0), glacialFortress(0)],
        spell: meddlingMage(0),
        outcome: true,
    }));
    it('can play Meddling Mage 2', testCanPlayOnCurve({
        lands: [irrigatedFarmland(0), glacialFortress(0), glacialFortress(1)],
        spell: meddlingMage(0),
        outcome: true,
    }));
    it('can play Meddling Mage 3', testCanPlayOnCurve({
        lands: [irrigatedFarmland(0), irrigatedFarmland(1), glacialFortress(0)],
        spell: meddlingMage(0),
        outcome: true,
    }));
    it('can not play Meddling Mage 1', testCanPlayOnCurve({
        lands: [irrigatedFarmland(0), irrigatedFarmland(1)],
        spell: meddlingMage(0),
        outcome: false,
    }));
    it('can not play Meddling Mage 2', testCanPlayOnCurve({
        lands: [glacialFortress(0), glacialFortress(1)],
        spell: meddlingMage(0),
        outcome: false,
    }));
});

describe('isCheckland testing', () => {
    it('No checkland', () => {
        const land = {
            text: 'coucou',
        };
        expect(isCheckLand(land.text)).toBe(false);
    });
    it('plains', () => {
        const land = {
            text: 'Castle Ardenvale enters the battlefield tapped unless you control a Plains.',
        };
        expect(isCheckLand(land.text)).toBeTruthy();
        expect(isCheckLand(land.text)).toEqual(['Plains']);
    });
    it('mountain', () => {
        const land = {
            text: 'Castle Embereth enters the battlefield tapped unless you control a Mountain.',
        };
        expect(isCheckLand(land.text)).toBeTruthy();
        expect(isCheckLand(land.text)).toEqual(['Mountain']);
    });
    it('Forest', () => {
        const land = {
            text: 'Castle Garenbrig enters the battlefield tapped unless you control a Forest.',
        };
        expect(isCheckLand(land.text)).toBeTruthy();
        expect(isCheckLand(land.text)).toEqual(['Forest']);
    });
    it('Swamp', () => {
        const land = {
            text: 'Castle Lochwain enters the battlefield tapped unless you control a Swamp.',
        };
        expect(isCheckLand(land.text)).toBeTruthy();
        expect(isCheckLand(land.text)).toEqual(['Swamp']);
    });
    it('Island', () => {
        const land = {
            text: 'Castle Vantress enters the battlefield tapped unless you control a Island.',
        };
        expect(isCheckLand(land.text)).toBeTruthy();
        expect(isCheckLand(land.text)).toEqual(['Island']);
    });

    it('Island Plains', () => {
        const land = {
            text: 'Glacial Fortress enters the battlefield tapped unless you control a Plains or an Island.',
        };
        expect(isCheckLand(land.text)).toBeTruthy();
        expect(isCheckLand(land.text)).toEqual(['Plains', 'Island']);
    });
});

describe('isFetchland testing', () => {
    it('No Fetchland', () => {
        const land = {
            text: 'coucou',
        };
        expect(isFetchland(land.text)).toBe(false);
        expect(evaluateEtb(land.text).fetchland).toBeFalsy();
    });
    it('Fabled Passage', () => {
        const land = fabledPassage(0);
        const landsUntap = [forest(0), forest(1), forest(2), mountain(3)];
        const landsTap = [forest(0), forest(1), island(2)];
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Basic', 'tapped', 'four or more']);
        expect(evaluateEtb(land.text).fetchland).toBeTruthy();
        expect(evaluateEtb(land.text).etbTapped(landsUntap)).toEqual(false);
        expect(evaluateEtb(land.text).etbTapped(landsTap)).toEqual(true);
    });
    it('Prismatic Vista', () => {
        const land = prismaticVista(0);
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Basic']);
        expect(evaluateEtb(land.text).fetchland).toBeTruthy();
        expect(evaluateEtb(land.text).etbTapped()).toEqual(false);
    });
    it('Misty Rainforest', () => {
        const land = mistyRainforest(0);
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Forest', 'Island']);
        expect(evaluateEtb(land.text).fetchland).toBeTruthy();
        expect(evaluateEtb(land.text).etbTapped()).toEqual(false);
    });

    it('Bloodstained Mire', () => {
        const land = bloodstainedMire(0);
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Swamp', 'Mountain']);
        expect(evaluateEtb(land.text).fetchland).toBeTruthy();
        expect(evaluateEtb(land.text).etbTapped()).toEqual(false);
    });

    it('Marsh Flats', () => {
        const land = marshFlats(0);
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Plains', 'Swamp']);
        expect(evaluateEtb(land.text).fetchland).toBeTruthy();
        expect(evaluateEtb(land.text).etbTapped()).toEqual(false);
    });

    it('Evolving Wilds', () => {
        const land = evolvingWilds(0);
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Basic', 'tapped']);
        expect(evaluateEtb(land.text).fetchland).toBeTruthy();
        expect(evaluateEtb(land.text).etbTapped()).toEqual(true);
    });
});

describe('handle Fetchland', () => {
    it('Fabled Passage', () => {
        const land = fabledPassage(0);
        land.fetchland = isFetchland(land.text);
        const lands = [forest(0), mountain(0), volcanicIsland(0), land];
        handleFetchlands(lands);
        expect(land.colors).toEqual(['G', 'R']);
    });
    it('Prismatic Vista', () => {
        const land = prismaticVista(0);
        land.fetchland = isFetchland(land.text);
        const lands = [swamp(0), mountain(0), volcanicIsland(0), land];
        handleFetchlands(lands);
        expect(land.colors).toEqual(['B', 'R']);
    });
    it('Misty Rainforest', () => {
        const land = mistyRainforest(0);
        land.fetchland = isFetchland(land.text);
        const lands = [swamp(0), mountain(0), volcanicIsland(0), land];
        handleFetchlands(lands);
        expect(land.colors).toEqual(['U', 'R']);
    });

    it('Bloodstained Mire', () => {
        const land = bloodstainedMire(0);
        land.fetchland = isFetchland(land.text);
        const lands = [swamp(0), mountain(0), volcanicIsland(0), land];
        handleFetchlands(lands);
        expect(land.colors).toEqual(['B', 'R', 'U']);
    });

    it('Marsh Flats', () => {
        const land = marshFlats(0);
        land.fetchland = isFetchland(land.text);
        const lands = [swamp(0), mountain(0), volcanicIsland(0), land];
        handleFetchlands(lands);
        expect(land.colors).toEqual(['B']);
    });

    it('Evolving Wilds', () => {
        const land = prismaticVista(0);
        land.fetchland = isFetchland(land.text);
        const lands = [swamp(0), forest(0), volcanicIsland(0), land];
        handleFetchlands(lands);
        expect(land.colors).toEqual(['B', 'G']);
    });
});

describe('fastland testing', () => {
    it('Blooming marsh', () => {
        const land = bloomingMarsh(0);
        expect(isFastland(land.text)).toBe(true);
    });
    it('can play giant growth', () => {
        const landsUntap = [bloomingMarsh(0), bloomingMarsh(1), bloomingMarsh(2)];
        const landsTap = [simicGuildGate(0), simicGuildGate(1), bloomingMarsh(0), bloomingMarsh(1)];
        const land = {
            text: 'Blooming Marsh enters the battlefield tapped unless you control two or fewer other lands.\n{T}: Add {B} or {G}.',
        };
        expect(evaluateEtb(land.text).etbTapped(landsTap, 4)).toBe(true);
        expect(evaluateEtb(land.text).etbTapped(landsTap, 2)).toBe(false);
        expect(evaluateEtb(land.text).etbTapped(landsUntap, 3)).toBe(false);
    });
    it('can play giantGrowth with 3 fastlands', testCanPlayOnCurve({
        lands: [bloomingMarsh(0), bloomingMarsh(1), bloomingMarsh(2)],
        spell: giantGrowth(0),
        outcome: true,
    }));
    it('can not play frilled Mystic with 2 fastlands and 2 guildgate', testCanPlayOnCurve({
        lands: [simicGuildGate(0), simicGuildGate(1), bloomingMarsh(0), bloomingMarsh(1)],
        spell: frilledMystic(0),
        outcome: false,
    }));
    it('can play Maelstrom Pulse with 3 fastlands', testCanPlayOnCurve({
        lands: [bloomingMarsh(0), bloomingMarsh(1), bloomingMarsh(2)],
        spell: maelstromPulse(0),
        outcome: true,
    }));
});
