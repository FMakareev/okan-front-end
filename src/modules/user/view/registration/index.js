import React, { Component } from 'react';
import { connect } from 'react-redux';

/**View*/
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import Container from '@lib/ui/Container/Container';

/**Components*/
import FormRegistration from '../../component/FormRegistration/FormRegistration';

/**PropTypes*/
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** Redux user */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

export class Registration extends Component {
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
    const {
      match: {
        params: { key },
      },
    } = this.props;

    return (
      <ErrorCatch>
        <Container maxWidth={'500px'}>
          <FormRegistration initialValues={{ key }} />
        </Container>
      </ErrorCatch>
    );
  }
}

Registration = connect(state => ({
  user: getUserFromStore(state),
}))(Registration);

export default Registration;
