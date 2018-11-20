import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WebServerDown extends Component {
  static propTypes = {
    staticContext: PropTypes.shape({
      status: PropTypes.string,
      name: PropTypes.string,
    }),
  };

  static defaultProps = {
    staticContext: null,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    const { staticContext } = this.props;
    if (staticContext) {
      staticContext.status = 521;
    }
    return (
      <div>
        <h1>
          Error<br /> 521
        </h1>
        <h2>Web Server Is Down</h2>
        <p>Web Server Is Down</p>
      </div>
    );
  }
}

export default WebServerDown;
