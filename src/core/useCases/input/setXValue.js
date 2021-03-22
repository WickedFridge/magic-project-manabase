import InputActionTypes from './types';

const setXValue = (XValue) => ({
    type: InputActionTypes.SET_X_VALUE,
    payload: XValue,
});

export default setXValue;
