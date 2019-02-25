import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import Flex from '@lib/ui/Flex/Flex';
import Container from '@lib/ui/Container/Container';
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';

/** Components */
import FormProjectCreate from '../../component/FormProjectCreate/FormProjectCreate';

/** Reducers */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

export class ProjectCreatePage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};

  render() {
    const { user } = this.props;
    return (
      <ErrorCatch>
        <Flex mt={9} justifyContent={'center'}>
          <Container maxWidth={'500px'} width={'100%'}>
            <FormProjectCreate
              initialValues={{
                author: user.id,
              }}
            />
          </Container>
        </Flex>
      </ErrorCatch>
    );
  }
}

ProjectCreatePage = connect(state => ({ user: getUserFromStore(state) }))(ProjectCreatePage);

export default ProjectCreatePage;
