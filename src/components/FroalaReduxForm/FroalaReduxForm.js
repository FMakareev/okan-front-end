// FroalaReduxForm
import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { DefineIcons } from './DefineIcons';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import '../../assets/style/froala-theme.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

// Require block types
import { BLOCK_TABLE, BLOCK_IMAGE, BLOCK_TEXT} from '../../shared/blockType';

// That's where the magic happens
const FroalaEditor = dynamic(import('react-froala-wysiwyg'), {
  ssr: false,
});

export class FroalaReduxForm extends Component {

  toolbarButtons = []

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  get initialState() {
    try {
      return { model: this.props.input.value };
    } catch (error) {
      console.error(error);
      return { model: null };
    }
  }

  componentWillMount() {
    const contentType = this.props.data.content.contenttype;
    let toolbarButtons = [];
    switch (contentType) {
      case BLOCK_IMAGE :
        this.toolbarButtons = ['copy', 'bind', 'unbind', '|', 'insertImage', 'bold', 'italic', 'underline', 'fontSize', 'color', 'clearFormatting', 'specialCharacters', 'paragraphFormat', 'paragraphStyle', 'quote', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'specialCharacters', 'emoticons', 'print', 'help'];
        break;
      case BLOCK_TABLE :
        this.toolbarButtons = ['copy', 'bind', 'unbind', '|', 'insertTable', 'bold', 'italic', 'underline', 'fontSize', 'color', 'clearFormatting', 'specialCharacters', 'paragraphFormat', 'paragraphStyle', 'quote', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'specialCharacters', 'emoticons', 'print', 'help'];
        break;
      case BLOCK_TEXT :
        this.toolbarButtons = ['copy', 'bind', 'unbind', '|', 'bold', 'italic', 'underline', 'fontSize', 'color', 'clearFormatting', 'specialCharacters', 'paragraphFormat', 'paragraphStyle', 'quote', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'specialCharacters', 'emoticons', 'print', 'help'];
        break;
    };
    this.setState({
      ...this.state,
      toolbarButtons: toolbarButtons
    });
  }

  EditorConfig = {
    placeholderText: 'Введите текст',
    theme: 'froala',
    charCounterCount: false,
    // toolbarButtons: this.toolbarButtons,
    toolbarButtons: ['copy', 'bind', 'unbind', '|', 'bold', 'italic', 'underline', 'fontSize', 'color', 'clearFormatting', 'specialCharacters', 'paragraphFormat', 'paragraphStyle', 'quote', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'specialCharacters', 'emoticons', 'print', 'help'],
    // events : {
    //   'froalaEditor.contentChanged' : function(e, editor) {

    //     //** Getting html content of Froala here */
    //     this.props.content = editor.html.get();
    //   }
    // }
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
      <div>
        <DefineIcons buttonClick={(action) => {this.props.handleButtonClick(action)}}/>
        <FroalaEditor 
          onModelChange={this.handleModelChange} 
          model={input.value} 
          tag={'textarea'} 
          config={this.EditorConfig}
        />
      </div>
    );
  }
}
