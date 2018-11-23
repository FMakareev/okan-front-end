import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormRegistatration from '../../component/FormRegistatration/FormRegistatration';
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Container from '../../../../components/Container/Container';

class Login extends Component {
  static propTypes = {};

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
