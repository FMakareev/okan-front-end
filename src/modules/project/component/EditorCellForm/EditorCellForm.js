import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form';
/** View */
import RichTextEditor from '../../../../components/RichTextEditor/RichTextEditor';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** Content Types */
import { BLOCK_TABLE, BLOCK_IMAGE, BLOCK_TEXT, BLOCK_NAME } from '../../../../shared/blockType';

export class EditorCellForm extends Component {
  state = {};

  froalaConfig = {
    // imageUploadURL: 'https://okan.code-artel.com/upload/uploader',
    // imageUploadMethod: 'POST',
    events: {
      'froalaEditor.blur': (e, editor) => {
        this.props.onBlurForm(e);
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
        {data.content.contenttype == BLOCK_TABLE ? 
          (
            <Field
              name={'name'}
              component={RichTextEditor}
              id={id}
              data={data}
              contenttype={BLOCK_NAME}
              config={this.froalaConfig}
            />
          ) : null
        }
        <Field
          name={'content'}
          component={RichTextEditor}
          id={id}
          data={data}
          contenttype={data.content.contenttype}
          config={this.froalaConfig}
          instantSave={()=>this.props.instantSave()}
          // onBlurForm={() => this.props.onBlurForm('content')}
          
        />
        {data.content.contenttype == BLOCK_IMAGE ? 
          (
            <Field
              name={'name'}
              component={RichTextEditor}
              id={id}
              data={data}
              contenttype={BLOCK_NAME}
              config={this.froalaConfig}
            />
          ) : null
        }
      </Form>
    );
  }
}

export default reduxForm({
  form: 'EditorCellForm',
})(EditorCellForm);
