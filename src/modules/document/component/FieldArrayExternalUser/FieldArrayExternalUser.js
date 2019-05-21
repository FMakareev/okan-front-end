import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**View */
import Flex from '@lib/ui/Flex/Flex';
import Box from '@lib/ui/Box/Box';

/** Styles property */
import { ButtonWithImage } from '@lib/ui/ButtonWithImage/ButtonWithImage';
import { SvgSidebarDelete } from '@lib/ui/Icons/SvgSidebarDelete';
import { ButtonBase } from '@lib/ui/ButtonBase/ButtonBase';
import { ROLE_EXTERNALCONTRACTOR } from '@lib/shared/roles';
import CreateContractorHelpers from '../helpers/CreateContractorHelpers';
import AddContractorButton from "../AddContractorButton/AddContractorButton";

/** Внутренние согласующие ОКАН*/
export class FieldArrayExternalUser extends Component {
  static propTypes = {
    /** Data  */
    data: PropTypes.element,
  };

  static defaultProps = {
    options: [],
  };

  render() {
    const { fields } = this.props;

    return (
      <Box mb={'100px'}>
        {fields.map((member, index) => (
          <Flex key={`FieldArrayExternalUser-${fields.name}-${index}`} mb={6}>
            {CreateContractorHelpers(member)}
            <Box pl={6}>
              <ButtonWithImage
                type={'button'}
                title={'Удалить контрагента'}
                p={'4px'}
                fontSize={'20px'}
                onClick={() => fields.remove(index)}
                variant={'outlineGray'}>
                <SvgSidebarDelete />
              </ButtonWithImage>
            </Box>
          </Flex>
        ))}
        <AddContractorButton
          onChange={(role)=>{
            fields.push({
              user: {
                role: {
                  name: role,
                },
              },
            });
          }}
        />
        <ButtonBase
          type={'button'}
          variant={'large'}
          size={'medium'}
          width={'100%'}
          onClick={() => {
            fields.push({
              user: {
                role: {
                  name: ROLE_EXTERNALCONTRACTOR,
                },
              },
            });
          }}>
          Добавить контрагента
        </ButtonBase>
      </Box>
    );
  }
}

export default FieldArrayExternalUser;
