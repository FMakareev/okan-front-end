import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Container from '../../../../components/Container/Container';

/** Components */
import ProjectCreate from '../../component/ProjectCreate/ProjectCreate';

class ProjectCreatePage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  constructor(props) {
    super(props);
    this.state = {};
  }
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
