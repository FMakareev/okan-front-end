import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import {success, error} from 'react-notification-system-redux';
import {Fields, reduxForm, SubmissionError, Form, getFormValues, FieldArray} from 'redux-form';
import { withRouter} from 'react-router-dom';
import {has} from '../../../../utils/has';
/**PropTypes */
import {ReactRoutePropTypes} from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import Box from '@lib/ui/Box/Box';
import Flex from '@lib/ui/Flex/Flex';
import Container from '@lib/ui/Container/Container';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';

/**Image */
import {SvgSave} from '@lib/ui/Icons/SvgSave';

/** Components */
import BasicDocumentSettings from '../BasicDocumentSettings/BasicDocumentSettings';

/** Graphql schema */
import FormDocumentSettingsMutation from './FormDocumentSettingsMutation.graphql';
import DocumentItemQuery from '../../view/documentSettings/DocumentItemQuery.graphql';
import InnerApprovalPartnersQuery from "../InnerApprovalPartnersQuery/InnerApprovalPartnersQuery";
import ContractorListField from "../ContractorListField/ContractorListField";
import {Text} from "@lib/ui/Text/Text";
import {ROLE_EXTERNALCONTRACTOR, ROLE_USER} from "@lib/shared/roles";

const notificationOpts = () => ({
  success: {
    title: 'Настройки проекта успешно обновлены',
    message: 'Настройки проекта успешно обновлены',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Настройки проекта не обновлены',
    message: 'Настройки проекта не обновлены',
    position: 'tr',
    autoDismiss: 2,
  },
});


export class FormDocumentSettings extends Component {
  static propTypes = {...ReactRoutePropTypes};

  state = this.initialState;

  get initialState() {
    return {redirect: null};
  }

  /**
   * @param {object} value
   * @param {string} value.user.firstname
   * @param {string} value.user.lastname
   * @param {string} value.user.patronymic
   * @param {string} value.user.organizationname
   * @param {string} value.user.position
   * @param {string} value.user.signature
   * @param {string} value.user.role
   * @param {string} value.approvaldate
   * @return {object} возвращает структуру gql типа ContractorApproval
   * @desc метод для преобразования данных к типу ContractorApproval
   * */
  createContractorApproval = (value) => {
    try {
      return {
        id: value.user.id,
        approvaldate: value.approvaldate,
      }
    } catch (error) {
      console.error('Error createContractorApproval: ', error);
      return null;
    }
  };

  /**
   * @param {object} value
   * @param {string} value.firstname
   * @param {string} value.lastname
   * @param {string} value.patronymic
   * @param {string} value.organizationname
   * @param {string} value.position
   * @param {string} value.approvaldate
   * @param {string} value.signature
   * @param {string} value.role
   * @return {Promise}
   * @desc метод для создания пользователя
   * */
  createUser = (value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({
          message: 'ОШИБКА!!!!!!!!!!!'
        })
        // resolve({
        //   createuser: {
        //     user: {
        //       ...value,
        //       id: 'айдишник'
        //     }
        //   }
        // })
      }, 2000);
    })
  };

  /**
   * @param {object} value
   * @param {string} value.id
   * @param {string} value.firstname
   * @param {string} value.lastname
   * @param {string} value.patronymic
   * @param {string} value.organizationname
   * @param {string} value.position
   * @param {string} value.approvaldate
   * @param {string} value.signature
   * @param {string} value.role
   * @return {Promise}
   * @desc метод для обновления пользователя
   * */
  updateUser = (value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          updateuser: {
            user: {
              ...value,
              id: 'айдишник'
            }
          }
        })
      }, 2000);
    })
  };


  /**
   * @param {array} value
   * @param {object} value[i].user
   * @param {string} value[i].approvaldate
   * @return {Promise}
   * @desc метод для преобразования данных из формы к типу ContractorApproval
   * */
  createContractorApprovalList = async (value) => {
    try {
      return await value.map(async (item) => {

        if (item.user.role === ROLE_EXTERNALCONTRACTOR) { /** если это внешний контрагент */
          if (has.call(item.user, 'id')) {
            /** обновляем пользователя */
            const {updateuser} = await this.updateUser(item.user);
            return this.createContractorApproval({
              ...item,
              ...updateuser,
            });
          } else { /** пользователь системы */
            /** создаем пользователя */
            const {createuser} = await this.createUser(item.user);
            return this.createContractorApproval({
              ...item,
              ...createuser,
            });
          }
        } else if (item.user.role === ROLE_USER) {
          /** если это внутренний пользователь системы */
          return this.createContractorApproval(item);
        }
      })
    } catch (error) {
      console.error('Error createContractorApprovalList: ', error);
    }
  };

  /**
   * @param {object} value
   * @param {array} value.externalapprove
   * @param {array} value.externalconform
   * @return {Promise}
   * @desc метод для преобразования данные формы к виду массивов gql типов ContractorApproval
   * */
  transformDocumentApproval = async (value) => {
    try {
      const newDate = {
        externalapprove: [],
        externalconform: []
      };
      if (has.call(value, 'externalapprove') && Array.isArray(value.externalapprove)) {
        newDate.externalapprove = await this.createContractorApprovalList(value.externalapprove)
      }
      if (has.call(value, 'externalconform') && Array.isArray(value.externalconform)) {
        newDate.externalconform = await  this.createContractorApprovalList(value.externalconform)
      }
      console.log('newDate: ', newDate);

      /** резолвим промисы */
      if(newDate.externalapprove.length){
        newDate.externalapprove = await Promise.all(newDate.externalapprove)
      }
      if(newDate.externalconform.length){
        newDate.externalconform = await Promise.all(newDate.externalconform)
      }

      console.log('newDate: ', newDate);
      return newDate;
    } catch (error) {
      console.error('Error transformDocumentApproval: ', error);
      return error;
    }
  };

  /**
   * @param {object} value
   * @param {array} value.externalapprove
   * @param {array} value.externalconform
   * @param {array} value.partners
   * @param {string} value.name
   * @param {string} value.customercode
   * @param {string} value.okancode
   * @param {string} value.okancode
   * @return {Promise}
   * @desc обновляем документ, тут собрано несколько последовательно выполняющийся методов
   * */
  updateDocument = async value => {
    const {setNotificationError, setNotificationSuccess, history} = this.props;

    const documentApproval = await this.transformDocumentApproval(value);
    console.log('documentApproval:', documentApproval);

    if(documentApproval.message){
      setNotificationError(notificationOpts().error);
      throw new SubmissionError({_error: documentApproval.message});
    }

    const options = {
      variables: Object.assign({}, value, documentApproval),
      update: (store, response) => {
        try {
          const {
            data: {updatedocument},
          } = response;

          const data = store.readQuery({query: DocumentItemQuery});

          data.documentitem.push(updatedocument.document);

          store.writeQuery({query: DocumentItemQuery, data});
        } catch (e) {
          console.error('Error in FormProjectCreate, method updateDocument : ', e);
        }
      },
    };
    console.log('updateDocument', options);

    return this.props['@apollo/update'](options)
      .then(response => {
        setNotificationSuccess(notificationOpts().success);
        history.push(`/app/project/${options.variables.project}`);
        return response;
      })
      .catch(({graphQLErrors, message, networkError, ...rest}) => {
        console.log('graphQLErrors: ', graphQLErrors);
        console.log('message: ', message);
        console.log('networkError: ', networkError);
        console.log('rest: ', rest);
        setNotificationError(notificationOpts().error);
        throw new SubmissionError({_error: message});
      });
  };

  render() {
    const {
      handleSubmit,
      submitting,
      invalid,
      initialValues: {project},
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.updateDocument)}>
        <Flex mt={9} mb={'200px'} justifyContent={'space-around'}>
          <Box width={'50%'}>
            <Container maxWidth={'500px'} width={'100%'}>
              <InnerApprovalPartnersQuery
                name={'partners'}
                projectid={project}
              />
            </Container>

            <Container maxWidth={'500px'} width={'100%'}>
              <Fields
                names={['name', 'customercode', 'okancode', 'equipmentname']}
                component={BasicDocumentSettings}
              />
            </Container>
          </Box>
          <Box width={'50%'}>

            <Container mb={9} maxWidth={'500px'} width={'100%'}>
              <Text
                fontSize={6}
                lineHeight={8}
                color={'color7'}
                textAlign={'center'}
                mb={6}
                fontFamily={'primary500'}>
                Утверждающие документа
              </Text>
              <FieldArray
                name="externalapprove"
                component={ContractorListField}
              />
            </Container>

            <Container maxWidth={'500px'} width={'100%'}>

              <Text
                fontSize={6}
                lineHeight={8}
                color={'color7'}
                textAlign={'center'}
                mb={6}
                fontFamily={'primary500'}>
                Внешние согласующие документа
              </Text>
              <FieldArray
                name="externalconform"
                component={ContractorListField}
              />
            </Container>
          </Box>
        </Flex>

        <Flex justifyContent={'center'}>
          <ButtonWithImage
            type="submit"
            variant={'large'}
            size={'medium'}
            children={'Сохранить настройки'}
            leftIcon={SvgSave()}
            mr={9}
            disabled={submitting || invalid}
            width={'500px'}
            widthIcon={'16px'}
          />
        </Flex>
      </Form>
    );
  }
}

FormDocumentSettings = graphql(FormDocumentSettingsMutation, {
  name: '@apollo/update',
})(FormDocumentSettings);

FormDocumentSettings = connect(
  state => {
    return {values: getFormValues('FormDocumentSettings')(state)};
  },
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormDocumentSettings);

FormDocumentSettings = reduxForm({
  form: 'FormDocumentSettings',
})(FormDocumentSettings);
FormDocumentSettings = withRouter(FormDocumentSettings)
export default FormDocumentSettings;
