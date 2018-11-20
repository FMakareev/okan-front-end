/* global isBrowser */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/index';

const createStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const initialState = isBrowser ? window.PRELOADED_REDUX_STATE : {};

const Store = createStoreMiddleware(rootReducer, initialState, composeWithDevTools());

export { Store };

export default Store;
