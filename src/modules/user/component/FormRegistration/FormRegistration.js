import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';
import { success, error } from 'react-notification-system-redux';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';
import { captureException } from '../../../../hocs/withSentry/withSentry';

/** View */
import Box from '@lib/ui/Box/Box';
import TooltipBase from '@lib/ui/TooltipBase/TooltipBase';
import FormButtonSubmit from '@lib/ui/FormButtonSubmit/FormButtonSubmit';
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';
import { TextFieldLastWrapper } from '@lib/ui/TextFieldLastWrapper/TextFieldLastWrapper';
import { TextFieldFirstWrapper } from '@lib/ui/TextFieldFirstWrapper/TextFieldFirstWrapper';

/** Components */
import FormLogo from '../FormLogo/FormLogo';
import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import { FetchUserAuth } from '../FetchUserAuth/FetchUserAuth';

/** PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** GraphQL schema */
import ActivateUserMutation from './ActivateUserMutation.graphql';
import CurrentUserItemQuery from './CurrentUserItemQuery.graphql';

/** Validation */
import isEmail from '../../../../utils/validation/isEmail';
import required from '../../../../utils/validation/required';

/** Constatnts */
import { USER_ADD } from '../../../../store/reducers/user/actionTypes';

const validate = ({ email, password, retryPas }) => {
  const errors = {};
  console.log('validate: ',email, password, retryPas);
  if (!email) {
    errors.email = 'Обязательно для заполнения';
  }
  if (!isEmail(errors.email)) {
    errors.email = isEmail(errors.email);
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
    return FetchUserAuth(value)
      .then(response => {
        if (response.status >= 400 || !document.cookie) {
          throw response;
        } else {
          return this.getUser(value.uname);
        }
      })
      .catch(error => {
        const { status } = error;
        this.setState(() => ({ submitting: false, isLoading: false, apolloError: null }));
        captureException(error);

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
    console.log(123, value);

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
    console.log(pristine, submitting, invalid);

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
              variant={'secondary'}
              component={FieldInputPassword}
            />
          </TextFieldLastWrapper>
        </Box>
        <FormButtonSubmit
          disabled={pristine || submitting || invalid}
          ml={9}
          isLoading={isLoading}
          error={error || apolloError}>
          <TooltipBase isActive={error} warning={error}>
            Войти
          </TooltipBase>
        </FormButtonSubmit>
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

// validate={[required, isEmail]}
