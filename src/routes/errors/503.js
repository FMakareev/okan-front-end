import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ServiceUnavailable extends Component {
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
      staticContext.status = 503;
    }
    return (
      <div>
        <h1>
          Error<br /> 503
        </h1>
        <h2>Sevrice Unavailable</h2>
        <p>
          The server is temporarily unable to service your request due to maintenance or capacity
          problems. please try again later.
        </p>
      </div>
    );
  }
}

export default ServiceUnavailable;
