import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/** Redux user */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';

/** Components */
import DocumentSettings from '../../component/DocumentSettings/';

class DocumentSettingsPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};

  render() {
    const {
      match: {
        params: { id },
      },
      route: { name },
      location: { key },
    } = this.props;

    return (
      <ErrorCatch>
        <DocumentSettings initialValues={{ id, name, key }} />
      </ErrorCatch>
    );
  }
}

DocumentSettingsPage = connect(state => ({
  user: getUserFromStore(state),
}))(DocumentSettingsPage);

export default DocumentSettingsPage;
