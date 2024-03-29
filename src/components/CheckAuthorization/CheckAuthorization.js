import React from 'react';
import { Redirect } from 'react-router-dom';
import {captureException} from "../../hocs/withSentry/withSentry";

/**
 * @param {array} role - массив ролей у которых есть доступ к компоненту
 * @param {object} AccessDeniedCallback - компонент кторый должен быть отображен в случае ошибки
 * @desc
 * */
export let CheckAuthorization = (role = [], AccessDeniedCallback = null) => WrappedComponent => {
  return props => {
    try {
      const { user } = props;
      if (!user || (user && user.error)) {
        return <Redirect to={'/'} />;
      }
      if (user && user.initLoading) {
        return null;
      }
      if (user && user.role && user.role.name && role.length && !role.filter(item => item === user.role.name).length) {
        return AccessDeniedCallback || <Redirect to={'/'} />;
      }
    } catch (error) {
      console.error(error);
      captureException(error);
    }
    return <WrappedComponent {...props} />;
  };
};

export default CheckAuthorization;
