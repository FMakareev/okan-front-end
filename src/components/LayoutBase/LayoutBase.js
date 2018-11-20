import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import Header from "../Header";

export const LayoutBase = props => (
  <div>
    <Header/>

    <div>{renderRoutes(props.route.routes)}</div>
  </div>
);

LayoutBase.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array,
    component: PropTypes.func,
  }),
};
LayoutBase.defaultProps = {
  route: null,
};

export default LayoutBase;
