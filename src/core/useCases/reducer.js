import { combineReducers } from 'redux';
import inputReducer from './input/reducer';
import popupReducer from './popup/reducer';

export const appReducer = combineReducers({
    input: inputReducer,
    popup: popupReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
