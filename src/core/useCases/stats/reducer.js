import { defaultResults } from '../../../data/defaultInputs';
import createRows from '../../utils/createRows';
import StatsActionTypes from './types';

const defaultRows = createRows(defaultResults);

const init = {
    lands: defaultRows,
    spells: defaultRows,
};

const statsReducer = (state = init, action) => {
    switch (action.type) {
        case StatsActionTypes.SET_LANDS:
            return { ...state, lands: createRows(action.payload) };
        case StatsActionTypes.SET_SPELLS:
            return { ...state, spells: createRows(action.payload) };
        default:
            return state;
    }
};

export default statsReducer;
