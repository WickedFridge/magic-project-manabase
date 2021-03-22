import { createStore } from 'redux';
import rootReducer from '../useCases/reducer';

const store = createStore(rootReducer);

export default store;
