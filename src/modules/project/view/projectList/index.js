import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/**Components */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Container from '../../../../components/Container/Container';

/** View */
import ProjectList from '../component/ProjectList/ProjectList';

class ProjectListPage extends Component {
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
            <ProjectList />
          </Container>
        </Flex>
      </ErrorCatch>
    );
  }
}

export default ProjectListPage;
