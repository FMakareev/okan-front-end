import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, getFormValues, SubmissionError, setSubmitFailed } from 'redux-form';
import styled from 'styled-components';
import { Absolute } from 'rebass';

import Flex from '../../../../components/Flex/Flex';
import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';

import required from '../../../../utils/validation/required';

import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';
import FormButton from '../FormButton/FormButton';

class FormRegistration extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }
  submit(value) {}

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    // TODO review:MICHA: кнопку заблокировать пока форма не станет валидной
    // TODO review:MICHA: сделать провеку на совпадение паролей
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <FormLogo />

        <Flex alignItems={'center'} flexDirection={'column'} mb={'100px'}>
          <Flex width={'100%'}>
            <Field
              name="uname"
              component={TextFieldBase}
              placeholder={'Логин'}
              type="text"
              fz={9}
            />
          </Flex>

          <FieldInputPassword name={'ups'} placeholder={'Пароль'} validate={required} />

          <FieldInputPassword name={'ups1'} placeholder={'Потвердите пароль'} validate={required} />
        </Flex>

        <FormButton disabled={pristine || submitting || invalid} children={'Войти'} />
      </form>
    );
  }
}

FormRegistration = reduxForm({
  form: 'FormRegistration',
})(FormRegistration);

export default FormRegistration;
