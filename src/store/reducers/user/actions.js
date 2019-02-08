/* global isBrowser */

import {
  USER_INIT_LOADING_ERROR,
  USER_INIT_LOADING_START,
  USER_INIT_LOADING_SUCCESS,
  USER_NOT_AUTHORIZED,
  USER_REMOVE,
  USER_UPDATE_LOADING_ERROR,
  USER_UPDATE_LOADING_START,
  USER_UPDATE_LOADING_SUCCESS,
} from './actionTypes';
import { client as browserClient } from '../../../apollo/index.client';
import { client as serverClient } from '../../../apollo/index.server';
import CurrentUserItemQuery from './CurrentUserItemQuery.graphql';

/**
 * @desc метод инициализации пользователя в системе
 * */
export const userInit = (state, request) => dispatch => {
  let client = null;
  if (isBrowser) {
    client = browserClient();
  } else {
    client = serverClient(request);
  }
  return new Promise((resolve, reject) => {
    try {
      if (!state.user.initLoading && !state.user.isAuth) {
        dispatch({
          type: USER_INIT_LOADING_START,
        });
        client
          .query({ query: CurrentUserItemQuery })
          .then(response => {
            console.log('response:', response);
            const { data } = response;
            if (isBrowser) {
              localStorage.setItem('user', JSON.stringify(data.currentuseritem));
            }
            dispatch({ type: USER_INIT_LOADING_SUCCESS, user: { ...data.currentuseritem } });
            resolve(data.currentuseritem);
          })
          .catch(error => {
            if (isBrowser) {
              localStorage.clear();
            }
            console.error('Error userInit: ', error);
            /** */
            dispatch({
              type: USER_INIT_LOADING_ERROR,
              user: {
                error: USER_NOT_AUTHORIZED,
              },
            });
            resolve(error);
          });
      } else {
        resolve(true);
      }
    } catch (error) {
      console.error('Error userInit: ', error);
      dispatch({
        type: USER_INIT_LOADING_ERROR,
        user: {
          error: USER_NOT_AUTHORIZED,
        },
      });
      resolve(error);
    }
  });
};

export const userUpdate = () => dispatch => {
  let client = null;
  if (isBrowser) {
    client = browserClient;
  } else {
    client = serverClient;
  }
  return new Promise((resolve, reject) => {
    try {
      dispatch({
        type: USER_UPDATE_LOADING_START,
        user: {
          loading: true,
        },
      });

      client()
        .query({ query: CurrentUserItemQuery })
        .then(response => {
          const { data } = response;
          if (isBrowser) {
            localStorage.setItem('user', JSON.stringify(data.currentuseritem));
          }
          dispatch({ type: USER_UPDATE_LOADING_SUCCESS, user: { ...data.currentuseritem } });
          resolve(data.currentuseritem);
        })
        .catch(error => {
          console.log(error);
          if (isBrowser) {
            localStorage.clear();
          }
          dispatch({ type: USER_UPDATE_LOADING_ERROR, user: { error: error } });
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const userRemove = () => dispatch => {
  return new Promise((resolve, reject) => {
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
};

export default {
  userInit,
  userUpdate,
  userRemove,
};
