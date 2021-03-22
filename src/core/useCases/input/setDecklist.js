import InputActionTypes from './types';

const setDecklist = (decklist) => ({
    type: InputActionTypes.SET_DECKLIST,
    payload: decklist,
});

export default setDecklist;
