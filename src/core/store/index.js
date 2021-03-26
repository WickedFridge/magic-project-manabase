import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../useCases/reducer';
import history from '../utils/history';
import config from '../../config';

const composedEnhancer = composeWithDevTools(
    applyMiddleware(
        thunkMiddleware.withExtraArgument({
            backendUrl: config.backendUrl,
            history,
        }),
    ),
);

const store = createStore(rootReducer, composedEnhancer);

export default store;
