import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';
import { success, error } from 'react-notification-system-redux';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';

/** View */
import Box from '@lib/ui/Box/Box';
import TooltipBase from '@lib/ui/TooltipBase/TooltipBase';
import FormButtonSubmit from '@lib/ui/FormButtonSubmit/FormButtonSubmit';
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';

/** Components */
import FormLogo from '../FormLogo/FormLogo';
import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** GraphQL schema */
import ActivateUserMutation from './ActivateUserMutation.graphql';
import CurrentUserItemQuery from './CurrentUserItemQuery.graphql';

/** Validation */
import isEmail from '../../../../utils/validation/isEmail';
import required from '../../../../utils/validation/required';

/** JSON Method */
import { jsonToUrlEncoded } from '@lib/utils/jsontools/jsonToUrlEncoded';

/** Constatnts */
import { USER_ADD } from '../../../../store/reducers/user/actionTypes';
import {TextFieldLastWrapper} from "@lib/ui/TextFieldLastWrapper/TextFieldLastWrapper";
import {TextFieldFirstWrapper} from "@lib/ui/TextFieldFirstWrapper/TextFieldFirstWrapper";

const validate = ({ log, password, retryPas }) => {
  const errors = {};

  if (!log) {
    errors.log = 'Обязательно для заполнения';
  }

  if (!password) {
    errors.password = 'Обязательно для заполнения';
  }

  if (!retryPas) {
    errors.retryPas = 'Обязательно для заполнения';
  }

  if (password !== undefined && password.length <= 7) {
    errors.password = 'Пароль должен состоять минимум из 8 символов';
  }

  if (password !== undefined && password.length >= 30) {
    errors.password = 'Пароль должен состоять не больше 30 символов';
  }

  if (password !== retryPas) {
    errors.retryPas = 'Пароли не совпадают';
  }

  return errors;
};


const notificationOpts = () => ({
  success: {
    title: 'Пользователь успешно зарегистрирован',
    message: 'Пользователь успешно зарегистрирован',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Пользователь не был зарегистрирован',
    message: 'Пользователь не был зарегистрирован',
    position: 'tr',
    autoDismiss: 2,
  },
});

export class FormRegistration extends Component {
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

  userAuth(value) {
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
          return this.getUser(value.uname);
        }
      })
      .catch(({ status, ...rest }) => {
        this.setState(() => ({ submitting: false, isLoading: false, apolloError: null }));

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
      .query({ query: CurrentUserItemQuery, variables: { email: email } })
      .then(result => {
        if (result.errors || result.data.currentuseritem === null) {
          // TO DO change this
          throw result;
        } else {
          this.setState(() => ({ apolloError: null, isLoading: false }));
          this.setUser(result);

          history.push(`/app/project-list`);
          setNotificationSuccess(notificationOpts().success);
          return Promise.resolve(result);
        }
      })
      .catch(({ graphQLErrors, message, error, networkError, ...rest }) => {
        // console.log('graphQLErrors: ', graphQLErrors);
        // console.log('message: ', message);
        // console.log('networkError: ', networkError);
        // console.log('rest: ', rest);
        // console.log('error: ', error);

        setNotificationError(notificationOpts().error);

        this.setState(() => ({
          submitting: false,
          apolloError: 'Ошибка входа',
          isLoading: false,
        }));
      });
  };

  setUser = props => {
    const {
      data: { currentuseritem },
    } = props;

    const { addUser } = this.props;

    addUser(currentuseritem);

    localStorage.setItem('user', JSON.stringify({ ...currentuseritem }));
  };

  submit(value) {
    const data = { variables: Object.assign({}, value) };

    this.setState(({ submitting, isLoading }) => {
      return { submitting: !submitting, isLoading: !isLoading };
    });

    return this.props['@apollo/create'](data)
      .then(response => {
        if (response.errors) {
          throw response;
        } else {
          this.userAuth({
            uname: value.email,
            ups: value.password,
          });
          return Promise.resolve(response);
        }
      })
      .catch(error => {
        console.log(error);
        this.props.setNotificationError(notificationOpts().error);
        this.setState(() => ({
          submitting: false,
          apolloError: 'Ошибка авторизации пользователя',
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
              name={'email'}
              component={TextFieldWithTooltip}
              placeholder={'Логин'}
              type="text"
              left={'40%'}
              // validate={[required, isEmail]}
            />
          </TextFieldFirstWrapper>

          <Field
            name={'password'}
            placeholder={'Пароль'}
            variant={'secondary'}
            component={FieldInputPassword}
          />

          <TextFieldLastWrapper>
            <Field
              name={'retryPas'}
              placeholder={'Потвердите пароль'}
              component={FieldInputPassword}
            />
          </TextFieldLastWrapper>
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
FormRegistration = withApollo(FormRegistration);

FormRegistration = graphql(ActivateUserMutation, {
  name: '@apollo/create',
})(FormRegistration);

FormRegistration = connect(
  state => ({
    values: getFormValues('FormRegistration')(state),
  }),
  dispatch => ({
    addUser: user => dispatch({ type: USER_ADD, user: user }),
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormRegistration);

FormRegistration = reduxForm({
  form: 'FormRegistration',
  validate,
})(FormRegistration);

export default FormRegistration;
