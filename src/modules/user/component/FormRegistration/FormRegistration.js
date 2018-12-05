import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';
import styled from 'styled-components';

/** View */
import Box from '../../../../components/Box/Box';
import TextFieldWithMessage from '../../../../components/TextFieldWithMessage/TextFieldWithMessage';
import TooltipBase from '../../../../components/TooltipBase/TooltipBase';

/** Validation */
import required from '../../../../utils/validation/required';

/** Components */
import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';
import FormButton from '../FormButton/FormButton';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

const validate = values => {
  const errors = {};

  const logins = values.log;
  const passwords = values.password;
  const retypePasswords = values.retryPas;

  if (!logins) {
    errors.logins = 'Required';
  }

  if (!passwords) {
    errors.passwords = 'Required';
  }

  if (!retypePasswords) {
    errors.retypePasswords = 'Required';
  }

  // if (password !== undefined && password.length <= 8) {
  //   errors.password = 'Пароль должен состоять минимум из 8 цифр';
  // }

  // if (password !== undefined && password.length > 64) {
  //   errors.password = 'Пароль должен состоять не больше 32 цифр';
  // }

  // if (password !== retypePassword) {
  //   errors.retypePassword = 'Пароли не совпадают';
  // }

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
  // submit(value) {
  //   const { history, successRedirect } = this.props;
  //   const data = { variables: Object.assign({}, value) };
  //   // data.variables.role = data.variables.role.map(item => item.name);
  //   return this.props['@apollo/create'](data)
  //     .then(response => {
  //       console.log(response);
  //       if (response.errors) {
  //         throw response;
  //       } else {
  //         if (typeof successRedirect === 'string') {
  //           history.push(successRedirect);
  //         } else if (typeof successRedirect === 'function') {
  //           successRedirect();
  //         }
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       throw new SubmissionError({ _error: 'Ошибка!' });
  //     });
  // }

  submit = value => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve(true) : reject('Ошибка регистрации');
      }, 1000);
    }).then(() => {
      throw new SubmissionError({
        email: 'тут ошибка которая появится в инпуте с именем email',
        _error: 'Connection error!',
      });
    });
    return promise;
  };

  render() {
    const { handleSubmit, pristine, submitting, invalid, error } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <FormLogo />

        <Box mb={'100px'}>
          <BoxFirst>
            <Field
              name="log"
              component={TextFieldWithMessage}
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
            TextFieldInput={TextFieldWithMessage}
            component={FieldInputPassword}
          />

          <BoxSecond>
            <Field
              name={'retryPas'}
              placeholder={'Потвердите пароль'}
              TextFieldInput={TextFieldWithMessage}
              component={FieldInputPassword}
            />
          </BoxSecond>

          {error && <TooltipBase position="bottom">Невеврный логин или пароль</TooltipBase>}
        </Box>

        <FormButton disabled={pristine || submitting || invalid} children={'Войти'} ml={9} />
      </Form>
    );
  }
}

FormRegistration = reduxForm({
  form: 'FormRegistration',
  validate,
})(FormRegistration);

export default FormRegistration;
