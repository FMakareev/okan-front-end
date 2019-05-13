import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { success, error } from 'react-notification-system-redux';
import { captureException } from '../../../../hocs/withSentry/withSentry';

/** View */
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';
import { SvgPlay } from '@lib/ui/Icons/SvgPlay';
import Text from '@lib/ui/Text/Text';
import PictureUploadPreview from '@lib/ui/PictureUploadPreview/PictureUploadPreview';
import DayPickerField from '@lib/ui/DayPickerField/DayPickerField';
import MaskedInputField from '@lib/ui/MaskedInputField/MaskedInputField';

/**PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** Validation */
import required from '../../../../utils/validation/required';

/** GraphQL schema */
import CreateUserMutation from './CreateUserMutation.graphql';
import { TextFieldFirstWrapper } from '@lib/ui/TextFieldFirstWrapper/TextFieldFirstWrapper';
import { TextFieldLastWrapper } from '@lib/ui/TextFieldLastWrapper/TextFieldLastWrapper';

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
      .catch(error => {
        const { message } = error;
        this.props.setNotificationError(notificationOpts().error);
        captureException(error);

        throw new SubmissionError({ _error: message });
      });
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Text variant={'documentTitle'} mb={13}>
          Создать пользователя
        </Text>

        <TextFieldFirstWrapper>
          <Field
            name="firstname"
            component={TextFieldWithTooltip}
            placeholder={'Фамилия'}
            type="text"
            size={'md'}
            fontFamily={'secondary'}
            validate={required}
          />
        </TextFieldFirstWrapper>

        <Field
          name="lastname"
          component={TextFieldWithTooltip}
          placeholder={'Имя'}
          type="text"
          size={'md'}
          variant={'primary'}
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="patronymic"
          component={TextFieldWithTooltip}
          placeholder={'Отчество'}
          type="text"
          size={'md'}
          variant={'primary'}
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="birthdate"
          component={DayPickerField}
          placeholder={'Дата рождения'}
          type="text"
          variant={'primary'}
          validate={required}
          fontFamily={'secondary'}
        />

        <Field
          name="position"
          component={TextFieldWithTooltip}
          placeholder={'Должность'}
          type="text"
          size={'md'}
          variant={'primary'}
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
        />

        <Field
          name="email"
          component={TextFieldWithTooltip}
          placeholder={'Электронная почта'}
          type="text"
          size={'md'}
          variant={'primary'}
        />

        <TextFieldLastWrapper mb={11}>
          <Field
            name="signature"
            component={PictureUploadPreview}
            placeholder={'Загрузить подпись'}
            type="text"
            validate={required}
          />
        </TextFieldLastWrapper>

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
