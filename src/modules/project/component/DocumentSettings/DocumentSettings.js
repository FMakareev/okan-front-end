import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/**View */
import Flex from '../../../../components/Flex/Flex';
import Text from '../../../../components/Text/Text';
import Box from '../../../../components/Box/Box';
import CheckboxBase from '../../../../components/CheckboxBase/CheckboxBase';
import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';

/**Image */
import { SvgSave } from '../../../../components/Icons/SvgSave';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';
import FontSizeProperty from '../../../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../../../styles/styleProperty/LineHeightProperty';

const FlexStyled = styled(Flex)`
  border-top: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color7' })};
  padding-bottom: 12px;
`;

const BoxStyled = styled(Box)`
  input {
    ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
    ${props => FontSizeProperty({ ...props, fontSize: 6 })};
    ${props => LineHeightProperty({ ...props, lineHeight: 8 })};
    padding: 3px 7px;
    border: 0;
    text-align: center;
  }

  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
`;

export class DocumentSettings extends Component {
 
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
        <Box mb={'100px'}>
          <Text
            fontSize={6}
            lineHeight={8}
            color={'color7'}
            textAlign={'center'}
            mb={6}
            fontFamily={'primary500'}>
            Участники проекта
          </Text>

          <FlexStyled pt={3}>
            <Field name="documentSetting" component={CheckboxBase} type="text" />

            <Text fontFamily={'primary300'} fontSize={6} lineHeight={8} color={'color11'} ml={20}>
              Циалковский Святослав Валентинович
            </Text>
          </FlexStyled>

          <FlexStyled pt={3}>
            <Field name="documentSetting1" component={CheckboxBase} type="text" />

            <Text fontFamily={'primary300'} fontSize={6} lineHeight={8} color={'color11'} ml={20}>
              Циалковский Святослав Валентинович
            </Text>
          </FlexStyled>
        </Box>

        <Box>
          <Text
            fontSize={6}
            lineHeight={8}
            color={'color7'}
            textAlign={'center'}
            mb={6}
            fontFamily={'primary500'}>
            Название документа
          </Text>

          <BoxStyled mb={4}>
            <Field
              name="documentSetting2"
              component={TextFieldBase}
              type="text"
              values={'ТЗ - RK-186-344'}
              fontFamily={'secondary'} 
            />
          </BoxStyled>
          <BoxStyled mb={4}>
            <Field
              name="documentSetting3"
              component={TextFieldBase}
              type="text"
              placeholder={'Код документа ОКАН'}
              fontFamily={'secondary'} 
            />
          </BoxStyled>
          <BoxStyled mb={'180px'}>
            <Field
              name="documentSetting4"
              component={TextFieldBase}
              type="text"
              placeholder={'Код документа заказчика'}
              fontFamily={'secondary'} 
            />
          </BoxStyled>
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

DocumentSettings = reduxForm({
  form: 'DocumentSettings',
})(DocumentSettings);

export default DocumentSettings;
