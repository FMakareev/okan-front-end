import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, getFormValues, SubmissionError, setSubmitFailed } from 'redux-form';

import Flex from '../../../../components/Flex/Flex';
import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';
import TooltipBase from '../../../../components/TooltipBase/TooltipBase';

import FieldInputPassword from '../FieldInputPassword/FieldInputPassword';
import FormLogo from '../FormLogo/FormLogo';
import FormButton from '../FormButton/FormButton';

import required from '../../../../utils/validation/required';

import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

class FormLogin extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {}

  render() {
    const { handleSubmit, pristine, submitting, fill, invalid, error } = this.props;

    // TODO review:MICHA: добавь валидацию на обязательность заполнения полей и заблокируй кнопку если форма не валидна и так на всех формах должно быть
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <FormLogo />

        <Flex alignItems={'center'} flexDirection={'column'} mb={'100px'}>
          <Flex width={'100%'}>
            <Field
              name="uname"
              component={TextFieldBase}
              placeholder={'Логин'}
              type="text"
              fz={9}
              validate={[required]}
            />
          </Flex>
          <FieldInputPassword name={'ups'} placeholder={'Пароль'} validate={required} />

          {error && <TooltipBase position="bottom">Невеврный логин или пароль</TooltipBase>}
        </Flex>

        <FormButton disabled={pristine || submitting || invalid} children={'Войти'} ml={9} />
      </form>
    );
  }
}

FormLogin = reduxForm({
  form: 'FormLogin',
})(FormLogin);

export default FormLogin;
