import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/** View */
import TextFieldBase from '../../../../../components/TextFieldBase/TextFieldBase';
import ButtonWithImage from '../../../../../components/ButtonWithImage/ButtonWithImage';
import { SvgPlay } from '../../../../../components/Icons/SvgPlay';
import Text from '../../../../../components/Text/Text';
import Box from '../../../../../components/Box/Box';
import PictureUploadPreview from '../../../../../components/PictureUploadPreview/PictureUploadPreview';
import DayPickerField from '../../../../../components/DayPickerField/DayPickerField';

/**PropTypes */
import { formPropTypes } from '../../../../../propTypes/Forms/FormPropTypes';

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

export class ProfileCreateUser extends Component {
  static propTypes = { ...formPropTypes };

  constructor(props) {
    super(props);

    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {}

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Text fz={6} lh={7} color={'color7'} textAlign={'center'} mb={13} fontFamily={'primary500'}>
          Создать пользователя
        </Text>

        <BoxFirst>
          <Field
            name="firstName"
            component={TextFieldBase}
            placeholder={'Фамилия'}
            type="text"
            fontSize={5}
            lineHeight={6}
            fontFamily={'secondary'}
          />
        </BoxFirst>

        <Field
          name="lastName"
          component={TextFieldBase}
          placeholder={'Имя'}
          type="text"
          fontSize={5}
          lineHeight={6}
          fontFamily={'secondary'}
        />

        <Field
          name="patronymic"
          component={TextFieldBase}
          placeholder={'Отчество'}
          type="text"
          fontSize={5}
          lineHeight={6}
          fontFamily={'secondary'}
        />
        <Field
          name="DateOfBirth"
          component={DayPickerField}
          placeholder={'Дата рождения'}
          type="text"
          fontSize={5}
          lineHeight={6}
          fontFamily={'secondary'}
        />
        <Field
          name="position"
          component={TextFieldBase}
          placeholder={'Должность'}
          type="text"
          fontSize={5}
          lineHeight={6}
          fontFamily={'secondary'}
        />
        <Field
          name="phone"
          component={TextFieldBase}
          placeholder={'Телефон'}
          type="text"
          fontSize={5}
          lineHeight={6}
          fontFamily={'secondary'}
        />
        <Field
          name="email"
          component={TextFieldBase}
          placeholder={'Электронная почта'}
          type="text"
          fontSize={5}
          lineHeight={6}
          fontFamily={'secondary'}
        />
        <BoxSecond mb={11}>
          <Field
            name="signature"
            component={PictureUploadPreview}
            placeholder={'Загрузить подпись'}
            type="text"
            fontSize={5}
            lineHeight={6}
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

ProfileCreateUser = reduxForm({
  form: 'ProfileCreateUser',
})(ProfileCreateUser);

export default ProfileCreateUser;
