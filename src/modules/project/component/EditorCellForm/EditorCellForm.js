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
    imageUploadURL: '/upload/uploader',
    imageUploadMethod: 'POST',
    fileUploadURL: '/upload/uploader',
    fileUploadMethod: 'POST',

    events: {
      'froalaEditor.blur': (e, editor) => {
        this.props.onBlurForm(e);
      },
      'froalaEditor.initialized': (e, editor) => {
        // this.initFroala();
        this.setState({
          ...this.state,
          froalaLoaded: true
        })
      },

    },
    quickInsertButtons: [],
    quickInsertTags: []
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
    return {
      froalaLoaded: false,
    };
  }

  render() {
    const { id, data } = this.props;

    return (
      <Form
        onSubmit={() => console.log('submit')}
      >
        {data.content.contenttype === BLOCK_TABLE ?
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
          froalaLoaded={this.state.froalaLoaded}
          instantSave={()=>this.props.instantSave()}
          // onBlurForm={() => this.props.onBlurForm('content')}

        />
        {data.content.contenttype === BLOCK_IMAGE ?
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
