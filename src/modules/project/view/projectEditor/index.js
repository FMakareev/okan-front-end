import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';

/** Components */
import ProjectEditor from '../../component/ProjectEditor/ProjectEditor';

export class ProjectEditorPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ErrorCatch>
        <ProjectEditor />
      </ErrorCatch>
    );
  }
}

export default ProjectEditorPage;
