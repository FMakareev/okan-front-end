import React, { Component } from 'react';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/languages/ru.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import '../../assets/style/froalaname-theme.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import { asyncComponent } from 'react-async-component';
import { Box } from '@lib/ui/Box/Box';

const FroalaEditorName = asyncComponent({
  resolve: () => import('react-froala-wysiwyg'),
  LoadingComponent: () => (
    <Box border={'1px solid #848484'} px={'12px'} py={'10px'}>
      Загрузка
    </Box>
  ),
  serverMode: 'defer',
});

export class FroalaReduxFormName extends Component {
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
    let EditorConfig = {
      placeholderText: 'Введите название блока',
      theme: 'froalaname',
      charCounterCount: false,
      toolbarButtons: [],
      autofocus: false,
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
      console.error('handleModelChange: ', error);
    }
  }

  render() {
    const { input, config } = this.props;

    return (
      <div>
        <FroalaEditorName
          onModelChange={this.handleModelChange}
          model={input.value}
          tag={'textarea'}
          config={{ ...config, ...this.state.EditorConfig, language: 'ru' }}
        />
      </div>
    );
  }
}
