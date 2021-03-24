import PopupActionTypes from './types';

export const setOpen = (isOpen) => ({
    type: PopupActionTypes.SET_OPEN,
    payload: isOpen,
});

export const setQuerySuccess = (querySuccess) => ({
    type: PopupActionTypes.SET_QUERY_SUCCESS,
    payload: querySuccess,
});

export const setErrorMessage = (errorMessage) => ({
    type: PopupActionTypes.SET_ERROR_MESSAGE,
    payload: errorMessage,
});
