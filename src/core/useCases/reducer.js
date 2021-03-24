import { combineReducers } from 'redux';
import inputReducer from './input/reducer';
import popupReducer from './popup/reducer';
import statsReducer from './stats/reducer';

export const appReducer = combineReducers({
    input: inputReducer,
    popup: popupReducer,
    stats: statsReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
