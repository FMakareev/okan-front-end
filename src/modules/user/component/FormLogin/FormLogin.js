import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import TextFieldWithMessage from '../../../../components/TextFieldWithMessage/TextFieldWithMessage';
import TooltipBase from '../../../../components/TooltipBase/TooltipBase';

/**Components */
import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';
import FormButton from '../FormButton/FormButton';

/** Validation */
import required from '../../../../utils/validation/required';

/** json method */
import { jsonToUrlEncoded } from '../../../../utils/jsontools/jsonToUrlEncoded';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';
import TextFieldWithTooltip from '../../../../components/TextFieldWithTooltip/TextFieldWithTooltip';

const validate = values => {
  const errors = {};

  const uname = values.uname;
  const ups = values.ups;

  if (uname === undefined) {
    errors.uname = 'Обязательно для заполнения';
  }

  if (login === undefined || password === undefined) {
    errors.ups = 'Обязательно для заполнения';
  }

  if (uname !== undefined && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(uname)) {
    errors.login = 'Не верный почтовый адрес';
  }

  if (password !== undefined && password.length <= 8) {
    errors.ups = 'Пароль должен состоять минимум из 8 цифр ';
  }

  if (password !== undefined && password.length > 30) {
    errors.ups = 'Пароль должен состоять не больше 30 цифр ';
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

export class FormLogin extends Component {
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
    const { handleSubmit, pristine, submitting, invalid, error } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <FormLogo />

        <Box mb={'100px'}>
          <BoxFirst>
            <Field
              name="uname"
              component={TextFieldWithTooltip}
              placeholder={'Логин'}
              type="text"
              fontSize={9}
              lineHeight={11}
              left={'45%'}
              validate={required}
            />
          </BoxFirst>

          <BoxSecond>
            <Field
              name={'ups'}
              placeholder={'Пароль'}
              TextFieldInput={TextFieldWithMessage}
              component={TextFieldWithTooltip}
            />
          </BoxSecond>

          {error && <TooltipBase position="bottom">Неверный логин или пароль</TooltipBase>}
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
