import { combineReducers } from 'redux';
import inputReducer from './input/reducer';

export const appReducer = combineReducers({
    input: inputReducer,
    // stats: statsReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
