import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Container from '../../../../components/Container/Container';

/**View */
import FormLogin from '../../component/FormLogin/FormLogin';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

export class Login extends Component {
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
          <FormLogin />
        </Container>
      </ErrorCatch>
    );
  }
}

export default Login;
