import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import { localizeReducer } from 'react-localize-redux';

export const rootReducer = combineReducers({
  form: formReducer,
  // locale: localizeReducer,
});

export default rootReducer;
