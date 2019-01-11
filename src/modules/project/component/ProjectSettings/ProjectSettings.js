import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form, FieldArray } from 'redux-form';

/**View */
import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
import Text from '../../../../components/Text/Text';
import Box from '../../../../components/Box/Box';
import TextFieldArray from '../../../../components/TextFieldArray/TextFieldArray';

/**Image */
import { SvgSave } from '../../../../components/Icons/SvgSave';

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

export class ProjectSettings extends Component {
  static propTypes = { ...formPropTypes, mb: PropTypes.string };

  constructor(props) {
    super(props);
    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {
    return value;
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <BoxStyled mb={16}>
          <Field
            name="projectName"
            component={TextFieldBase}
            placeholder={'Название документа'}
            type="text"
            fontSize={6}
            lineHeight={8}
            fontFamily={'secondary'}
          />
        </BoxStyled>

        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          mb={4}
          fontFamily={'primary500'}>
          Участники проекта
        </Text>

        <Box mb={'180px'}>
          <FieldArray
            name={'userProject'}
            component={TextFieldArray}
            type={'text'}
            button={'Добавить нового участника'}
          />
        </Box>

        <ButtonWithImage
          type="submit"
          variant={'large'}
          size={'medium'}
          children={'Сохранить настройки'}
          leftIcon={SvgSave()}
          mr={9}
          disabled={pristine || submitting || invalid}
          width={'100%'}
          widthIcon={'16px'}
        />
      </Form>
    );
  }
}

ProjectSettings = reduxForm({
  form: 'ProjectSettings',
})(ProjectSettings);

export default ProjectSettings;
