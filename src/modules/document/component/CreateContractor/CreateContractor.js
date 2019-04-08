import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Box } from '@lib/ui/Box/Box';

import required from '@lib/utils/validation/required';
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';
import DayPickerField from '@lib/ui/DayPickerField/DayPickerField';
import { TextFieldFirstWrapper } from '@lib/ui/TextFieldFirstWrapper/TextFieldFirstWrapper';
import { TextFieldLastWrapper } from '@lib/ui/TextFieldLastWrapper/TextFieldLastWrapper';

const fioValid = value => {
  let mask = /[А-ЯЁ][.][А-ЯЁ][.] [А-ЯЁ][а-яА-ЯёЁ]/;
  return mask.test(value)
    ? null
    : 'Неверный формат, ФИО должно соответствовать маске "И.О. Фамилия"';
};

export class CreateContractor extends Component {
  render() {
    console.log('CreateContractor render', this.props);
    const { names } = this.props;
    return (
      <Box>
        <TextFieldFirstWrapper>
          <Field
            name={names.organizationname}
            component={TextFieldWithTooltip}
            placeholder={'Наименование организации'}
            type={'text'}
            size={'sm'}
            fontFamily={'secondary'}
            validate={required}
          />
        </TextFieldFirstWrapper>
        <Field
          name={names.position}
          component={TextFieldWithTooltip}
          placeholder={'Должность'}
          type={'text'}
          size={'sm'}
          variant={'primary'}
          fontFamily={'secondary'}
          validate={required}
        />
        <Field
          name={names.firstname}
          component={TextFieldWithTooltip}
          placeholder={'Введите ФИО в формате "И.О. Фамилия"'}
          type={'text'}
          size={'sm'}
          variant={'primary'}
          fontFamily={'secondary'}
          validate={[required, fioValid]}
        />
        <Field
          name={names.signature}
          component={TextFieldWithTooltip}
          placeholder={'Номер согласующего письма'}
          type={'text'}
          size={'sm'}
          variant={'primary'}
          fontFamily={'secondary'}
        />
        <TextFieldLastWrapper>
          <Field
            name={names.approvaldate}
            component={DayPickerField}
            placeholder={'Дата согласования'}
            type={'text'}
            size={'sm'}
            variant={'primary'}
            fontFamily={'secondary'}
          />
        </TextFieldLastWrapper>
      </Box>
    );
  }
}

export default CreateContractor;
