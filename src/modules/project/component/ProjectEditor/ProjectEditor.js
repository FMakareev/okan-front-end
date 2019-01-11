import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/** Components */

import ProjectEditorSideBar from './ProjectEditorSideBar';

/**View */
import Box from '../../../../components/Box/Box';

/**PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';
import {Flex} from "@lib/ui/Flex/Flex";
import { DragDropContext } from 'react-dnd'

import HTML5Backend from 'react-dnd-html5-backend'

// ProjectEditorSideBarDragDropContext = DragDropContext(HTML5Backend)(ProjectEditorSideBar);

let defaultManager;
function getDefaultManager() {
  if (!defaultManager) {
    defaultManager = new DragDropManager(HTML5Backend);
  }
  return defaultManager;
}

export class ProjectEditor extends Component {
  static propTypes = { ...formPropTypes };



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
