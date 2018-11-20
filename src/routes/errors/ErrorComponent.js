import React from 'react';
import PropTypes from 'prop-types';

export const ErrorComponent = ({ error }) => <div>{error.message}</div>;

ErrorComponent.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};
ErrorComponent.defaultProps = {
  error: null,
};

export default ErrorComponent;
