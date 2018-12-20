/* global isBrowser */

import {
  USER_ADD,
  USER_INIT_LOADING_ERROR,
  USER_INIT_LOADING_START,
  USER_INIT_LOADING_SUCCESS,
  USER_NOT_AUTHORIZED,
  USER_REMOVE,
  USER_UPDATE_LOADING_ERROR,
  USER_UPDATE_LOADING_START,
  USER_UPDATE_LOADING_SUCCESS,
} from './actionTypes';
import { mocksClient } from '../../../apollo/mocksClient';
// import { client } from '../../../apollo/index.client';
import UserEmailItemQuery from './UserEmailItemQuery.graphql';

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
        console.log(user);
        if (user) {
          /** TODO : Заменить mocksClient на обычный client и убрать setTimeout */
          // setTimeout(()=>{
          mocksClient
            .query({ query: UserEmailItemQuery, variables: { email: user.email } })
            .then(({ data }) => {
              const { useremailitem } = data;
              localStorage.setItem('user', JSON.stringify(useremailitem));
              dispatch({ type: USER_INIT_LOADING_SUCCESS, user: { ...useremailitem } });
              resolve(useremailitem);
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
          // }, 500)
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
          /** TODO : Заменить mocksClient на обычный client и убрать setTimeout */
          // setTimeout(()=>{
          mocksClient
            .query({ query: UserEmailItemQuery, variables: { email: user.email } })
            .then(({ data }) => {
              const { useremailitem } = data;
              localStorage.setItem('user', JSON.stringify(useremailitem));
              dispatch({ type: USER_UPDATE_LOADING_SUCCESS, user: { ...useremailitem } });
              resolve(useremailitem);
            })
            .catch(error => {
              console.log(error);
              localStorage.clear();
              /** */
              dispatch({ type: USER_UPDATE_LOADING_ERROR, user: { error: error } });
              reject(error);
            });
          // }, 500)
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
