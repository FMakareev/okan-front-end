import React, {Component} from 'react';
import {withApollo} from "react-apollo";
import {Field, getFormValues} from "redux-form";
import {Box} from "@lib/ui/Box/Box";
import AddContractorButton from "../AddContractorButton/AddContractorButton";
import CreateContractor from "../CreateContractor/CreateContractor";
import {ROLE_EXTERNALCONTRACTOR, ROLE_USER} from "@lib/shared/roles";
import {Flex} from "@lib/ui/Flex/Flex";
import {SvgSidebarDelete} from "@lib/ui/Icons/SvgSidebarDelete";
import {SelectContractorFromInnerUserList} from "../SelectContractorFromInnerUserList/SelectContractorFromInnerUserList";
import required from "@lib/utils/validation/required";
import DayPickerField from "@lib/ui/DayPickerField/DayPickerField";
import DeleteContractorMutation from './DeleteContractorMutation.graphql';
import {ButtonWithImage} from "@lib/ui/ButtonWithImage/ButtonWithImage";
import {error, success} from "react-notification-system-redux";
import {connect} from "react-redux";
import {TextFieldFirstWrapper} from "@lib/ui/TextFieldFirstWrapper/TextFieldFirstWrapper";
import {TextFieldLastWrapper} from "@lib/ui/TextFieldLastWrapper/TextFieldLastWrapper";

export class ContractorListField extends Component {


  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      loadingRemove: false,
    }
  }

  removeContractorApprovalMutation = (id) => {
    const {client} = this.props;
    return client.mutate({
      mutation: DeleteContractorMutation,
      variables: {
        id: id,
      }
    });
  };

  loadingRemoveToggle = () => {
    this.setState((state) => ({
      loadingRemove: !state.loadingRemove
    }));
  };

  /**
   * @param {object} contractor
   * @param {function} callBack
   * */
  removeContractorApprovalFromField = async (contractor, callBack) => {
    console.log('removeContractorApprovalFromField: ',contractor, callBack);
    this.loadingRemoveToggle();
    // TODO: тут метод для удаления пользователя
    // TODO: добавить уведомление
    const response = await this.removeContractorApprovalMutation(contractor.id);
    console.log('removeContractorApprovalFromField: ',response);
    this.loadingRemoveToggle();

    if (typeof callBack === 'function') {
      callBack();
    }
  };

  optionsUserFilter = (options) => {
    try {
      const {fields, values, compareUsers} = this.props;
      let v = Object.entries(values).filter(([key]) => {
        if (compareUsers.findIndex(item => item === key) >= 0) {
          return values[key];
        }
      }).map(([key, value]) => value);

      let newOptions = Object.assign([], options);

      v.forEach(item => {
        newOptions = newOptions.filter(option => {
          return !(item.findIndex(value => value.user.id ? value.user.id === option.id : false) >= 0);
        });
      });

      return newOptions
    } catch (error) {
      console.error('Error: ', error);
      return options;
    }
  }

  render() {
    const {fields, values, compareUsers} = this.props;
    const {loadingRemove} = this.state;
    console.log(this.props);
    return (<Box>
      {
        fields.map((member, index) => {
          if (fields.get(index).user.role.name === ROLE_USER) {
            return (<Flex mb={6}>
              <Box width={'100%'}>
                <TextFieldFirstWrapper>
                  <Field
                    name={member + '.user.id'}
                    variant={'firstField'}
                    component={SelectContractorFromInnerUserList}
                    optionsFilter={this.optionsUserFilter}
                  />
                </TextFieldFirstWrapper>
                <TextFieldLastWrapper>
                  <Field
                    name={member + ".approvaldate"}
                    component={DayPickerField}
                    placeholder={'Дата'}
                    type={"text"}
                    size={'sm'}
                    fontFamily={'secondary'}
                    validate={required}
                  />
                </TextFieldLastWrapper>
              </Box>
              <Box pl={6}>
                <ButtonWithImage
                  isLoading={loadingRemove}
                  disabled={loadingRemove}
                  type={'button'}
                  title={'Удалить контрагента'}
                  p={'4px'}
                  fontSize={'20px'}
                  onClick={() => this.removeContractorApprovalFromField(fields.get(index), () => fields.remove(index))}
                  variant={'outlineGray'}>
                  <SvgSidebarDelete/>
                </ButtonWithImage>
              </Box>
            </Flex>)
          } else if (fields.get(index).user.role.name === ROLE_EXTERNALCONTRACTOR) {
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
                <ButtonWithImage
                  isLoading={loadingRemove}
                  disabled={loadingRemove}
                  type={'button'}
                  title={'Удалить контрагента'}
                  p={'4px'}
                  fontSize={'20px'}
                  onClick={() => this.removeContractorApprovalFromField(fields.get(index), () => fields.remove(index))}
                  variant={'outlineGray'}>
                  <SvgSidebarDelete/>
                </ButtonWithImage>
              </Box>
            </Flex>)
          }
        })
      }


      <AddContractorButton
        onChange={(value) => {
          fields.push({
            user: {
              role: {
                name: value,
              },
            }
          });
        }}
      />
    </Box>)
  }
}

ContractorListField = withApollo(ContractorListField);

ContractorListField = connect(
  state => ({
    values: getFormValues('FormDocumentSettings')(state),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(ContractorListField);

export default ContractorListField;
