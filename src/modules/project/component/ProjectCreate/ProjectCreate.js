import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/**View */
import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
import Text from '../../../../components/Text/Text';
import Box from '../../../../components/Box/Box';
import PictureUploadPreview from '../../../../components/PictureUploadPreview/PictureUploadPreview';
import SelectBase from '../../../../components/SelectBase/SelectBase';

/**Image */
import { SvgPlay } from '../../../../components/Icons/SvgPlay';

/**PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

const BoxStyled = styled(Box)`
  input {
    border-radius: 5px;
    text-align: center;
    font-size: 18px;
    line-height: 24px;
    padding: 7px;
    border: 0;
  }
  border-radius: 5px;
  border: 1px solid #848484;
`;

const options = [
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
];

export class ProjectCreate extends Component {
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
        <Text fz={6} lh={7} color={'color7'} textAlign={'center'} mb={6} fontFamily={'primary500'}>
          Номер проекта
        </Text>

        <BoxStyled mb={16}>
          <Field
            name="projectName"
            component={TextFieldBase}
            placeholder={'Название документа'}
            type="text"
            fontSize={5}
            lineHeight={6}
            fontFamily={'secondary'}
          />
        </BoxStyled>

        <Text fz={6} lh={7} color={'color7'} textAlign={'center'} mb={6} fontFamily={'primary500'}>
          Список шаблонов
        </Text>

        <BoxStyled mb={'180px'}>
          <Field
            name="selectProjectName"
            component={SelectBase}
            placeholder={'Название документа'}
            type="text"
            fontSize={5}
            lineHeight={6}
            options={options}
            labelKey={'label'}
            valueKey={'value'}
          />
        </BoxStyled>

        <ButtonWithImage
          type="submit"
          variant={'large'}
          size={'medium'}
          children={'Создать проект'}
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

ProjectCreate = reduxForm({
  form: 'ProjectCreate',
})(ProjectCreate);

export default ProjectCreate;
