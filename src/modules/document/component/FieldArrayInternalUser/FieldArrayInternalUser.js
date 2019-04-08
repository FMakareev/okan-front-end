import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';

/**View */
import Flex from '@lib/ui/Flex/Flex';
import Box from '@lib/ui/Box/Box';

/** Styles property */
import {ButtonWithImage} from "@lib/ui/ButtonWithImage/ButtonWithImage";
import {SvgSidebarDelete} from "@lib/ui/Icons/SvgSidebarDelete";
import {SelectContractorFromInnerUserList} from "../SelectContractorFromInnerUserList/SelectContractorFromInnerUserList";
import {ButtonBase} from "@lib/ui/ButtonBase/ButtonBase";
import required from "@lib/utils/validation/required";


/** Внутренние согласующие ОКАН*/
export class FieldArrayInternalUser extends Component {
  static propTypes = {
    /** Data  */
    data: PropTypes.element,
  };

  static defaultProps = {
    options: [],
  };

  render() {
    const {fields} = this.props;
    return (
      <Box mb={'100px'}>
        {
          fields.map((member, index) => (<Flex key={`FieldArrayInternalUser-${fields.name}-${index}`} mb={6}>
            <Box width={'100%'}>
              <Field
                name={member}
                component={SelectContractorFromInnerUserList}
                validate={[required]}
              />
            </Box>
            <Box pl={6}>
              <ButtonWithImage
                type={'button'}
                title={'Удалить контрагента'}
                p={'4px'}
                fontSize={'20px'}
                onClick={() => fields.remove(index)}
                variant={'outlineGray'}>
                <SvgSidebarDelete/>
              </ButtonWithImage>
            </Box>
          </Flex>))
        }
        <ButtonBase
          type={'button'}
          variant={'large'}
          size={'medium'}
          width={'100%'}
          onClick={() => {
            fields.push(null);
          }}
        >
          Добавить контрагента
        </ButtonBase>

      </Box>
    );
  }
}

export default FieldArrayInternalUser;
