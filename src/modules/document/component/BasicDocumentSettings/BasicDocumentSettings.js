import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

/**View */
import Text from '@lib/ui/Text/Text';
import Box from '@lib/ui/Box/Box';
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';

/** CSS style in other Component */
import { BoxStyled } from '../../../project/component/FormProjectCreate/FormProjectCreate';

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
        <Text variant={'documentTitle'} mb={6}>
          Параметры документа
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
