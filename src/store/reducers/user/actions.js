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
import {client} from '../../../apollo/index.client';
import CurrentUserItemQuery from './CurrentUserItemQuery.graphql';

/**
 * @desc метод инициализации пользователя в системе
 * */
export const userInit = () => dispatch => {
  return new Promise((resolve, reject) => {
    try {
      if (isBrowser) {
        dispatch({
          type: USER_INIT_LOADING_START,
        });
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
          return client()
            .query({query: CurrentUserItemQuery})
            .then((response) => {
              console.log('response:', response);

              const {data} = response;

              localStorage.setItem('user', JSON.stringify(data.currentuseritem));

              dispatch({type: USER_INIT_LOADING_SUCCESS, user: {...data.currentuseritem}});
              resolve(data.currentuseritem);

            })
            .catch(error => {
              localStorage.clear();
              console.log(error);
              /** */
              dispatch({
                type: USER_INIT_LOADING_ERROR,
                user: {
                  error: USER_NOT_AUTHORIZED,
                },
              });
              reject(error);
            });
        } else {
          localStorage.clear();
          dispatch({
            type: USER_INIT_LOADING_ERROR,
            user: {
              error: USER_NOT_AUTHORIZED,
            },
          });
        }
      }
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

export const userUpdate = () => dispatch => {
  return new Promise((resolve, reject) => {
    try {
      if (isBrowser) {
        dispatch({
          type: USER_UPDATE_LOADING_START,
          user: {
            loading: true,
          },
        });
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          client()
            .query({query: CurrentUserItemQuery, variables: {email: user.email}})
            .then((response) => {
              const {data} = response;
              localStorage.setItem('user', JSON.stringify(data.currentuseritem));
              dispatch({type: USER_UPDATE_LOADING_SUCCESS, user: {...data.currentuseritem}});
              resolve(data.currentuseritem);
            })
            .catch(error => {
              console.log(error);
              localStorage.clear();
              dispatch({type: USER_UPDATE_LOADING_ERROR, user: {error: error}});
              reject(error);
            });
        } else {
          localStorage.clear();
          dispatch({
            type: USER_UPDATE_LOADING_ERROR,
            user: {
              error: 'User not logged',
            },
          });
        }
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
