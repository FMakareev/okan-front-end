import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Field} from 'redux-form';

/**View */
import Text from '@lib/ui/Text/Text';
import Box from '@lib/ui/Box/Box';
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';
import FontSizeProperty from '../../../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../../../styles/styleProperty/LineHeightProperty';

const BoxStyled = styled(Box)`
  input {
    ${props => BorderRadiusProperty({...props, borderRadius: '5px'})};
    ${props => FontSizeProperty({...props, fontSize: 6})};
    ${props => LineHeightProperty({...props, lineHeight: 8})};
    padding: 3px 7px;
    border: 0;
    text-align: center;
  }

  border: 1px solid;
  ${props => BorderColorProperty({...props, borderColor: 'color4'})};
  ${props => BorderRadiusProperty({...props, borderRadius: '5px'})};
`;

export class BasicDocumentSettings extends Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.name.input.value !== this.props.name.input.value) {
      return true;
    } else if (nextProps.equipmentname.input.value !== this.props.equipmentname.input.value) {
      return true;
    } else if (nextProps.okancode.input.value !== this.props.okancode.input.value) {
      return true;
    } else if (nextProps.customercode.input.value !== this.props.customercode.input.value) {
      return true;
    }
    return false;
  }

  render() {

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
            {...this.props.name.input}
            component={TextFieldWithTooltip}
            type="text"
            placeholder={'Название документа'}
            fontFamily={'secondary'}
          />
        </BoxStyled>
        <BoxStyled mb={4}>
          <Field
            {...this.props.equipmentname.input}
            component={TextFieldWithTooltip}
            type="text"
            placeholder={'Наименование оборудования'}
            fontFamily={'secondary'}
          />
        </BoxStyled>
        <BoxStyled mb={4}>
          <Field
            {...this.props.okancode.input}
            component={TextFieldWithTooltip}
            type="text"
            placeholder={'Код документа ОКАН'}
            fontFamily={'secondary'}
          />
        </BoxStyled>
        <BoxStyled>
          <Field
            {...this.props.customercode.input}
            component={TextFieldWithTooltip}
            type="text"
            placeholder={'Код документа заказчика'}
            fontFamily={'secondary'}
          />
        </BoxStyled>
      </Box>
    );
  }
}


BasicDocumentSettings.propTypes = {
  customercode: PropTypes.object,
  okancode: PropTypes.object,
  name: PropTypes.object,
  equipmentname: PropTypes.object,
};

export default BasicDocumentSettings;
