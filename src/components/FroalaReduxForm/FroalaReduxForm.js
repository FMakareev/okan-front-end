// FroalaReduxForm
import React, { Component } from 'react';
import dynamic from 'next/dynamic';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import '../../assets/style/froala-theme.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import { DefineIcons } from './DefineIcons';

// That's where the magic happens
const FroalaEditor = dynamic(import('react-froala-wysiwyg'), {
  ssr: false,
});

export class FroalaReduxForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleModelChange = this.handleModelChange.bind(this);
    DefineIcons()
  }

  get initialState() {
    try {
      return { model: this.props.input.value };
    } catch (error) {
      console.error(error);
      return { model: null };
    }
  }

  EditorConfig = {
    placeholderText: 'Введите текст',
    theme: 'froala',
    charCounterCount: false,
    toolbarButtons: ['copy', 'bind', 'delete', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', 'color', 'clearFormatting', 'specialCharacters', 'paragraphFormat', 'paragraphStyle', 'quote', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'fullscreen', 'html', 'specialCharacters', 'emoticons', 'insertHR', 'print', 'help']
  };

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
          onModelChange={this.handleModelChange} 
          model={input.value} 
          tag={'textarea'} 
          config={this.EditorConfig}
        />
    );
  }
}
