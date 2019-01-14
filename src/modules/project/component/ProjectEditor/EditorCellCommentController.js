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

  static propTypes = {
    /**function for compoennts */
    handleClickCommentButton: PropTypes.func,
  };

  static defaultProps = { handleClickCommentButton: () => {} };

  handleClickCommentButton = () => {
    alert('hello');
  };

  render() {
    return (
      <Absolute mb={4} mt={4} px={3}>
        <EditorCellCommentButton handleClickCommentButton={this.handleClickCommentButton} />

        <EditorCellCommentList />

        <EditorCellCommentForm />
      </Absolute>
    );
  }
}

export default EditorCellCommentController;
