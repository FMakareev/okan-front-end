// FroalaReduxForm
import React from 'react';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

export class FroalaReduxForm extends React.Component {
  options = {
    placeholder: 'Edit Me',
    fileUploadURL: '/upload/uploader',
    fileUploadParams: { id: 'my_editor' },
    fileUploadMethod: 'POST',

    events: {
      'froalaEditor.focus': function(e, editor) {
        console.log('froalaEditor.focus: ', editor.selection.get());
      },
      'froalaEditor.file.beforeUpload': function(e, editor) {
        console.log('froalaEditor.file.beforeUpload', editor.selection.get());
      },
      'froalaEditor.file.uploaded': function(e, editor) {
        console.log('froalaEditor.file.beforeUpload', editor.selection.get());
      },
      'froalaEditor.file.uploaded': function(e, editor) {
        console.log('froalaEditor.file.beforeUpload', editor.selection.get());
      },
    },
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  get initialState() {
    try {
      return {
        model: this.props.input.value,
      };
    } catch (error) {
      console.error(error);
      return {
        model: null,
      };
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.meta.active !== this.props.meta.active ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.input.value !== this.props.input.value ||
      nextProps.label !== this.props.label
    ) {
      return true;
    }
    return false;
  }

  handleModelChange(event) {
    try {
      console.log('Froala ReduxForm handleModelChange', event);
      const { input } = this.props;
      input.onChange(event);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { input } = this.props;

    return (
      <FroalaEditor
        config={this.options}
        onModelChange={this.handleModelChange}
        model={input.value}
        tag={'textarea'}
      />
    );
  }
}
