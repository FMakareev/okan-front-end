import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**View */
import Flex from '@lib/ui/Flex/Flex';
import Box from '@lib/ui/Box/Box';

/** Styles property */
import {ButtonWithImage} from '@lib/ui/ButtonWithImage/ButtonWithImage';
import {SvgSidebarDelete} from '@lib/ui/Icons/SvgSidebarDelete';
import {ButtonBase} from '@lib/ui/ButtonBase/ButtonBase';
import {ROLE_EXTERNALCONTRACTOR, ROLE_USER} from '@lib/shared/roles';
import CreateContractorHelpers from '../helpers/CreateContractorHelpers';
import AddContractorButton from "../AddContractorButton/AddContractorButton";
import CreateContractor from "../CreateContractor/CreateContractor";
import {SelectContractorFromInnerUserList} from "../SelectContractorFromInnerUserList/SelectContractorFromInnerUserList";
import {Field} from "redux-form";
import {required} from "@lib/utils";

/** Внутренние согласующие ОКАН*/
export class ExternalAndInternalApprovalUser extends Component {
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
        {fields.map((member, index) => {

          const {user} = fields.get(index);

          if (user && user.role.name === ROLE_EXTERNALCONTRACTOR) {
            return (
              <Flex key={`FieldArrayExternalUser-${fields.name}-${index}`} mb={6}>
                <CreateContractor
                  names={CreateContractorHelpers(member)}
                />
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
              </Flex>
            )
          } else if(typeof user === 'string' || user && user.role.name === ROLE_USER) {
            return (
              <Flex key={`FieldArrayExternalUser-${fields.name}-${index}`} mb={6}>
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
              </Flex>
            )
          }


        })}
        <AddContractorButton
          onChange={(role) => {
            fields.push({
              user: {
                role: {
                  name: role,
                },
              },
            });
          }}
        />
      </Box>
    );
  }
}

export default ExternalAndInternalApprovalUser;
