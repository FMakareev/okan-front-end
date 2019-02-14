import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form';
/** View */
import RichTextEditor from '../../../../components/RichTextEditor/RichTextEditor';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

export class EditorCellForm extends Component {
  state = {};

  froalaConfig = {
    // imageUploadURL: 'https://okan.code-artel.com/upload/uploader',
    // imageUploadMethod: 'POST',
    events: {
      'froalaEditor.blur': (e, editor) => {
        // console.log('froalaEditor.blur: ', e, editor);

        this.props.onBlurForm();
      },
      'froalaEditor.focus': (e, editor) => {
        // console.log('froalaEditor.focus: ', e, editor);
      },
      // 'froalaEditor.image.beforeUpload': function(e, editor) {
      //   console.log('froalaEditor.file.beforeUpload', editor.selection.get());
      // },
      // 'froalaEditor.image.uploaded' : function(e, editor, response) {
      //   // console.log(editor.selection.get());
      //   // console.log(response)
      // },
      // 'froalaEditor.image.error' : function(e, editor, error, response) {
      //   // console.log(editor.selection.get());
      //   console.log(error)
      // }
    },
  };

  static propTypes = {
    /** func submit for Form */
    handleSubmit: PropTypes.func,
    ...formPropTypes,
  };

  static defaultProps = {
    handleSubmit: () => {},
  };

  constructor(props) {
    super(props);
    console.log();
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    const { id, data } = this.props;

    return (
      <Form>
        <Field
          name={'content'}
          component={RichTextEditor}
          id={id}
          data={data}
          config={this.froalaConfig}
          instantSave={()=>this.props.instantSave()}
        />
      </Form>
    );
  }
}

export default reduxForm({
  form: 'EditorCellForm',
})(EditorCellForm);
