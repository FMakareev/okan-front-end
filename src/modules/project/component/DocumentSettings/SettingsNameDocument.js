import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

/**View */
import Text from '../../../../components/Text/Text';
import Box from '../../../../components/Box/Box';
import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';
import FontSizeProperty from '../../../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../../../styles/styleProperty/LineHeightProperty';

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

export const SettingsNameDocument = () => {
  return (
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
  );
};

SettingsNameDocument.propTypes = {};

export default SettingsNameDocument;
