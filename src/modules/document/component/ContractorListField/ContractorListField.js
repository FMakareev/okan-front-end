import React, {Component} from 'react';
import {Box} from "@lib/ui/Box/Box";
import {Field} from "redux-form";
import AddContractorButton from "../AddContractorButton/AddContractorButton";
import CreateContractor from "../CreateContractor/CreateContractor";
import {ROLE_EXTERNALCONTRACTOR, ROLE_USER} from "@lib/shared/roles";
import {Flex} from "@lib/ui/Flex/Flex";
import {ButtonBase} from "@lib/ui/ButtonBase/ButtonBase";
import {SvgSidebarDelete} from "@lib/ui/Icons/SvgSidebarDelete";
import {SelectContractorFromInnerUserList} from "../SelectContractorFromInnerUserList/SelectContractorFromInnerUserList";
import required from "@lib/utils/validation/required";
import DayPickerField from "@lib/ui/DayPickerField/DayPickerField";


export class ContractorListField extends Component {

  render() {
    const {fields} = this.props;
    console.log(this.props);
    return (<Box>


      {
        fields.map((member, index) => {
          if (fields.get(index).user.role === ROLE_USER) {
            return (<Flex mb={6}>
              <Box width={'100%'}>
                <Field
                  name={member + '.user.id'}
                  component={SelectContractorFromInnerUserList}
                />
                <Field
                  name={member + ".approvaldate"}
                  component={DayPickerField}
                  placeholder={'Дата'}
                  type={"text"}
                  size={'md'}
                  fontFamily={'secondary'}
                  validate={required}
                />
              </Box>
              <Box pl={6}>
                <ButtonBase
                  type={'button'}
                  title={'Удалить контрагента'}
                  p={'4px'}
                  fontSize={'20px'}
                  onClick={() => fields.remove(index)}
                  variant={'outlineGray'}>
                  <SvgSidebarDelete/>
                </ButtonBase>
              </Box>
            </Flex>)
          } else if (fields.get(index).user.role === ROLE_EXTERNALCONTRACTOR) {
            return (<Flex mb={6}>
              <Box width={'100%'}>
                <CreateContractor
                  names={[
                    member + '.user.organizationname',
                    member + '.user.position',
                    member + '.user.firstname',
                    member + '.user.lastname',
                    member + '.user.patronymic',
                    member + '.approvaldate',
                    member + '.user.signature',
                  ]}
                  name={member + '.user.'}
                />
              </Box>
              <Box pl={6}>
                <ButtonBase
                  type={'button'}
                  title={'Удалить контрагента'}
                  p={'4px'}
                  fontSize={'20px'}
                  onClick={() => fields.remove(index)}
                  variant={'outlineGray'}>
                  <SvgSidebarDelete/>
                </ButtonBase>
              </Box>
            </Flex>)
          }
        })
      }


      <AddContractorButton
        onChange={(value) => {
          fields.push({
            user: {
              role: value,
            }
          });
        }}
      />
    </Box>)
  }
}

export default ContractorListField;
