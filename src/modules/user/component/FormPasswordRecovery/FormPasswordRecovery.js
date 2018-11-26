import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, getFormValues, SubmissionError, setSubmitFailed } from 'redux-form';

import Flex from '../../../../components/Flex/Flex';
import TooltipBase from '../../../../components/TooltipBase/TooltipBase';

import required from '../../../../utils/validation/required';

import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';
import FormButton from '../FormButton/FormButton';

import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

const validate = values => {
  const errors = {};

  const oldPassword = values.oldPassword;
  const newPassword = values.newPassword;
  const retypePassword = values.retypePassword;

  if (newPassword !== undefined && newPassword.length <= 8) {
    errors.newPassword = { label: 'Ошибка!', text: 'Пароль должен состоять минимум из 8 цифр' };
  }

  if (newPassword !== undefined && newPassword.length > 64) {
    errors.newPassword = { label: 'Ошибка!', text: 'Пароль должен состоять не больше 64 цифр' };
  }

  if (newPassword !== retypePassword) {
    errors.retypePassword = { label: 'Ошибка!', text: 'Пароли не совпадают' };
  }

  if (oldPassword === newPassword || oldPassword === retypePassword) {
    errors.retypePassword = {
      label: 'Ошибка!',
      text: 'Старый паполь и новый пароль, не должны совпадать',
    };
  }
  return errors;
};

class FormPasswordRecovery extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {
    console.log(11, value);
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid, error } = this.props;

    // TODO review:MICHA: нужна проверка чтобы поля были заполнены, а кнопка заблокирована пока форма не валидна
    // TODO review:MICHA: старый пароль не должен быть похож на новый, а новыи и повтор нового должны совпадать
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <FormLogo />

        <Flex alignItems={'center'} flexDirection={'column'} mb={'100px'}>
          <FieldInputPassword
            name={'oldPassword'}
            placeholder={'Старый пароль'}
            validate={required}
          />
          {error && <TooltipBase position="bottom">Невеврный логин или пароль</TooltipBase>}

          <FieldInputPassword
            name={'newPassword'}
            placeholder={'Новый пароль'}
            validate={required}
          />

          <FieldInputPassword
            name={'retypePassword'}
            placeholder={'Потвердите новый пароль'}
            validate={required}
          />
        </Flex>

        <FormButton
          disabled={pristine || submitting || invalid}
          children={'Сменить пароль'}
          ml={9}
        />
      </form>
    );
  }
}

FormPasswordRecovery = reduxForm({
  form: 'FormPasswordRecovery',
  validate,
})(FormPasswordRecovery);

export default FormPasswordRecovery;
