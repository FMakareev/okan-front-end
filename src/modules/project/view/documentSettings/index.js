import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/** Redux user */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

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
    // const {
    //   user: { id },
    // } = this.props;

    return (
      <ErrorCatch>
        <DocumentSettings initialValues={{ id: '5c4f30739adb49779eb0bb1f' }} />
      </ErrorCatch>
    );
  }
}

DocumentSettingsPage = connect(state => ({
  user: getUserFromStore(state),
}))(DocumentSettingsPage);

export default DocumentSettingsPage;
