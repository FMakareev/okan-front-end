import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withApollo } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';
import Notifications, { success, error } from 'react-notification-system-redux';

/** View */
import Box from '@lib/ui/Box/Box';
import Flex from '@lib/ui/Flex/Flex';
import TooltipBase from '@lib/ui/TooltipBase/TooltipBase';
import FormButtonSubmit from '@lib/ui/FormButtonSubmit/FormButtonSubmit';
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';

/**Components */
import FormLogo from '../FormLogo/FormLogo';
import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';

/** Validation */
import isEmail from '../../../../utils/validation/isEmail';
import required from '../../../../utils/validation/required';
import minLength from '../../../../utils/validation/minLength';

/** json method */
import { jsonToUrlEncoded } from '../../../../utils/jsontools/jsonToUrlEncoded';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** ac */
import { USER_ADD } from '../../../../store/reducers/user/actionTypes';

/** query */
import UserEmailItemQuery from './UserEmailItemQuery.graphql';

const validate = ({ uname, ups }) => {
  const errors = {};

  if (uname === undefined) {
    errors.uname = 'Обязательно для заполнения';
  }

  if (ups === undefined) {
    errors.ups = 'Обязательно для заполнения';
  }

  if (ups !== undefined && ups.length <= 8) {
    errors.ups = 'Пароль должен состоять минимум из 8 цифр ';
  }

  if (ups !== undefined && ups.length > 30) {
    errors.ups = 'Пароль должен состоять не больше 30 цифр ';
  }
  return errors;
};

const BoxFirst = styled(Box)`
  input {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const BoxSecond = styled(Box)`
  input {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const notificationOpts = () => ({
  success: {
    title: 'Вход выполнен',
    message: 'Вход выполнен',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Вход не выполнен',
    message: 'Вход не выполнен',
    position: 'tr',
    autoDismiss: 2,
  },
});

export class FormLogin extends Component {
  static propTypes = { ...formPropTypes };

  constructor(props) {
    super(props);

    this.state = this.initialState;

    this.submit = this.submit.bind(this);
  }

  get initialState() {
    return { submitting: false, apolloError: null, isLoading: false };
  }

  submit(value) {
    this.setState(({ submitting, isLoading }) => {
      return { submitting: !submitting, isLoading: !isLoading };
    });

    return fetch(`${ENDPOINT_CLIENT}/user/auth`, {
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
        if (response.status >= 400 || !document.cookie) {
          throw response;
        } else {
          return this.getUser(value.email);
        }
      })
      .catch(({ status, statusText }) => {
        this.setState(() => ({ submitting: false, apolloError: null }));

        if (status === 401 || status === 403) {
          throw new SubmissionError({ _error: 'Не верно введен логин или пароль' });
        } else {
          throw new SubmissionError({ _error: 'Пользователь не найден' });
        }
      });
  }

  getUser = email => {
    const { client, history, setNotificationSuccess, setNotificationError } = this.props;
    return client
      .query({ query: UserEmailItemQuery, variables: { email: email } })
      .then(result => {
        console.log('result', result);
        if (result.errors || result.data.currentuseritem === null) {
          // TO DO change this
          throw result;
        } else {
          this.setState(() => ({ apolloError: null, isLoading: false }));
          this.setUser(result);
          setNotificationSuccess(notificationOpts().success);

          history.push(`app/profile`);
          return Promise.resolve(result);
        }
      })
      .catch(({ graphQLErrors, message, error, networkError, ...rest }) => {
        console.log('graphQLErrors: ', graphQLErrors);
        console.log('message: ', message);
        console.log('networkError: ', networkError);
        console.log('rest: ', rest);
        console.log('error: ', error);

        setNotificationError(notificationOpts().error);

        this.setState(() => ({
          submitting: false,
          apolloError: 'Ошибка входа',
          isLoading: false,
        }));
      });
  };

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

    const {
      data: { currentuseritem },
    } = props;

    const { addUser } = this.props;

    addUser({ ...currentuseritem });

    localStorage.setItem('user', JSON.stringify({ ...currentuseritem }));
  };

  mockSubmit = value => {
    this.setState(({ submitting, isLoading }) => {
      return { submitting: !submitting, isLoading: !isLoading };
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.getUser(value.email);
        resolve(true);
      }, 2000);
    });
  };

  render() {
    const { handleSubmit, pristine, invalid, error } = this.props;
    const { apolloError, submitting, isLoading } = this.state;

    return (
      <Form onSubmit={handleSubmit(this.mockSubmit)}>
        <FormLogo />

        <Box mb={'100px'}>
          <BoxFirst>
            <Field
              name="uname"
              component={TextFieldWithTooltip}
              placeholder={'Логин'}
              type="text"
              left={'45%'}
              // validate={[required, isEmail]}
            />
          </BoxFirst>

          <BoxSecond>
            <Field
              name={'ups'}
              placeholder={'Пароль'}
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

        {/* if succes => to={'/app/project-list'}  ----- USER*/}
        {/* if succes => to={'/app/profile'}  ----- ADMIN*/}
      </Form>
    );
  }
}

FormLogin = withRouter(FormLogin);

FormLogin = withApollo(FormLogin);

FormLogin = connect(
  null,
  dispatch => ({
    addUser: user => dispatch({ type: USER_ADD, payload: user }),
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormLogin);

FormLogin = reduxForm({
  form: 'FormLogin',
})(FormLogin);

export default FormLogin;
