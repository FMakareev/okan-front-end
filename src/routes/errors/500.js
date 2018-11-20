import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InternalServerError extends Component {
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
      staticContext.status = 500;
    }
    return (
      <div>
        <h1>
          Error<br /> 500
        </h1>
        <h2>Internal Server Error</h2>
        <p>
          The server encountered an internal error or misconfiguration and was unable to complete
          your request.
        </p>
      </div>
    );
  }
}
export default InternalServerError;
