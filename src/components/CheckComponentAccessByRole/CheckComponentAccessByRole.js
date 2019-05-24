import React from 'react';
import PropTypes from 'prop-types';

const has = Object.prototype.hasOwnProperty;

/**
 * @desc компонент сравнивает переданную роль с ролью пользоватея и принимает решение если совпадали рендерит компонент иначе не рендерит
 * */
export const CheckComponentAccessByRole = ({ children, targetRole, userRole }) => {
  if (userRole && has.call(userRole, 'name')) {
    if (targetRole && Array.isArray(targetRole)) {
      if (targetRole.some(item => item === userRole.name)) {
        return children;
      }
    } else {
      return children;
    }
  } else {
  }
  return null;
};

CheckComponentAccessByRole.propTypes = {
  targetRole: PropTypes.array,
  userRole: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default CheckComponentAccessByRole;
