import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class PageNotFound extends Component {
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
      staticContext.status = 404;
    }
    return (
      <div>
        <h1>
          Error<br /> 404
        </h1>
        <h2>Page is Not Found</h2>
        <p>
          the reasons for the emergence of the problem:<br />
          1. the page has been moved or renamed<br />
          2. the page no longer exists <br />
          3. URL does not correspond to reality
        </p>
        <div>
          <Link to="/">Home</Link>
        </div>
      </div>
    );
  }
}
export default PageNotFound;
