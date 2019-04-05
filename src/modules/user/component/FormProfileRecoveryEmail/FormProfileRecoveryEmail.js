import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Notifications, { success, error } from 'react-notification-system-redux';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';
import { captureException } from '../../../../hocs/withSentry/withSentry';

/**View */
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';
import { SvgPlay } from '@lib/ui/Icons/SvgPlay';
import Box from '@lib/ui/Box/Box';

/**PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** Styles property */
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';

/** Validation */
import isEmail from '../../../../utils/validation/isEmail';

/** GraphQL schema */
import RecoveryPasswordMutation from './RecoveryPasswordMutation.graphql';

const BoxStyled = styled(Box)`
  input {
    ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
  }
`;

const notificationOpts = email => ({
  success: {
    title: 'Пароль сброшен',
    message: `Письмо отправлено на почту ${email}`,
    position: 'tr',
    autoDismiss: 5,
  },
  error: {
    title: 'Произошла ошибка',
    message: 'Сбросте кеш браузера и повторите попытку.',
    position: 'tr',
    autoDismiss: 5,
  },
});

export class FormProfileRecoveryEmail extends Component {
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
        this.props.setNotificationSuccess(notificationOpts(value.email).success);
        this.props.reset();
        return response;
      })
      .catch(({ graphQLErrors, message, networkError, ...rest }) => {
        // console.log('graphQLErrors: ', graphQLErrors);
        // console.log('message: ', message);
        // console.log('networkError: ', networkError);
        // console.log('rest: ', rest);
        this.props.setNotificationError(notificationOpts().error);
        captureException({ networkError, message });

        throw new SubmissionError({ _error: message });
      });
  }
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <BoxStyled mb={4}>
          <Field
            name="email"
            component={TextFieldWithTooltip}
            placeholder={'email@okan.su'}
            type="text"
            size={'md'}
            fontFamily={'secondary'}
            // validate={isEmail}
          />
        </BoxStyled>

        <ButtonWithImage
          type="submit"
          variant={'large'}
          size={'medium'}
          children={'Восстановить пароль'}
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

FormProfileRecoveryEmail = graphql(RecoveryPasswordMutation, {
  name: '@apollo/create',
})(FormProfileRecoveryEmail);

FormProfileRecoveryEmail = connect(
  state => ({
    values: getFormValues('FormProfileRecoveryEmail')(state),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormProfileRecoveryEmail);

FormProfileRecoveryEmail = reduxForm({
  form: 'FormProfileRecoveryEmail',
})(FormProfileRecoveryEmail);

export default FormProfileRecoveryEmail;
