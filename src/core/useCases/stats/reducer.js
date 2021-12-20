import { defaultLands, defaultResults, defaultSources } from '../../../data/defaultInputs';
import createRows from '../../utils/createRows';
import StatsActionTypes from './types';

const init = {
    lands: createRows(defaultLands),
    spells: createRows(defaultResults),
    sources: createRows(defaultSources),
};

const statsReducer = (state = init, action) => {
    switch (action.type) {
        case StatsActionTypes.SET_LANDS:
            return { ...state, lands: createRows(action.payload) };
        case StatsActionTypes.SET_SPELLS:
            return { ...state, spells: createRows(action.payload) };
        case StatsActionTypes.SET_SOURCES:
            return { ...state, sources: createRows(action.payload) };
        default:
            return state;
    }
};

export default statsReducer;
