import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/** View */
import RichTextEditor from '../../../../components/RichTextEditor/RichTextEditor';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

export class EditorCellForm extends Component {
  state = {};

  static propTypes = {
    /** func submit for Form */
    handleSubmit: PropTypes.func,
    ...formPropTypes,
  };

  static defaultProps = { handleSubmit: () => {} };

  submit = value => {
    return value;
  };

  componentDidMount = () => {this.props.didMount()}

  render() {
    const { handleSubmit, id, data } = this.props;

    return (
      <Form onChange={handleSubmit(this.submit)} onBlur={()=>this.props.onBlur()}>
        <Field
          name={'content'}
          component={RichTextEditor} 
          id={id}
          data={data}
          
          />
      </Form>
    );
  }
}


export default reduxForm({
  form: 'EditorCellForm',
})(EditorCellForm);
