const { cachedCanPlaySpellOnCurve, hasCorrectColors, isCheckLand, isFetchland, evaluateEtb } = require('../cards/utils');
const { forest, island, mountain, swamp, simicGuildGate, giantGrowth, growthSpiral,
        mockGrowthSpiral, mockTempleSimic, mockIsland, mockTempleGolgari, mockUro,
        frilledMystic, deathRite, saheeli, volcanicIsland, irrigatedFarmland, glacialFortress,
        meddlingMage
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

const testCanPlayOnCurve = ({ text, lands, spell, outcome }) => () => {
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
    });
    it('Fabled Passage', () => {
        const land = {
            text: '{T}, Sacrifice Fabled Passage: Search your library for a basic land card, put it onto the battlefield tapped, then shuffle your library. Then if you control four or more lands, untap that land.',
        };
        const landsUntap = ['land1', 'land2', 'land3', 'land4'];
        const landsTap = ['land1', 'land2', 'land3'];
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Basic', 'tapped', 'four or more']);
        expect(evaluateEtb(land.text).etbTapped(landsUntap)).toEqual(false);
        expect(evaluateEtb(land.text).etbTapped(landsTap)).toEqual(true);
    });
    it('Prismatic Vista', () => {
        const land = {
            text: '{T}, Pay 1 life, Sacrifice Prismatic Vista: Search your library for a basic land card, put it onto the battlefield, then shuffle your library.',
        };
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Basic']);
        expect(evaluateEtb(land.text).etbTapped()).toEqual(false);
    });
    it('Misty Rainforest', () => {
        const land = {
            text: '{T}, Pay 1 life, Sacrifice Misty Rainforest: Search your library for a Forest or Island card, put it onto the battlefield, then shuffle your library.',
        };
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Forest', 'Island']);
        expect(evaluateEtb(land.text).etbTapped()).toEqual(false);
    });

    it('Bloodstained Mire', () => {
        const land = {
            text: '{T}, Pay 1 life, Sacrifice Bloodstained Mire: Search your library for a Swamp or Mountain card, put it onto the battlefield, then shuffle your library.',
        };
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Swamp', 'Mountain']);
        expect(evaluateEtb(land.text).etbTapped()).toEqual(false);
    });

    it('Marsh Flats', () => {
        const land = {
            text: '{T}, Pay 1 life, Sacrifice Marsh Flats: Search your library for a Plains or Swamp card, put it onto the battlefield, then shuffle your library.',
        };
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Plains', 'Swamp']);
        expect(evaluateEtb(land.text).etbTapped()).toEqual(false);
    });

    it('Evolving Wilds', () => {
        const land = {
            text: '{T}, Sacrifice Evolving Wilds: Search your library for a basic land card, put it onto the battlefield tapped, then shuffle your library.',
        };
        expect(isFetchland(land.text)).toBeTruthy();
        expect(isFetchland(land.text)).toEqual(['Basic', 'tapped']);
        expect(evaluateEtb(land.text).etbTapped()).toEqual(true);
    });
});
