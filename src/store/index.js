/* global isBrowser */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/index';
import { userInit } from './reducers/user/actions';

const CreateStore = () => {
  const createStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
  const initialState = isBrowser ? window.PRELOADED_REDUX_STATE : {};

  const Store = createStoreMiddleware(rootReducer, initialState, composeWithDevTools());

  if (isBrowser) {
    Store.dispatch(userInit(Store.getState()));
  }
  return Store;
};

export { CreateStore };

export default CreateStore;
