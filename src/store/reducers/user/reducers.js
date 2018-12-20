/** isBrowser */
import {
  USER_ADD, USER_INIT_LOADING_ERROR,
  USER_INIT_LOADING_START, USER_INIT_LOADING_SUCCESS,
  USER_REMOVE, USER_UPDATE_LOADING_ERROR, USER_UPDATE_LOADING_START, USER_UPDATE_LOADING_SUCCESS
} from './actionTypes';

const initialState = {
  error: null,
  initLoading: false,
  updateLoading: false,
  isAuth: false,
};

export const ReducerUser = (prevState = initialState, {type, user, ...rest}) => {
  switch (type) {
    case USER_INIT_LOADING_START:
      return Object.assign({}, prevState, {
        initLoading: true,
        ...user
      });
    case  USER_INIT_LOADING_SUCCESS:
      return Object.assign({}, prevState, {
        ...initialState,
        ...user,
        isAuth: true,
      });
    case USER_INIT_LOADING_ERROR:
      return Object.assign({}, prevState, {
        initLoading: false,
        isAuth: false,
        ...user
      });
      /** экшены обновления пользователя */
    case USER_UPDATE_LOADING_START:
      return Object.assign({}, prevState, {
        updateLoading: true,
        ...user
      });
    case  USER_UPDATE_LOADING_SUCCESS:
      return Object.assign({}, prevState, {
        ...initialState,
        isAuth: true,
        ...user
      });
    case USER_UPDATE_LOADING_ERROR:
      return Object.assign({}, prevState, {
        ...initialState,
        isAuth: false,
        ...user
      });
    case USER_ADD:
      return Object.assign({}, prevState, {
        ...initialState,
        isAuth: true,
        ...user
      });
    case USER_REMOVE:
      if (isBrowser) {
        window.localStorage.clear();

        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i += 1) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
      }

      return initialState;
    default:
      return prevState;
  }
};

export default ReducerUser;
