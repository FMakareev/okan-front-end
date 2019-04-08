import React, { Component } from 'react';

/**View*/
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import Container from '@lib/ui/Container/Container';

/**Components*/
import FormPasswordRecovery from '../../component/FormPasswordRecovery/FormPasswordRecovery';

/**PropTypes*/
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

export class PasswordRecovery extends Component {
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
          <FormPasswordRecovery />
        </Container>
      </ErrorCatch>
    );
  }
}

export default PasswordRecovery;
