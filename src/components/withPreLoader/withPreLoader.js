import React, {Component} from 'react';

export const withPreLoader = () => Component => {

  return class PreLoader extends Component {
    state = {
      isLoading: false,
    };

    render() {
      return (<Component isLoading={this.state.isLoading} preLoaderToggle={() => {
        this.setState(state => ({
          isLoading: !state.isLoading,
        }))
      }} {...this.props}/>)
    }
  }

};

export default withPreLoader
