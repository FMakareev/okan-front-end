import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/**View */
import Flex from '../../../../components/Flex/Flex';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
import Text from '../../../../components/Text/Text';
import Box from '../../../../components/Box/Box';
import CheckboxBase from '../../../../components/CheckboxBase/CheckboxBase';
import TextFieldWithMessage from '../../../../components/TextFieldWithMessage/TextFieldWithMessage';

const FlexStyled = styled(Flex)`
  border-top: 1px solid #00649c;
  padding-bottom: 12px;
`;

const BoxStyled = styled(Box)`
  input {
    border-radius: 5px;
    text-align: center;
    font-size: 18px;
    line-height: 24px;
    padding: 3px;
    border: 0;
  }
  border-radius: 5px;
  border: 1px solid #848484;
`;

export class DocumentSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Box>
        <Box mb={'100px'}>
          <Text
            fz={6}
            lh={7}
            color={'color7'}
            textAlign={'center'}
            mb={6}
            fontFamily={'primary500'}>
            Участники проекта
          </Text>

          <FlexStyled pt={3}>
            <Field name="documentSetting" component={CheckboxBase} type="text" />

            <Text fontFamily={'primary300'} fontSize={6} lineHeight={9} color={'color11'} ml={20}>
              Циалковский Святослав Валентинович
            </Text>
          </FlexStyled>

          <FlexStyled pt={3}>
            <Field name="documentSetting1" component={CheckboxBase} type="text" />

            <Text fontFamily={'primary300'} fontSize={6} lineHeight={9} color={'color11'} ml={20}>
              Циалковский Святослав Валентинович
            </Text>
          </FlexStyled>
        </Box>
        <Box>
          <Text
            fz={6}
            lh={7}
            color={'color7'}
            textAlign={'center'}
            mb={6}
            fontFamily={'primary500'}>
            Название документа
          </Text>

          <BoxStyled mb={4}>
            <Field
              name="documentSetting2"
              component={TextFieldWithMessage}
              type="text"
              values={'ТЗ - RK-186-344'}
            />
          </BoxStyled>
          <BoxStyled mb={4}>
            <Field
              name="documentSetting3"
              component={TextFieldWithMessage}
              type="text"
              placeholder={'Код документа ОКАН'}
            />
          </BoxStyled>
          <BoxStyled>
            <Field
              name="documentSetting4"
              component={TextFieldWithMessage}
              type="text"
              placeholder={'Код документа заказчика'}
            />
          </BoxStyled>
        </Box>
      </Box>
    );
  }
}

DocumentSettings = reduxForm({
  form: 'DocumentSettings',
})(DocumentSettings);

export default DocumentSettings;
