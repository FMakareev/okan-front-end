import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** View */
import Box from '../../../../components/Box/Box';
import TextFieldWithTooltip from '../../../../components/TextFieldWithTooltip/TextFieldWithTooltip';
import TooltipBase from '../../../../components/TooltipBase/TooltipBase';

/** Components */
import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';
import FormButton from '../FormButton/FormButton';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** GraphQL schema */
import CreateUserMutation from './CreateUserMutation.graphql';

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
    const data = { variables: Object.assign({}, value) };
    console.log(1, this.props);

    return this.props['@apollo/create'](data)
      .then(response => {
        console.log(response);
        if (response.errors) {
          throw response;
        } else {
          this.props.history.push(`/app/project-list`);
          return Promise.resolve(response);
        }
      })
      .catch(error => {
        console.log(error);
        throw new SubmissionError({ _error: 'Ошибка!' });
      });
  }

  // submit = value => {
  //   const promise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       Math.random() > 0.5 ? resolve(true) : reject('Ошибка регистрации');
  //     }, 1000);
  //   }).then(() => {
  //     throw new SubmissionError({
  //       email: 'тут ошибка которая появится в инпуте с именем email',
  //       _error: 'Connection error!',
  //     });
  //   });
  //   return promise;
  // };

  render() {
    const { handleSubmit, pristine, submitting, invalid, error } = this.props;

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
          <FormButton disabled={pristine || submitting || invalid} children={'Войти'} ml={9} />
        </TooltipBase>
      </Form>
    );
  }
}

FormRegistration = withRouter(FormRegistration);

FormRegistration = graphql(CreateUserMutation, {
  name: '@apollo/create',
})(FormRegistration);

FormRegistration = connect(state => ({
  values: getFormValues('FormRegistration')(state),
}))(FormRegistration);

FormRegistration = reduxForm({
  form: 'FormRegistration',
  validate,
})(FormRegistration);

export default FormRegistration;
