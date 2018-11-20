import React, { Component } from 'react';

export const GetPageTitle = ({ Store }) => WrappedComponent => {
  return class GetPageTitle extends Component {
    constructor(props) {
      super(props);
      this.state = this.initialState;
      this.onChangePageTitle = this.onChangePageTitle.bind(this);
    }

    get initialState() {
      return {
        storeUnSubscribe: null,
      };
    }

    componentDidMount() {
      this.onChangePageTitle();
      this.setState({
        storeUnSubscribe: Store.subscribe(() => {
          this.onChangePageTitle();
        }),
      });
    }

    componentWillUnmount() {
      if (this.state.storeUnSubscribe) {
        this.state.storeUnSubscribe();
      }
    }
    onChangePageTitle() {
      if (isBrowser) {
        try {
          const $Title = document.getElementsByTagName('title')[0];
          const currentTitle = $Title.innerHTML;
          const newTitle = `TYB: ${this.props.route.name}`;
          if (currentTitle !== newTitle) {
            $Title.innerHTML = newTitle;
          }
        } catch (err) {
          console.error(err);
        }
      }
    }

    render() {
      const { staticContext, route } = this.props;
      if (staticContext && route) {
        staticContext.pageTitle = route.name;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default GetPageTitle;
