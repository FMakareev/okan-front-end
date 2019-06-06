import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withApollo} from 'react-apollo';
import {withRouter} from 'react-router-dom';
import {Field, reduxForm, SubmissionError, Form} from 'redux-form';
import {success, error} from 'react-notification-system-redux';
import {captureException} from '../../../../hocs/withSentry/withSentry';

/** View */
import Box from '@lib/ui/Box/Box';
import FormButtonSubmit from '@lib/ui/FormButtonSubmit/FormButtonSubmit';
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';
import {TextFieldFirstWrapper} from '@lib/ui/TextFieldFirstWrapper/TextFieldFirstWrapper';
import {TextFieldLastWrapper} from '@lib/ui/TextFieldLastWrapper/TextFieldLastWrapper';

/**Components */
import FormLogo from '../FormLogo/FormLogo';
import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import {FetchUserAuth} from '../FetchUserAuth/FetchUserAuth';

/** constants */
import {USER_ADD} from '../../../../store/reducers/user/actionTypes';

/** query */
import UserEmailItemQuery from './UserEmailItemQuery.graphql';

const validate = ({uname, ups}) => {
  const errors = {};

  if (uname === undefined) {
    errors.uname = 'Обязательно для заполнения';
  }

  if (ups === undefined) {
    errors.ups = 'Обязательно для заполнения';
  }

  if (ups !== undefined && ups.length <= 8) {
    errors.ups = 'Пароль должен состоять минимум из 8 символов ';
  }

  if (ups !== undefined && ups.length >= 30) {
    errors.ups = 'Пароль должен состоять не больше 30 символов ';
  }
  return errors;
};

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


const dictionaryError = (message)=>{
  const dict = {
    "Login or password not found": "Неверный логин или пароль",
    "User not active": "Акаунт не активирован. Перейдите по ссылке в письме для активации акаунта или обратитесь к администратору.",
    "AD error": "Акаунт не прошел внутреннюю авторизацию, пожалуйста обратитесь к системному администратору",
    "ошибка сервера": "{ошибка сервера}",
  };

  for(let prop in dict){
    if( prop === message){
      return dict[prop];
    }
  }
  return 'Произошла не известная ошибка';
};

const normalizeSubmissionError = (error) => {
  const data = {
    _error: dictionaryError(error.message)
  };
  for (let prop in error.errors) {
    if (Array.isArray(error.errors[prop])) {
      data[prop] = error.errors[prop][0];
    }
  }
  return data;
}

export class FormLogin extends Component {
  static propTypes = {
    addUser: PropTypes.func,
    client: PropTypes.object,
    error: PropTypes.any,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    pristine: PropTypes.any,
    setNotificationError: PropTypes.func,
    setNotificationSuccess: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = this.initialState;

    this.submit = this.submit.bind(this);
  }

  get initialState() {
    return {submitting: false, apolloError: null};
  }

  submit(value) {
    this.setState(({submitting}) => ({
      submitting: !submitting,
      isLoading: true,
    }));

    return FetchUserAuth(value)
      .then(response => {
        console.log('FetchUserAuth: ', response);
        if (response.status >= 400 || !document.cookie) {
          return response.json()
        } else {
          return this.getUser(value.email);
        }
      })
      .then(response => {
        if(response.errors){
          throw response;
        }
      })
      .catch(error => {
        console.log('FetchUserAuth error: ', error);
        this.setState(() => ({ submitting: false, isLoading: false, apolloError: null }));
        throw new SubmissionError(normalizeSubmissionError(error));
      });
  }

  getUser = email => {
    const {client, history, setNotificationSuccess, setNotificationError} = this.props;
    return client
      .query({query: UserEmailItemQuery, variables: {email: email}})
      .then(result => {
        if (result.errors || result.data.currentuseritem === null) {
          // TO DO change this
          throw result;
        } else {
          this.setState(() => ({apolloError: null, isLoading: false}));
          this.setUser(result);
          setNotificationSuccess(notificationOpts().success);

          history.push(`/app/profile`);
          return Promise.resolve(result);
        }
      })
      .catch(({graphQLErrors, message, error, networkError, ...rest}) => {
        setNotificationError(notificationOpts().error);
        captureException(error);
        this.setState(() => ({
          submitting: false,
          apolloError: 'Ошибка входа',
          isLoading: false,
        }));
      });
  };

  setUser = props => {
    const {
      data: {currentuseritem},
    } = props;

    const {addUser} = this.props;

    addUser(currentuseritem);

    localStorage.setItem('user', JSON.stringify({...currentuseritem}));
  };

  mockSubmit = value => {
    this.setState(({submitting, isLoading}) => {
      return {submitting: !submitting, isLoading: !isLoading};
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.getUser(value.email);
        resolve(true);
      }, 2000);
    });
  };

  render() {
    const {handleSubmit, pristine, error} = this.props;
    const {apolloError, isLoading} = this.state;
    console.log(this.props);
    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <FormLogo/>

        <Box mb={'100px'}>
          <TextFieldFirstWrapper>
            <Field
              name="uname"
              component={TextFieldWithTooltip}
              placeholder={'Логин'}
              type="text"
              left={'45%'}
              // validate={[required, isEmail]}
            />
          </TextFieldFirstWrapper>

          <TextFieldLastWrapper>
            <Field
              name={'ups'}
              placeholder={'Пароль'}
              component={FieldInputPassword}
            />
          </TextFieldLastWrapper>
        </Box>

        <FormButtonSubmit
          disabled={pristine}
          children={'Войти'}
          ml={9}
          isLoading={isLoading}
          error={error || apolloError}
        />
      </Form>
    );
  }
}

FormLogin = withRouter(FormLogin);

FormLogin = withApollo(FormLogin);

FormLogin = connect(
  null,
  dispatch => ({
    addUser: user => dispatch({type: USER_ADD, user: user}),
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormLogin);

FormLogin = reduxForm({
  form: 'FormLogin',
})(FormLogin);

export default FormLogin;
