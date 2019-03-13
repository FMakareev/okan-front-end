import React, { Component } from 'react';
import { matchRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import NotificationsListObserver from '../NotificationsListObserver/NotificationsListObserver';
import {Head} from "@lib/ui/Head/Head";

export class LayoutApp extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return { name: '' };
  }

  updateName(name) {
    this.setState({ name });
  }

  renderRoutes = (routes, pathname) => {
    try {
      const result = matchRoutes(routes, pathname).reverse();
      const Component = result[0].route.component;
      const { location } = this.props;

      if (this.state.name !== result[0].route.name) {
        this.updateName(result[0].route.name);
      }

      return <Component location={location} route={result[0].route} match={result[0].match} />;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  };

  render() {
    const {
      route: { routes },
      location,
    } = this.props;
    return (
      <div>
        <Head
          name={this.state.name}
        />
        <NotificationsListObserver {...this.props} />
        <Header {...this.state} {...this.props} />
        <div style={{height: 40 + 'px'}}></div>
        {this.renderRoutes(routes, location.pathname)}
      </div>
    );
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
