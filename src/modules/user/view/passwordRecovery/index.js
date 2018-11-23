import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormPasswordRecovery from '../../component/FormPasswordRecovery/FormPasswordRecovery';
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Container from '../../../../components/Container/Container';

class PasswordRecovery extends Component {
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
          <FormPasswordRecovery />
        </Container>
      </ErrorCatch>
    );
  }
}

export default PasswordRecovery;
