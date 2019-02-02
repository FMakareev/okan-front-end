import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import { localeReducer as locale } from 'react-localize-redux';
// import { ReducerFormLogin } from './form/reducers';
import { reducer as notifications } from 'react-notification-system-redux';
import { ReducerUser } from './user/reducers';
import { ReducerBlocksBinding } from './blocksBinding/reducers';

export const rootReducer = combineReducers({
  form: formReducer.plugin({
    // FormLogin: ReducerFormLogin,
  }),
  // locale,
  user: ReducerUser,
  blocksBinding: ReducerBlocksBinding,
  notifications,
});

export default rootReducer;
