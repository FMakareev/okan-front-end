/* global isBrowser */

import { USER_LOADING, USER_LOADING_ERROR, USER_LOADING_SUCCESS, USER_REMOVE } from './actionTypes';

export const userInit = () => dispatch =>
  new Promise((resolve, reject) => {
    try {
      dispatch({
        type: USER_LOADING_SUCCESS,
        user: JSON.parse(localStorage.getItem('user')),
      });
    } catch (error) {
      dispatch({
        type: USER_LOADING_ERROR,
        user: error,
      });
      reject(error);
    }
  });

export const userRemove = () => dispatch =>
  new Promise((resolve, reject) => {
    try {
      if (isBrowser) {
        window.localStorage.clear();
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i += 1) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
        dispatch(USER_REMOVE);
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });

export default {
  userInit,
  userRemove,
};
