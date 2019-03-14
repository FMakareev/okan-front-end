import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

import { LAYOUT_ADMIN, LAYOUT_APP, LAYOUT_AUTH } from '../../shared/layout';
import { getUserFromStore } from '../../store/reducers/user/selectors';
import { Text } from '../Text/Text';
import { PreloaderWrapper, SpeedingWheel } from '../SmallPreloader/SmallPreloader';
import { withApollo } from 'react-apollo';

export class LayoutBase extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
    // listen
    // this.props.client.initQueryManager();
  }

  get initialState() {
    const {
      route: { routes },
      location,
    } = this.props;
    const indexRoute = this.findLayoutInPathname(location.pathname);

    return {
      indexRoute,
      pathname: location.pathname,
      Layout: routes[indexRoute] ? routes[indexRoute].component : null,
      routes: routes[indexRoute],
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const pathname = this.state;

    if (nextProps.location.pathname !== pathname) {
      const {
        route: { routes },
        location,
      } = nextProps;
      this.updateLayout(location, routes);
    }
  }

  findLayoutInPathname = pathname => {
    if (pathname.indexOf(`${LAYOUT_APP}`) === 1) {
      return 1;
    } else if (pathname.indexOf(`${LAYOUT_ADMIN}`) === 1) {
      return 2;
    } else {
      return 0;
    }
  };

  updateLayout = (location, routes) => {
    const indexRoute = this.findLayoutInPathname(location.pathname);

    this.setState(
      () => ({
        indexRoute,
        pathname: location.pathname,
        Layout: routes[indexRoute] ? routes[indexRoute].component : null,
        routes: routes[indexRoute],
        loading: false,
      }),
      () => {
        // console.log(`Run: layout - (${indexRoute}), path - ${location.pathname} `)
      },
    );
  };
  render() {
    const { Layout, routes } = this.state;
    const { user, notifications } = this.props;
    return (
      <Fragment>
        {user && user.initLoading && (
          <PreloaderWrapper>
            <Text fontSize={12}>
              <SpeedingWheel />
            </Text>
          </PreloaderWrapper>
        )}
        {user && !user.initLoading && Layout && <Layout {...this.props} route={routes} />}

        <Notifications notifications={notifications} />
      </Fragment>
    );
  }
}
LayoutBase = connect(state => ({
  user: getUserFromStore(state),
  notifications: state.notifications,
}))(LayoutBase);

LayoutBase = withApollo(LayoutBase);

export default LayoutBase;
