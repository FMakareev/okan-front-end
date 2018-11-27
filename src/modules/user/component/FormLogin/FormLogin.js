import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';
import TooltipBase from '../../../../components/TooltipBase/TooltipBase';

import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';
import FormButton from '../FormButton/FormButton';

import required from '../../../../utils/validation/required';
import { jsonToUrlEncoded } from '../../../../utils/jsontools/jsonToUrlEncoded';

import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

const validate = values => {
  const errors = {};

  const login = values.uname;
  const password = values.ups;

  if (login === undefined) {
    errors.login = 'Обязательно для заполнения';
  }

  if (login === undefined || password === undefined) {
    errors.password = 'Обязательно для заполнения';
  }

  if (login !== undefined && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(login)) {
    errors.login = 'Не верный почтовый адрес';
  }

  if (password !== undefined && password.length <= 8) {
    errors.password = 'Пароль должен состоять минимум из 8 цифр ';
  }

  if (password !== undefined && password.length > 30) {
    errors.password = 'Пароль должен состоять не больше 30 цифр ';
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

class FormLogin extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {
    return fetch(`${ENDPOINT_CLIENT}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: jsonToUrlEncoded(value),
    })
      .then(response => {
        if (response.status >= 400) {
          throw response;
        } else {
          return this.getUser(value.uname);
        }
      })
      .catch(({ status, statusText }) => {
        throw new SubmissionError({ _error: 'Ошибка!' });

        if (status === 401) {
          throw new SubmissionError({ _error: translate('user_login_error_message_401') });
        } else {
          throw new SubmissionError({ _error: translate('user_login_error_message_500') });
        }
      });
  }

  /**
   * @param {object} props - apollo response
   * @param {object} props.data - данные полученные от сервера
   * @param {object} props.data.usernameitem - объект с даннными пользователя
   * @param {string} props.data.usernameitem.id - id пользователя
   * @param {string} props.data.usernameitem.name - имя пользователя
   * @param {array} props.data.usernameitem.role -
   * @param {string} props.data.usernameitem.username
   * @param {string} props.data.usernameitem.__typename
   * @param {bool} props.loading
   * @param {number} props.networkStatus
   * @param {bool} props.stale
   * @desc запись данных пользователя в локальное хранилище
   * */
  setUser = props => {
    console.log('setUser: ', props);
    // const {
    //   data: { usernameitem },
    // } = props;
    // const { addUser } = this.props;
    // let resolvers = [];

    // usernameitem.group.forEach(item => {
    //   item.roles.forEach(roleItem => {
    //     resolvers = [...resolvers, ...roleItem.resolvers.map(resolverItem => resolverItem.name)];
    //   });
    // });

    // addUser({
    //   ...usernameitem,
    //   resolvers,
    // });
    // localStorage.setItem(
    //   'user',
    //   JSON.stringify({
    //     ...usernameitem,
    //     resolvers,
    //   }),
    // );
  };

  getUser = uname => {
    // const { translate, client, history } = this.props;
    // return client
    //   .query({
    //     query: userItem,
    //     variables: {
    //       username: uname,
    //     },
    //   })
    //   .then(result => {
    //     console.log(result);
    //     if (result.errors) {
    //       throw result;
    //     } else {
    //       this.setState(() => ({
    //         submitting: false,
    //         apolloError: null,
    //       }));
    //       this.setUser(result);
    //       history.push(`/app/users/profile/${uname}`);
    //       return Promise.resolve(result);
    //     }
    //   })
    //   .catch(error => {
    //     console.log('getUser error:', error);
    //     //
    //     if (error.errors[0].message === 'User Model matching query does not exist.') {
    //       this.setState(() => ({
    //         submitting: false,
    //         apolloError: 'user_login_error_message_login_not_found',
    //       }));
    //     } else {
    //       this.setState(() => ({
    //         submitting: false,
    //         apolloError: 'user_login_error_message_500',
    //       }));
    //     }
    //   });
  };

  render() {
    const { handleSubmit, pristine, submitting, fill, invalid, error } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
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
              validate={[required]}
            />
          </BoxFirst>

          <BoxSecond>
            <FieldInputPassword name={'ups'} placeholder={'Пароль'} validate={required} />
          </BoxSecond>

          {error && <TooltipBase position="bottom">Невеврный логин или пароль</TooltipBase>}
        </Box>

        <FormButton disabled={pristine || submitting || invalid} children={'Войти'} ml={9} />
      </Form>
    );
  }
}

FormLogin = reduxForm({
  form: 'FormLogin',
  validate,
})(FormLogin);

export default FormLogin;
