import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, Form, SubmissionError } from 'redux-form';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import TooltipBase from '../../../../components/TooltipBase/TooltipBase';

/** validation */
import required from '../../../../utils/validation/required';

/** Components */
import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';
import FormButton from '../FormButton/FormButton';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

const validate = values => {
  const errors = {};

  const oldPassword = values.oldPassword;
  const newPassword = values.newPassword;
  const retypePassword = values.retypePassword;

  if (newPassword !== undefined && newPassword.length <= 8) {
    errors.newPassword = { label: 'Ошибка!', text: 'Пароль должен состоять минимум из 8 цифр' };
  }

  if (newPassword !== undefined && newPassword.length > 64) {
    errors.newPassword = { label: 'Ошибка!', text: 'Пароль должен состоять не больше 64 цифр' };
  }

  if (newPassword !== retypePassword) {
    errors.retypePassword = { label: 'Ошибка!', text: 'Пароли не совпадают' };
  }

  if (oldPassword === newPassword || oldPassword === retypePassword) {
    errors.retypePassword = {
      label: 'Ошибка!',
      text: 'Старый паполь и новый пароль, не должны совпадать',
    };
  }
  return errors;
};

const BoxFirst = styled(Box)`
  input:first-child {
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }
`;

const BoxSecond = styled(Box)`
  input:first-child {
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    border-bottom-left-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
  }
`;

class FormPasswordRecovery extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {
    return this.props
      .then(response => {
        if (response.errors) {
          throw response;
        } else {
          this.props.reset();
          return Promise.resolve(response);
        }
      })
      .catch(({ errors, message }) => {
        throw new SubmissionError({ _error: message || errors[0].message });
      });
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid, error } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <FormLogo />

        <Box mb={'100px'}>
          <BoxFirst>
            <FieldInputPassword
              name={'oldPassword'}
              placeholder={'Старый пароль'}
              validate={required}
            />
          </BoxFirst>

          <FieldInputPassword
            name={'newPassword'}
            placeholder={'Новый пароль'}
            validate={required}
          />

          <BoxSecond>
            <FieldInputPassword
              name={'retypePassword'}
              placeholder={'Потвердите новый пароль'}
              validate={required}
            />
          </BoxSecond>

          {error && <TooltipBase position="bottom">Невеврный логин или пароль</TooltipBase>}
        </Box>

        <FormButton
          disabled={pristine || submitting || invalid}
          children={'Сменить пароль'}
          ml={9}
        />
      </Form>
    );
  }
}

FormPasswordRecovery = reduxForm({
  form: 'FormPasswordRecovery',
  validate,
})(FormPasswordRecovery);

export default FormPasswordRecovery;
