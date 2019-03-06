import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { success, error } from 'react-notification-system-redux';

/** View */
import Box from '@lib/ui/Box/Box';
import TooltipBase from '@lib/ui/TooltipBase/TooltipBase';
import FormButtonSubmit from '@lib/ui/FormButtonSubmit/FormButtonSubmit';

/** Components */
import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** GraphQl schema */
import UserPasswordRecoveryMutation from './UserPasswordRecoveryMutation.graphql';
import {TextFieldLastWrapper} from "@lib/ui/TextFieldLastWrapper/TextFieldLastWrapper";
import {TextFieldFirstWrapper} from "@lib/ui/TextFieldFirstWrapper/TextFieldFirstWrapper";

const validate = ({ password, newpassword, confirmnewpassword }) => {
  const errors = {};

  if (!password) {
    errors.password = 'Обязательно для заполнения';
  }

  if (!newpassword) {
    errors.newpassword = 'Обязательно для заполнения';
  }

  if (!confirmnewpassword) {
    errors.confirmnewpassword = 'Обязательно для заполнения';
  }

  if (newpassword !== undefined && newpassword.length <= 7) {
    errors.newpassword = 'Пароль должен состоять минимум из 8 символов';
  }

  if (newpassword !== undefined && newpassword.length >= 30) {
    errors.newpassword = 'Пароль должен состоять не больше 30 символов';
  }

  if (password === newpassword) {
    errors.newpassword = 'Старый пароль и новый пароль не должны совпадать';
  }

  if (confirmnewpassword !== newpassword) {
    errors.confirmnewpassword = 'Пароли не совпадают';
  }
  return errors;
};



const notificationOpts = () => ({
  success: {
    title: 'Пароль успешно изменён',
    message: 'Пароль успешно изменён',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Пароль не изменён',
    message: 'Пароль не изменён',
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

    this.state = this.initialState;

    this.submit = this.submit.bind(this);
  }

  get initialState() {
    return { submitting: false, apolloError: null, isLoading: false };
  }

  submit(value) {
    const data = { variables: Object.assign({}, value) };

    this.setState(() => ({ isLoading: true, submitting: true }));

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
        this.props.setNotificationError(notificationOpts().error);
        this.setState(() => ({
          submitting: false,
          apolloError: 'Ошибка смена пароля',
          isLoading: false,
        }));
      });
  }

  render() {
    const { handleSubmit, pristine, invalid, error } = this.props;
    const { isLoading, apolloError, submitting } = this.state;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <FormLogo />

        <Box mb={'100px'}>
          <TextFieldFirstWrapper>
            <Field
              name={'password'}
              placeholder={'Старый пароль'}
              component={FieldInputPassword}
            />
          </TextFieldFirstWrapper>

          <Field
            name={'newpassword'}
            placeholder={'Новый пароль'}
            variant={'secondary'}
            component={FieldInputPassword}
          />

          <TextFieldLastWrapper>
            <Field
              name={'confirmnewpassword'}
              placeholder={'Потвердите новый пароль'}
              component={FieldInputPassword}
            />
          </TextFieldLastWrapper>
        </Box>

        <TooltipBase isActive={error} warning={error}>
          <FormButtonSubmit
            disabled={pristine || submitting || invalid}
            children={'Сменить пароль'}
            ml={9}
            isLoading={isLoading}
            error={error || apolloError}
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
