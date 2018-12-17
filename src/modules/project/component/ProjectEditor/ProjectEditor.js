import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/** Components */

// import ProjectEditorSideBar from './ProjectEditorSideBar';

/**View */
import Box from '../../../../components/Box/Box';

/**PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

export class ProjectEditor extends Component {
  static propTypes = { ...formPropTypes };

  constructor(props) {
    super(props);
    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {}

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return <Form onSubmit={handleSubmit(this.submit)}>1</Form>;
  }
}

ProjectEditor = reduxForm({
  form: 'ProjectEditor',
})(ProjectEditor);

export default ProjectEditor;
