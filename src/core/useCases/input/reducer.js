import InputActionTypes from './types';

const init = {
    decklist: '',
    xValue: 2,
};

const inputReducer = (state = init, action) => {
    switch (action.type) {
        case InputActionTypes.SET_DECKLIST:
            return { ...state, decklist: action.payload };
        case InputActionTypes.SET_X_VALUE:
            return { ...state, xValue: action.payload };
        default:
            return state;
    }
};

export default inputReducer;
