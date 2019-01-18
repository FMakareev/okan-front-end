import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Absolute } from 'rebass';

/** Components */
import EditorCellCommentButton from './EditorCellCommentButton';
import EditorCellCommentList from './EditorCellCommentList';
import EditorCellCommentForm from './EditorCellCommentForm';

/** View */
import Box from '../../../../components/Box/Box';

export class EditorCellCommentController extends Component {
  state = {};

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Absolute mb={4} mt={4} px={3}>
        <EditorCellCommentButton />

        <EditorCellCommentList />

        <EditorCellCommentForm />
      </Absolute>
    );
  }
}

export default EditorCellCommentController;
