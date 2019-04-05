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
import {CreateContractor} from "../CreateContractor/CreateContractor";
import {ROLE_EXTERNALCONTRACTOR} from "@lib/shared/roles";


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
    const {fields} = this.props;
    console.log(fields);
    return (
      <Box mb={'100px'}>
        {
          fields.map((member, index) => (<Flex key={`FieldArrayExternalUser-${fields.name}-${index}`} mb={6}>
            <Box width={'100%'}>
              <CreateContractor
                names={{
                  organizationname: member + '.user.organizationname',
                  position: member + '.user.position',
                  firstname: member + '.user.firstname',
                  lastname: member + '.user.lastname',
                  patronymic: member + '.user.patronymic',
                  approvaldate: member + '.approvaldate',
                  signature: member + '.user.signature',
                }}
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
            fields.push({
              user: {
                role: {
                  name: ROLE_EXTERNALCONTRACTOR,
                },
              }
            });
          }}
        >
          Добавить контрагента
        </ButtonBase>

      </Box>
    );
  }
}

export default FieldArrayExternalUser;
