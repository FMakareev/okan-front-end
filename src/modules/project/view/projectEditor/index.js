import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';

/** Components */
import { Box } from '@lib/ui/Box/Box';
import { ProjectEditorSideBar } from '../../component/ProjectEditorSideBar/ProjectEditorSideBar';

export class ProjectEditorPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ErrorCatch>
        <Box width={'320px'}>
          <ProjectEditorSideBar />
        </Box>
      </ErrorCatch>
    );
  }
}

export default ProjectEditorPage;
