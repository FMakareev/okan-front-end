import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

/** View */
import Box from '../../../../components/Box/Box';
import TooltipBase from '../../../../components/TooltipBase/TooltipBase';
import TextFieldWithTooltip from '../../../../components/TextFieldWithTooltip/TextFieldWithTooltip';

/** validation */
import required from '../../../../utils/validation/required';

/** Components */
import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';
import FormButton from '../FormButton/FormButton';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** GraphQl schema */
import UserPasswordRecoveryMutation from './UserPasswordRecoveryMutation.graphql';

const validate = values => {
  const errors = {};

  const oldPassword = values.oldPassword;
  const newPassword = values.newPassword;
  const retypePassword = values.retypePassword;

  if (!oldPassword) {
    errors.oldPassword = 'Required';
  }

  if (!newPassword) {
    errors.newPassword = 'Required';
  }

  if (!retypePassword) {
    errors.retypePassword = 'Required';
  }

  if (newPassword !== undefined && newPassword.length <= 8) {
    errors.newPassword = 'Пароль должен состоять минимум из 8 цифр';
  }

  if (newPassword !== undefined && newPassword.length > 64) {
    errors.newPassword = 'Пароль должен состоять не больше 32 цифр';
  }

  if (newPassword !== retypePassword) {
    errors.retypePassword = 'Пароли не совпадают';
  }

  if (oldPassword === newPassword || oldPassword === retypePassword) {
    errors.retypePassword = 'Старый паполь и новый пароль, не должны совпадать';
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

  // {/* В случае успешной или не успешной смены пароля выводится notification*/}

  submit(value) {
    const data = { variables: Object.assign({}, value) };

    return this.props['@apollo/update'](data)
      .then(response => {
        if (response.errors) {
          throw response;
        } else {
          this.props.reset();
          this.props.history.push(`/app/profile`);
          return Promise.resolve(response);
        }
      })
      .catch(({ errors, message }) => {
        throw new SubmissionError({ _error: message || errors[0].message });
      });
  }

  // submit = value => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       Math.random() > 0.5 ? resolve(true) : reject('Ошибка регистрации');
  //     }, 1000);
  //   }).then(() => {
  //     console.log('here');
  //     throw new SubmissionError({
  //       email: 'тут ошибка которая появится в инпуте с именем email',
  //       _error: 'Connection error!',
  //     });
  //   });
  // };

  render() {
    const { handleSubmit, pristine, submitting, invalid, error } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <FormLogo />

        <Box mb={'100px'}>
          <BoxFirst>
            <Field
              name={'password'}
              placeholder={'Старый пароль'}
              TextFieldInput={TextFieldWithTooltip}
              component={FieldInputPassword}
            />
          </BoxFirst>

          <Field
            name={'newPassword'}
            placeholder={'Новый пароль'}
            TextFieldInput={TextFieldWithTooltip}
            component={FieldInputPassword}
          />

          <BoxSecond>
            <Field
              name={'confirmNewPassword'}
              placeholder={'Потвердите новый пароль'}
              TextFieldInput={TextFieldWithTooltip}
              component={FieldInputPassword}
            />
          </BoxSecond>
        </Box>

        <TooltipBase isActive={error} warning={error}>
          <FormButton
            disabled={pristine || submitting || invalid}
            children={'Сменить пароль'}
            ml={9}
          />
        </TooltipBase>
      </Form>
    );
  }
}

FormPasswordRecovery = graphql(UserPasswordRecoveryMutation, {
  name: '@apollo/update',
})(FormPasswordRecovery);

// FormPasswordRecovery = connect(state => ({
//   values: getFormValues('FormPasswordRecovery')(state),
// }))(FormPasswordRecovery);

FormPasswordRecovery = withRouter(FormPasswordRecovery);

FormPasswordRecovery = reduxForm({
  form: 'FormPasswordRecovery',
  validate,
})(FormPasswordRecovery);

export default FormPasswordRecovery;
