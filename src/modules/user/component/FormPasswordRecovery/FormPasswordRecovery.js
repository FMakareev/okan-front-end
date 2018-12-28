import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Notifications, { success, error } from 'react-notification-system-redux';

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

  const oldPassword = values.password;
  const newPassword = values.newPassword;
  const retypePassword = values.confirmNewPassword;

  if (!oldPassword) {
    errors.password = 'Required';
  }

  if (!newPassword) {
    errors.newPassword = 'Required';
  }

  if (!retypePassword) {
    errors.confirmNewPassword = 'Required';
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

  if (oldPassword === newPassword) {
    errors.newPassword = 'Старый пароль и новый пароль, не должны совпадать';
  }

  if (retypePassword !== newPassword) {
    errors.confirmNewPassword = 'Старый пароль и новый пароль, должны совпадать';
  }
  return errors;
};

const BoxFirst = styled(Box)`
  input {
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }
`;

const BoxSecond = styled(Box)`
  input {
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    border-bottom-left-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
  }
`;

const notificationOpts = () => ({
  success: {
    title: 'its okqy',
    message: 'its okay',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'problems',
    message: 'problems',
    position: 'tr',
    autoDismiss: 2,
  },
});

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
          this.props.setNotificationSuccess(notificationOpts().success);
          this.props.history.push(`/app/profile`);
          return Promise.resolve(response);
        }
      })
      .catch(({ errors, message }) => {
        throw new SubmissionError({ _error: message || errors[0].message });
        // TODO review: оно тут не сработает и не нужно, ошибки отпарвик данных мы показываем возле кнопки
        this.props.setNotificationError(notificationOpts().error);
      });
  }

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

FormPasswordRecovery = withRouter(FormPasswordRecovery);

FormPasswordRecovery = graphql(UserPasswordRecoveryMutation, {
  name: '@apollo/update',
})(FormPasswordRecovery);

FormPasswordRecovery = connect(
  // state => ({
  //   values: getFormValues('FormPasswordRecovery')(state),
  // }),
  null,
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormPasswordRecovery);

FormPasswordRecovery = reduxForm({
  form: 'FormPasswordRecovery',
  validate,
})(FormPasswordRecovery);

export default FormPasswordRecovery;
