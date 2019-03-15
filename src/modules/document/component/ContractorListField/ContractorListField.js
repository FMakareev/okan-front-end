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

const ContractorListFieldNotificationList = () => ({
  success: {
    title: 'Настройки проекта успешно обновлены',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Ошибка',
    message: 'Удаление пользователя не было выполнено, попробуйте перезагрузит страницу если это не поможет обратитесь в поддержку.',
    position: 'tr',
    autoDismiss: 5,
  },
});

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
      fetchPolicy: 'no-cache',
      variables: {
        id: id,
      }
    }).catch(error => {
      return error;
    })
  };

  /**
   * @desc метод для изменения статуса прелоатера
   * */
  loadingRemoveToggle = () => {
    this.setState((state) => ({
      loadingRemove: !state.loadingRemove
    }));
  };

  /**
   * @param {object} contractor
   * @param {string} contractor.id
   * @param {object} contractor.user
   * @param {function} callBack метод который будет вызван после выполнения асинхронного запроса
   * @desc метод для удаления ContractorApproval из документа
   * */
  removeContractorApprovalFromField = async (contractor, callBack) => {
    const {setNotificationError} = this.props;
    /** если есть id значит ContractorApproval создан в БД */
    if (contractor.id) {
      this.loadingRemoveToggle();
      const response = await this.removeContractorApprovalMutation(contractor.id);
      this.loadingRemoveToggle();

      if (response && response.message) {
        setNotificationError(ContractorListFieldNotificationList().error);
        return null;
      }
    }

    if (typeof callBack === 'function') {
      callBack();
    }
  };

  /**
   * @params {Array) options массив пользователей
   * @params {Array) options[i].id пользователя
   * @params {Array) values - объект redux-form формы
   * @params {Array) compareUsers - массив названий свойств из объекта формы которые будут использованы во время фильтрации опций
   * @params {String) compareUsers[i]
   * @return {Array}
   * @desc метод для удаления из массива опций пользователей которые уже были выбранны в одном из указанных
   * в свойстве compareUsers  элементов формы
   * */
  userListFilterByFormFields = (options, values, compareUsers) => {
    try {

      /** ищем в объекте формы свойства по которым будет фильтроватся options */
      let listOfSelectedUsers = Object.entries(values).filter(([key]) => {
        if (compareUsers.findIndex(item => item === key) >= 0) {
          return values[key];
        }
      }).map(([key, value]) => value);

      let updatedListOfOptions = Object.assign([], options);

      listOfSelectedUsers.forEach(item => {
        updatedListOfOptions = updatedListOfOptions.filter(option => {
          return !(item.findIndex(value => value.user.id ? value.user.id === option.id : false) >= 0);
        });
      });

      return updatedListOfOptions
    } catch (error) {
      console.error('Error: ', error);
      return options;
    }
  };


  /**
   * @param {array} options
   * @param {array} roles
   * @return {Array}
   * @desc
   * */
  userListFilterByRole = (options = [], roles = []) => {
    if (roles.length && options.length) {
      return options.filter(user => !roles.find(role => user.role ? role === user.role.name : true))
    } else {
      return [];
    }
  };

  render() {
    const {fields, values, compareUsers} = this.props;
    const {loadingRemove} = this.state;

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
                    optionsFilter={(options) => this.userListFilterByFormFields(this.userListFilterByRole(options, ['admin']), values, compareUsers)}
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
