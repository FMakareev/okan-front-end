import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import Flex from '@lib/ui/Flex/Flex';
import Container from '@lib/ui/Container/Container';
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';

/** Components */
import ProjectCreate from '../../component/ProjectCreate/ProjectCreate';

export class ProjectCreatePage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};

  render() {
    return (
      <ErrorCatch>
        <Flex mt={9} justifyContent={'center'}>
          <Container maxWidth={'500px'} width={'100%'}>
            <ProjectCreate />
          </Container>
        </Flex>
      </ErrorCatch>
    );
  }
}

export default ProjectCreatePage;
