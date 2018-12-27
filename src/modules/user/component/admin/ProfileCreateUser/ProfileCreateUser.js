import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import Notifications, { success, error } from 'react-notification-system-redux';

/** View */
import TextFieldWithTooltip from '../../../../../components/TextFieldWithTooltip/TextFieldWithTooltip';
import ButtonWithImage from '../../../../../components/ButtonWithImage/ButtonWithImage';
import { SvgPlay } from '../../../../../components/Icons/SvgPlay';
import Text from '../../../../../components/Text/Text';
import Box from '../../../../../components/Box/Box';
import PictureUploadPreview from '../../../../../components/PictureUploadPreview/PictureUploadPreview';
import DayPickerField from '../../../../../components/DayPickerField/DayPickerField';
import MaskedInputField from '../../../../../components/MaskedInputField/MaskedInputField';

/**PropTypes */
import { formPropTypes } from '../../../../../propTypes/Forms/FormPropTypes';

/** Validation */
import required from '../../../../../utils/validation/required';
import isEmail from '../../../../../utils/validation/isEmail';

/** GraphQL schema */
import CreateUserMutation from './CreateUserMutation.graphql';

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

export class ProfileCreateUser extends Component {
  static propTypes = { ...formPropTypes };

  constructor(props) {
    super(props);

    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {
    console.log('value', value);

    const data = { variables: Object.assign({}, value) };
    console.log('data', data);

    return this.props['@apollo/create'](data)
      .then(response => {
        // this.props.setNotificationSuccess(success(notificationOpts.success));
        this.props.setNotificationSuccess(notificationOpts().success);

        return response;
      })
      .catch(({ graphQLErrors, message, networkError, ...rest }) => {
        console.log('graphQLErrors: ', graphQLErrors);
        console.log('message: ', message);
        console.log('networkError: ', networkError);
        console.log('rest: ', rest);
        // this.props.setNotificationError(error(notificationOpts.error));
        this.props.setNotificationError(notificationOpts().error);

        if (graphQLErrors) {
          throw new SubmissionError({ ...this.getNetworkError(graphQLErrors) });
        } else {
          throw new SubmissionError({ _error: message });
        }
      });
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Text
          fontSize={6}
          lineHeight={7}
          color={'color7'}
          textAlign={'center'}
          mb={13}
          fontFamily={'primary500'}>
          Создать пользователя
        </Text>

        <BoxFirst>
          <Field
            name="firstName"
            component={TextFieldWithTooltip}
            placeholder={'Фамилия'}
            type="text"
            fontSize={5}
            lineHeight={7}
            fontFamily={'secondary'}
            validate={required}
          />
        </BoxFirst>

        <Field
          name="lastName"
          component={TextFieldWithTooltip}
          placeholder={'Имя'}
          type="text"
          fontSize={5}
          lineHeight={7}
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="patronymic"
          component={TextFieldWithTooltip}
          placeholder={'Отчество'}
          type="text"
          fontSize={5}
          lineHeight={7}
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="birthdate"
          component={DayPickerField}
          placeholder={'Дата рождения'}
          type="text"
          fontSize={5}
          lineHeight={7}
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="position"
          component={TextFieldWithTooltip}
          placeholder={'Должность'}
          type="text"
          fontSize={5}
          lineHeight={7}
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="phone"
          component={MaskedInputField}
          placeholder={'Телефон'}
          type="text"
          fontSize={5}
          lineHeight={7}
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="email"
          component={TextFieldWithTooltip}
          placeholder={'Электронная почта'}
          type="text"
          fontSize={5}
          lineHeight={7}
          validate={[required, isEmail]}
          fontFamily={'secondary'}
        />

        <BoxSecond mb={11}>
          <Field
            name="signature"
            component={PictureUploadPreview}
            placeholder={'Загрузить подпись'}
            type="text"
            fontSize={5}
            lineHeight={7}
            validate={required}
          />
        </BoxSecond>

        <ButtonWithImage
          type="submit"
          variant={'large'}
          size={'medium'}
          children={'Создать пользователя'}
          rightIcon={SvgPlay()}
          ml={9}
          disabled={pristine || submitting || invalid}
          width={'100%'}
          widthIcon={'10px'}
        />

        {/* TODO: //После этого пользователю на указанную электронную почту придёт письмо с ссылкой для
       // подтверждения регистрации. При клике по ссылке пользователь попадает в интерфейс авторизации пользователя*/}
      </Form>
    );
  }
}

ProfileCreateUser = graphql(CreateUserMutation, {
  name: '@apollo/create',
})(ProfileCreateUser);

ProfileCreateUser = connect(
  state => ({
    values: getFormValues('ProfileCreateUser')(state),
  }),
  dispatch => ({
    addUser: user => dispatch({ type: USER_ADD, user }), // TODO review: не забываем импортировать, и addUser тут не нужно
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(ProfileCreateUser);

ProfileCreateUser = reduxForm({
  form: 'ProfileCreateUser',
})(ProfileCreateUser);

export default ProfileCreateUser;
