import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Container from '../../../../components/Container/Container';

/** components */
import ProjectList from '../../component/ProjectList/ProjectList';

class ProjectListPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(1, this.props);
    return (
      <ErrorCatch>
        <Query query={RevisionListQuery}>
          <Flex mt={9} justifyContent={'center'}>
            <Container maxWidth={'500px'} width={'100%'}>
              <ProjectList />
            </Container>
          </Flex>
        </Query>
      </ErrorCatch>
    );
  }
}

export default ProjectListPage;
