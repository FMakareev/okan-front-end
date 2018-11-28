import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, getFormValues, SubmissionError, setSubmitFailed } from 'redux-form';
import styled from 'styled-components';
import { Absolute } from 'rebass';

import Box from '../../../../components/Box/Box';
import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';

import required from '../../../../utils/validation/required';

import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';
import FormButton from '../FormButton/FormButton';

import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

const BoxFirst = styled(Box)`
  input:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

const BoxSecond = styled(Box)`
  input:first-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

class FormRegistration extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }
  submit(value) {
    //  const { setNotificationError, setNotificationSuccess, translate, history, successRedirect } = this.props;
    //  const data = { variables: Object.assign({ avatar: 'avatar' }, value) };
    //  // data.variables.role = data.variables.role.map(item => item.name);
    //  return this.props['@apollo/create'](data)
    //    .then(response => {
    //      console.log(response);
    //      if (response.errors) {
    //        throw response;
    //      } else {
    //        if (typeof successRedirect === 'string') {
    //          history.push(successRedirect);
    //        } else if (typeof successRedirect === 'function') {
    //          successRedirect();
    //        }
    //        setNotificationSuccess(notificationOption(translate).success);
    //      }
    //    })
    //    .catch(error => {
    //      console.log(error);
    //      setNotificationError(notificationOption(translate).error);
    //      throw new SubmissionError({ _error: error.message || error.statusText });
    //    });
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <FormLogo />

        <Box mb={'100px'}>
          <BoxFirst>
            <Field
              name="uname"
              component={TextFieldBase}
              placeholder={'Логин'}
              type="text"
              fontSize={9}
              lineHeight={11}
            />
          </BoxFirst>

          <FieldInputPassword name={'ups'} placeholder={'Пароль'} validate={required} />

          <BoxSecond>
            <FieldInputPassword
              name={'ups1'}
              placeholder={'Потвердите пароль'}
              validate={required}
            />
          </BoxSecond>
        </Box>

        <FormButton disabled={pristine || submitting || invalid} children={'Войти'} ml={9} />
      </form>
    );
  }
}

FormRegistration = reduxForm({
  form: 'FormRegistration',
})(FormRegistration);

export default FormRegistration;
