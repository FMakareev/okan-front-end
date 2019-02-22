import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import Notifications, { success, error } from 'react-notification-system-redux';

/** View */
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';
import { SvgPlay } from '@lib/ui/Icons/SvgPlay';
import Text from '@lib/ui/Text/Text';
import Box from '@lib/ui/Box/Box';
import PictureUploadPreview from '@lib/ui/PictureUploadPreview/PictureUploadPreview';
import DayPickerField from '@lib/ui/DayPickerField/DayPickerField';
import MaskedInputField from '@lib/ui/MaskedInputField/MaskedInputField';

/**PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** Validation */
import required from '../../../../utils/validation/required';
import isEmail from '../../../../utils/validation/isEmail';

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
    title: 'Пользователь создан',
    message: 'Пользователь создан',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Пользователь не создан',
    message: 'Пользователь не создан',
    position: 'tr',
    autoDismiss: 2,
  },
});

export class FormProfileCreateUser extends Component {
  static propTypes = { ...formPropTypes };

  constructor(props) {
    super(props);

    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {
    const data = { variables: Object.assign({}, value) };

    return this.props['@apollo/create'](data)
      .then(response => {
        this.props.setNotificationSuccess(notificationOpts().success);
        this.props.reset();
        return response;
      })
      .catch(({ graphQLErrors, message, networkError, ...rest }) => {
        // console.log('graphQLErrors: ', graphQLErrors);
        // console.log('message: ', message);
        // console.log('networkError: ', networkError);
        // console.log('rest: ', rest);
        this.props.setNotificationError(notificationOpts().error);

        throw new SubmissionError({ _error: message });
      });
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          mb={[13]}
          fontFamily={'primary500'}>
          Создать пользователя
        </Text>

        <BoxFirst>
          <Field
            name="firstname"
            component={TextFieldWithTooltip}
            placeholder={'Фамилия'}
            type="text"
            size={'md'}
            fontFamily={'secondary'}
            validate={required}
          />
        </BoxFirst>

        <Field
          name="lastname"
          component={TextFieldWithTooltip}
          placeholder={'Имя'}
          type="text"
          size={'md'}
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="patronymic"
          component={TextFieldWithTooltip}
          placeholder={'Отчество'}
          type="text"
          size={'md'}
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="birthdate"
          component={DayPickerField}
          placeholder={'Дата рождения'}
          type="text"
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="position"
          component={TextFieldWithTooltip}
          placeholder={'Должность'}
          type="text"
          size={'md'}
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="phone"
          component={MaskedInputField}
          placeholder={'( 111 ) - 111 - 11 - 11'}
          type="text"
          validate={required}
          fontFamily={'secondary'}
          fontSize={5}
          lineHeight={7}
        />

        <Field
          name="email"
          component={TextFieldWithTooltip}
          placeholder={'Электронная почта'}
          type="text"
          size={'md'}
          fontFamily={
            'secondary' // validate={[required, isEmail]}
          }
        />

        <BoxSecond mb={11}>
          <Field
            name="signature"
            component={PictureUploadPreview}
            placeholder={'Загрузить подпись'}
            type="text"
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
      </Form>
    );
  }
}

FormProfileCreateUser = graphql(CreateUserMutation, {
  name: '@apollo/create',
})(FormProfileCreateUser);

FormProfileCreateUser = connect(
  state => ({
    values: getFormValues('FormProfileCreateUser')(state),
  }),
  dispatch => ({
    // addUser: user => dispatch({ type: USER_ADD, user }), // TODO review: не забываем импортировать, и addUser тут не нужно
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormProfileCreateUser);

FormProfileCreateUser = reduxForm({
  form: 'FormProfileCreateUser',
})(FormProfileCreateUser);

export default FormProfileCreateUser;
