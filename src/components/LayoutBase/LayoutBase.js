import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import Notifications from 'react-notification-system-redux';

/** View */
import Portal from '../Portal';
import { Text } from '../Text/Text';
import { PreloaderWrapper, SpeedingWheel } from '../SmallPreloader/SmallPreloader';

/** Constants */
import { LAYOUT_ADMIN, LAYOUT_APP } from '../../shared/layout';

/** Redux */
import { getUserFromStore } from '../../store/reducers/user/selectors';






export class LayoutBase extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
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
        <Portal portalContainerId={'notification-portal'}>
          <Notifications notifications={notifications} />
        </Portal>
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
