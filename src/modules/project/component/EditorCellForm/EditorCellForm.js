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
    events: {
      'froalaEditor.blur': (e, editor) => {
        // console.log('froalaEditor.blur: ', e, editor);

        this.props.onBlurForm();
      },
      'froalaEditor.focus': (e, editor) => {
        // console.log('froalaEditor.focus: ', e, editor);
      },
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
        />
      </Form>
    );
  }
}

export default reduxForm({
  form: 'EditorCellForm',
})(EditorCellForm);
