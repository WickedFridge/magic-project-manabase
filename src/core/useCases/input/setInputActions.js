import InputActionTypes from './types';

export const setDecklist = (decklist) => ({
    type: InputActionTypes.SET_DECKLIST,
    payload: decklist,
});

export const setXValue = (XValue) => ({
    type: InputActionTypes.SET_X_VALUE,
    payload: XValue,
});

export const setLoading = (loading) => ({
    type: InputActionTypes.SET_LOADING,
    payload: loading,
});
