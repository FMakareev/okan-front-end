import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Notifications, { success, error } from 'react-notification-system-redux';

/** View */
import Box from '../../../../components/Box/Box';
import TextFieldWithTooltip from '../../../../components/TextFieldWithTooltip/TextFieldWithTooltip';
import TooltipBase from '../../../../components/TooltipBase/TooltipBase';
import FormButtonSubmit from '../../../../components/FormButtonSubmit/FormButtonSubmit';

/** Components */
import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** GraphQL schema */
import CreateUserMutation from './CreateUserMutation.graphql';

/** Validation */
import required from '../../../../utils/validation/required';
import isEmail from '../../../../utils/validation/isEmail';

const validate = values => {
  const errors = {};

  const logins = values.log;
  const passwords = values.password;
  const retypePasswords = values.retryPas;

  if (!logins) {
    errors.log = 'Required';
  }

  if (!passwords) {
    errors.password = 'Required';
  }

  if (!retypePasswords) {
    errors.retryPas = 'Required';
  }

  if (passwords !== undefined && passwords.length <= 8) {
    errors.password = 'Пароль должен состоять минимум из 8 цифр';
  }

  if (passwords !== undefined && passwords.length > 64) {
    errors.password = 'Пароль должен состоять не больше 32 цифр';
  }

  if (passwords !== retypePasswords) {
    errors.retryPas = 'Пароли не совпадают';
  }

  return errors;
};

const BoxFirst = styled(Box)`
  input {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

const BoxSecond = styled(Box)`
  input {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
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

class FormRegistration extends Component {
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

    return this.props['@apollo/create'](data)
      .then(response => {
        console.log(response);
        if (response.errors) {
          throw response;
        } else {
          this.props.history.push(`/app/project-list`);
          this.props.setNotificationSuccess(notificationOpts().success);
          return Promise.resolve(response);
        }
      })
      .catch(error => {
        this.props.setNotificationError(notificationOpts().error);
        this.setState(() => ({
          submitting: false,
          apolloError: 'Ошибка регистрации пользователя',
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
          <BoxFirst>
            <Field
              name="email"
              component={TextFieldWithTooltip}
              placeholder={'Логин'}
              type="text"
              fontSize={9}
              lineHeight={11}
              left={'40%'}
              validate={[required, isEmail]}
            />
          </BoxFirst>

          <Field
            name={'password'}
            placeholder={'Пароль'}
            TextFieldInput={TextFieldWithTooltip}
            component={FieldInputPassword}
          />

          <BoxSecond>
            <Field
              name={'retryPas'}
              placeholder={'Потвердите пароль'}
              TextFieldInput={TextFieldWithTooltip}
              component={FieldInputPassword}
            />
          </BoxSecond>
        </Box>
        <TooltipBase isActive={error} warning={error}>
          <FormButtonSubmit
            disabled={pristine || submitting || invalid}
            children={'Войти'}
            ml={9}
            isLoading={isLoading}
            error={error || apolloError}
          />
        </TooltipBase>
      </Form>
    );
  }
}

FormRegistration = withRouter(FormRegistration);

FormRegistration = graphql(CreateUserMutation, {
  name: '@apollo/create',
})(FormRegistration);

FormRegistration = connect(
  state => ({
    values: getFormValues('FormRegistration')(state),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormRegistration);

FormRegistration = reduxForm({
  form: 'FormRegistration',
  validate,
})(FormRegistration);

export default FormRegistration;
