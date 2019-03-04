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
          name={names[0]}
          component={TextFieldWithTooltip}
          placeholder={'Наименование организации'}
          type={"text"}
          size={'sm'}
          fontFamily={'secondary'}
          validate={required}
        />
      </TextFieldFirstWrapper>
      <Field
        name={names[1]}
        component={TextFieldWithTooltip}
        placeholder={'Должность'}
        type={"text"}
        size={'sm'}
        fontFamily={'secondary'}
        validate={required}
      />
      <Field
        name={names[2]}
        component={TextFieldWithTooltip}
        placeholder={'Фамилия'}
        type={"text"}
        size={'sm'}
        fontFamily={'secondary'}
        validate={required}
      />
      <Field
        name={names[3]}
        component={TextFieldWithTooltip}
        placeholder={'Имя'}
        type={"text"}
        size={'sm'}
        fontFamily={'secondary'}
        validate={required}
      />
      <Field
        name={names[4]}
        component={TextFieldWithTooltip}
        placeholder={'Отчество'}
        type={"text"}
        size={'sm'}
        fontFamily={'secondary'}
        validate={required}
      />
      <Field
        name={names[5]}
        component={DayPickerField}
        placeholder={'Дата'}
        type={"text"}
        size={'sm'}
        variant={'primary'}
        fontFamily={'secondary'}
        validate={required}
      />
      <TextFieldLastWrapper>
        <Field
          name={names[6]}
          component={TextFieldWithTooltip}
          placeholder={'Подпись'}
          type={"text"}
          size={'sm'}
          fontFamily={'secondary'}
          validate={required}
        />
      </TextFieldLastWrapper>
    </Box>)
  }
}

export default CreateContractor;
