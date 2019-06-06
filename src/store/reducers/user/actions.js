/* global isBrowser, ENDPOINT_CLIENT */

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
import {client as browserClient} from '../../../apollo/index.client';
import {client as serverClient} from '../../../apollo/index.server';
import CurrentUserItemQuery from './CurrentUserItemQuery.graphql';
import {resetUserToken} from './resetUserToken';
import {jsonToUrlEncoded} from "@lib/utils/jsontools/jsonToUrlEncoded";
import fetch from 'isomorphic-fetch';

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
          .query({query: CurrentUserItemQuery})
          .then(response => {
            const {data} = response;
            if (isBrowser) {
              localStorage.setItem('user', JSON.stringify(data.currentuseritem));
            }
            dispatch({type: USER_INIT_LOADING_SUCCESS, user: {...data.currentuseritem}});
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
        .query({query: CurrentUserItemQuery})
        .then(response => {
          const {data} = response;
          if (isBrowser) {
            localStorage.setItem('user', JSON.stringify(data.currentuseritem));
          }
          dispatch({type: USER_UPDATE_LOADING_SUCCESS, user: {...data.currentuseritem}});
          resolve(data.currentuseritem);
        })
        .catch(error => {
          if (isBrowser) {
            localStorage.clear();
          }
          dispatch({type: USER_UPDATE_LOADING_ERROR, user: {error: error}});
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
        resetUserToken();

        dispatch(USER_REMOVE);
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// TODO: not working
export const userLogin = () => dispatch => {

  return new Promise(() => {

    fetch(`${ENDPOINT_CLIENT}/user/auth`, {
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: jsonToUrlEncoded(value),
    });

  })


}


export default {
  userInit,
  userUpdate,
  userRemove,
};
