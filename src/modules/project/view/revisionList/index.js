import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/**Components */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Container from '../../../../components/Container/Container';

/** View */
import RevisionList from '../component/RevisionList/RevisionList';

class RevisionListPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ErrorCatch>
        <Flex mt={9} justifyContent={'center'}>
          <Container maxWidth={'800px'} width={'100%'}>
            <RevisionList />
          </Container>
        </Flex>
      </ErrorCatch>
    );
  }
}

export default RevisionListPage;
