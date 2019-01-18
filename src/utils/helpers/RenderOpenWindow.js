import React, { Component } from 'react';

export const RenderOpenWindow = View => {
  return class extends Component {
    state = { isOpen: false };

    handleClick = () => {
      return this.setState(({ isOpen }) => {
        return { isOpen: !isOpen };
      });
    };
    render() {
      return <View {...this.props} {...this.state} handleClick={this.handleClick} />;
    }
  };
};

export default RenderOpenWindow;
