import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';

/** Components */
import DocumentSettings from '../../component/DocumentSettings/';

class DocumentSettingsPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ErrorCatch>
        <DocumentSettings />
      </ErrorCatch>
    );
  }
}

export default DocumentSettingsPage;
