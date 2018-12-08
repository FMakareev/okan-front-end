import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Container from '../../../../components/Container/Container';

/** Components */
import DocumentSettings from '../../component/DocumentSettings/DocumentSettings';
import TitlePage from '../../component/DocumentSettings/TitlePage';

class DocumentSettingsPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ErrorCatch>
        <Flex mt={9} justifyContent={'space-around'}>
          <Container maxWidth={'500px'} width={'100%'}>
            <DocumentSettings />
          </Container>

          <Container maxWidth={'400px'} width={'100%'}>
            <TitlePage />
          </Container>
        </Flex>
      </ErrorCatch>
    );
  }
}

export default DocumentSettingsPage;
