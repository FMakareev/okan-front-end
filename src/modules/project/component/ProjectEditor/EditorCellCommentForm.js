import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/** View */
import RichTextEditor from '../../../../components/RichTextEditor/RichTextEditor';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

export class EditorCellCommentForm extends React.Component {
  state = {};

  submit = value => {
    return value;
  };

  static propTypes = {
    /** func submit for Form */
    handleSubmit: PropTypes.func,
    ...formPropTypes,
  };

  static defaultProps = { handleSubmit: () => {} };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Field component={RichTextEditor} />
      </Form>
    );
  }
}

EditorCellCommentForm = reduxForm({
  form: 'EditorCellCommentForm',
})(EditorCellCommentForm);

export default EditorCellCommentForm;
