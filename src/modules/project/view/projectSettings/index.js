import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/** Redux user */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import Flex from '@lib/ui/Flex/Flex';
import Container from '@lib/ui/Container/Container';

/** Components */
import ProjectSettings from '../../component/ProjectSettings/ProjectSettings';

export class ProjectSettingsPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};

  render() {
    const {
      user: { id },
    } = this.props;

    return (
      <ErrorCatch>
        <Flex mt={9} justifyContent={'center'}>
          <Container maxWidth={'500px'} width={'100%'}>
            <ProjectSettings initialValues={{ id: '5c49c6ae9adb493e7ba5dca1' }} />
          </Container>
        </Flex>
      </ErrorCatch>
    );
  }
}

ProjectSettingsPage = connect(state => ({
  user: getUserFromStore(state),
}))(ProjectSettingsPage);

export default ProjectSettingsPage;
