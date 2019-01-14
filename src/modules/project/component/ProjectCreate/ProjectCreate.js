import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/**View */
import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
import Text from '../../../../components/Text/Text';
import Box from '../../../../components/Box/Box';
import SelectBase from '../../../../components/SelectBase/SelectBase';

/**Image */
import { SvgPlay } from '../../../../components/Icons/SvgPlay';

/**PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';
import FontSizeProperty from '../../../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../../../styles/styleProperty/LineHeightProperty';

const BoxStyled = styled(Box)`
  input {
    padding: 3px 7px;
    border: 0;
    text-align: center;
    ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
    ${props => FontSizeProperty({ ...props, fontSize: 6 })};
    ${props => LineHeightProperty({ ...props, lineHeight: 8 })};
  }
  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
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
        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          mb={6}
          fontFamily={'primary500'}>
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

        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          mb={6}
          fontFamily={'primary500'}>
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
          children={'Создать'}
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
