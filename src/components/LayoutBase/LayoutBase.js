import React, { Fragment, PureComponent } from 'react';
import { LAYOUT_ADMIN, LAYOUT_APP, LAYOUT_AUTH } from "../../shared/layout";

export class LayoutBase extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      Layout: null,
      routes: null,
      loading: true,
      indexRoute: null,
    };
  }

  componentDidMount() {
    const {
      route: { routes },
      location,
    } = this.props;
    this.updateLayout(location, routes);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.state.pathname) {
      const {
        route: { routes },
        location,
      } = nextProps;
      this.updateLayout(location, routes);
    }
  }

  findLayoutInPathname = (pathname) => {
    if(pathname.indexOf(`${LAYOUT_AUTH}`) === 1){
      return 0;
    } else if(pathname.indexOf(`${LAYOUT_APP}`) === 1){
      return 1;
    } else if(pathname.indexOf(`${LAYOUT_ADMIN}`) === 1){
      return 2;
    }
  };

  updateLayout = (location, routes) => {
    const indexRoute = this.findLayoutInPathname(location.pathname);
    this.setState(
      () => ({
        indexRoute,
        pathname: location.pathname,
        Layout: routes[indexRoute].component,
        routes: routes[indexRoute],
        loading: false,
      }),
      () => console.log(`Run: layout - (${indexRoute}), path - ${location.pathname} `),
    );
  };

  render() {
    const { Layout, routes } = this.state;
    return (
      <Fragment>
        {Layout && <Layout {...this.props} route={routes} />}
      </Fragment>
    );
  }
}


export default LayoutBase;
