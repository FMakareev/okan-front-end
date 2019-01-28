import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/** Redux user */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Container from '../../../../components/Container/Container';

/** Components */
import ProjectSettings from '../../component/ProjectSettings/ProjectSettings';

export class ProjectSettingsPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      user: { id },
    } = this.props;

    return (
      <ErrorCatch>
        <Flex mt={9} justifyContent={'center'}>
          <Container maxWidth={'500px'} width={'100%'}>
            <ProjectSettings initialValues={{ id: '5c4f2eae9adb49779eb0bb1e' }} />
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
