import React, {Component} from 'react';
import { matchRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

export class LayoutApp extends Component {
  static propTypes = {};

  renderRoutes = (routes, pathname) => {
    try {
      let result = matchRoutes(routes, pathname).reverse();
      let Component = result[0].route.component;
      return (
        <Component location={this.props.location} route={result[0].route} match={result[0].match} />
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      route: { routes },
      location,
    } = this.props;
    return ( <div>{this.renderRoutes(routes, location.pathname)}</div>);
  }
}

LayoutApp.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array,
    component: PropTypes.func,
  }),
};
LayoutApp.defaultProps = {
  route: null,
};

export default LayoutApp;
