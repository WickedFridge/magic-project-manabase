import StatsActionTypes from './types';

export const setSpells = (spells) => ({
    type: StatsActionTypes.SET_SPELLS,
    payload: spells,
});

export const setLands = (lands) => ({
    type: StatsActionTypes.SET_LANDS,
    payload: lands,
});
