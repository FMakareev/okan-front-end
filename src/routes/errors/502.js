import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BadGateway extends Component {
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
      staticContext.status = 502;
    }
    return (
      <div>
        <h1>
          Error<br /> 502
        </h1>
        <h2>Bad Gateway</h2>
        <p>
          The web server is returning an unexpected networking error.<br />
          The server is temporarily error and could not coplete your request
        </p>
      </div>
    );
  }
}

export default BadGateway;
