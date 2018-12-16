import { USER_ADD, USER_REMOVE } from './actionTypes';

const initialState = {
  error: null,
  initLoading: false,
  updateLoading: false,
  isAuth: false,
};
export const ReducerUser = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case USER_ADD:
      return Object.assign({}, prevState, payload);
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

      return null;
    default:
      return prevState;
  }
};

export default ReducerUser;
