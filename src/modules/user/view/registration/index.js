import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**Components*/
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Container from '../../../../components/Container/Container';

/**View*/
import FormRegistatration from '../../component/FormRegistatration/FormRegistatration';

/**PropTypes*/
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

class Login extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    return (
      <ErrorCatch>
        <Container maxWidth={'500px'}>
          <FormRegistatration />
        </Container>
      </ErrorCatch>
    );
  }
}

export default Login;
