import React, {Component} from 'react';
import {Field} from "redux-form";
import {Box} from "@lib/ui/Box/Box";

import required from "@lib/utils/validation/required";
import TextFieldWithTooltip from "@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip";
import DayPickerField from "@lib/ui/DayPickerField/DayPickerField";
import {TextFieldFirstWrapper} from "@lib/ui/TextFieldFirstWrapper/TextFieldFirstWrapper";
import {TextFieldLastWrapper} from "@lib/ui/TextFieldLastWrapper/TextFieldLastWrapper";


export class CreateContractor extends Component {
  render() {

    const {names} = this.props;
    return (<Box>
      <TextFieldFirstWrapper>
        <Field
          name={names.organizationname}
          component={TextFieldWithTooltip}
          placeholder={'Наименование организации'}
          type={"text"}
          size={'sm'}
          fontFamily={'secondary'}
          validate={required}
        />
      </TextFieldFirstWrapper>
      <Field
        name={names.position}
        component={TextFieldWithTooltip}
        placeholder={'Должность'}
        type={"text"}
        size={'sm'}
        variant={'primary'}
        fontFamily={'secondary'}
        validate={required}
      />
      <Field
        name={names.firstname}
        component={TextFieldWithTooltip}
        placeholder={'Фамилия'}
        type={"text"}
        size={'sm'}
        variant={'primary'}
        fontFamily={'secondary'}
        validate={required}
      />
      <Field
        name={names.lastname}
        component={TextFieldWithTooltip}
        placeholder={'Имя'}
        type={"text"}
        size={'sm'}
        variant={'primary'}
        fontFamily={'secondary'}
        validate={required}
      />
      <Field
        name={names.patronymic}
        component={TextFieldWithTooltip}
        placeholder={'Отчество'}
        type={"text"}
        size={'sm'}
        variant={'primary'}
        fontFamily={'secondary'}
        validate={required}
      />
      <Field
        name={names.signature}
        component={TextFieldWithTooltip}
        placeholder={'Подпись'}
        type={"text"}
        size={'sm'}
        variant={'primary'}
        fontFamily={'secondary'}
        validate={required}
      />
      <TextFieldLastWrapper>
        <Field
          name={names.approvaldate}
          component={DayPickerField}
          placeholder={'Дата согласования'}
          type={"text"}
          size={'sm'}
          variant={'primary'}
          fontFamily={'secondary'}
          validate={required}
        />
      </TextFieldLastWrapper>
    </Box>)
  }
}

export default CreateContractor;