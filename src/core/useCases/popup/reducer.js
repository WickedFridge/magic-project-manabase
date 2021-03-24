import PopupActionTypes from './types';

const init = {
    open: false,
    querySuccess: null,
    errorMessage: null,
};

const popupReducer = (state = init, action) => {
    switch (action.type) {
        case PopupActionTypes.SET_OPEN:
            return { ...state, open: action.payload };
        case PopupActionTypes.SET_QUERY_SUCCESS:
            return { ...state, querySuccess: action.payload };
        case PopupActionTypes.SET_ERROR_MESSAGE:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

export default popupReducer;
