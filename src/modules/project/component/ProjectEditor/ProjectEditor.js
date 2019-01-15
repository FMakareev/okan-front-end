import React, { Component } from 'react';

/** Components */

import ProjectEditorSideBar from './ProjectEditorSideBar';

/**View */
import Box from '../../../../components/Box/Box';

/**PropTypes */
import {Flex} from "@lib/ui/Flex/Flex";
import { DragDropContext } from 'react-dnd'

import HTML5Backend from 'react-dnd-html5-backend'



export class ProjectEditor extends Component {
  static propTypes = {  };



  constructor(props) {
    super(props);
    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {}

  render() {

    return (
      <Flex flexDirection={'column'}>
        <Box width={'320px'}>
          <ProjectEditorSideBar />
        </Box>
      </Flex>
    );
  }
}

export default DragDropContext(HTML5Backend)(ProjectEditor);
