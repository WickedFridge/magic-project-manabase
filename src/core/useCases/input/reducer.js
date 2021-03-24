import InputActionTypes from './types';

const init = {
    decklist: '',
    xValue: 2,
    loading: false,
};

const inputReducer = (state = init, action) => {
    switch (action.type) {
        case InputActionTypes.SET_DECKLIST:
            return { ...state, decklist: action.payload };
        case InputActionTypes.SET_X_VALUE:
            return { ...state, xValue: action.payload };
        case InputActionTypes.SET_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

export default inputReducer;
