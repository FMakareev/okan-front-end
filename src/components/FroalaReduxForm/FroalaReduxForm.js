// FroalaReduxForm
import React, { Component } from 'react';
import { DefineIcons } from './DefineIcons';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/languages/ru.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import '../../assets/style/froala-theme.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

// Require block types
import { BLOCK_TABLE, BLOCK_IMAGE, BLOCK_TEXT, BLOCK_NAME } from '../../shared/blockType';
import {
  FROALA_BTN_TITLE_BIND,
  FROALA_BTN_TITLE_COPY,
  FROALA_BTN_TITLE_UNBIND,
} from '@lib/ui/RichTextEditor/RichTextEditor';
import {LazyLoadModule} from "@lib/ui/FroalaReduxForm/LazyLoadModule";


export class FroalaReduxForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  get initialState() {
    try {
      const {input} = this.props;
      return {
        model: input && input.value
      };
    } catch (error) {
      console.error(error);
      return { model: null };
    }
  }

  componentWillMount() {
    const contentType = this.props.contenttype;
    let toolbarButtons = [];
    switch (contentType) {
      case BLOCK_IMAGE:
        toolbarButtons = [
          FROALA_BTN_TITLE_COPY,
          FROALA_BTN_TITLE_BIND,
          FROALA_BTN_TITLE_UNBIND,
          '|',
          'insertImage',
          'bold',
          'italic',
          'underline',
          'fontSize',
          'color',
          'lineHeight',
          'clearFormatting',
          'align',
          'formatOL',
          'formatUL',
          'outdent',
          'indent',
          'insertLink',
          'specialCharacters',
          'help',
        ];
        break;
      case BLOCK_TABLE:
        toolbarButtons = [
          FROALA_BTN_TITLE_COPY,
          FROALA_BTN_TITLE_BIND,
          FROALA_BTN_TITLE_UNBIND,
          '|',
          'insertTable',
          'bold',
          'italic',
          'underline',
          'fontSize',
          'color',
          'lineHeight',
          'clearFormatting',
          'align',
          'formatOL',
          'formatUL',
          'outdent',
          'indent',
          'insertLink',
          'specialCharacters',
          'help',
        ];
        break;
      case BLOCK_TEXT:
        toolbarButtons = [
          FROALA_BTN_TITLE_COPY,
          FROALA_BTN_TITLE_BIND,
          FROALA_BTN_TITLE_UNBIND,
          '|',
          'bold',
          'italic',
          'underline',
          'fontSize',
          'color',
          'lineHeight',
          'clearFormatting',
          'align',
          'formatOL',
          'formatUL',
          'outdent',
          'indent',
          'insertLink',
          'specialCharacters',
          'help',
        ];
        break;
      case BLOCK_NAME:
        toolbarButtons = [];
        break;
    }
    let EditorConfig = {
      placeholderText: 'Введите текст',
      theme: 'froala',
      charCounterCount: false,
      toolbarButtons: toolbarButtons,
      autofocus: true,
      language: 'ru',
    };
    this.setState({
      ...this.state,
      EditorConfig: EditorConfig,
    });
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
      const { input } = this.props;
      input.onChange(event);
    } catch (error) {
      console.error('Error handleModelChange:', error);
    }
  }

  render() {
    const { input, config } = this.props;

    return (
      <div>
        <DefineIcons
          buttonClick={action => {
            return this.props.handleButtonClick(action);
          }}
        />
        <LazyLoadModule
          onModelChange={this.handleModelChange}
          model={input && input.value}
          tag={'textarea'}
          config={{ ...config, ...this.state.EditorConfig, language: 'ru' }}
          resolve={() => import('react-froala-wysiwyg')} />
      </div>
    );
  }
}
