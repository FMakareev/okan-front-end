import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, withApollo} from 'react-apollo';
import {success, error} from 'react-notification-system-redux';
import {Fields, reduxForm, SubmissionError, Form, getFormValues, FieldArray} from 'redux-form';
import {withRouter} from 'react-router-dom';
import {has} from '../../../../utils/has';
/**PropTypes */
import {ReactRoutePropTypes} from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import Box from '@lib/ui/Box/Box';
import Flex from '@lib/ui/Flex/Flex';
import Container from '@lib/ui/Container/Container';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';


/** Components */
import BasicDocumentSettings from '../BasicDocumentSettings/BasicDocumentSettings';
import ContractorListField from "../ContractorListField/ContractorListField";
import {Text} from "@lib/ui/Text/Text";
import {SvgSave} from '@lib/ui/Icons/SvgSave';

/** Graphql schema */
import UpdateDocumentMutation from '../../graphql/UpdateDocumentMutation.graphql';
import DocumentItemQuery from '../../graphql/DocumentItemQuery.graphql';
import CreateContractorApprovalMutation from '../../graphql/CreateContractorApprovalMutation.graphql';
import UpdateContractorApprovalMutation from '../../graphql/UpdateContractorApprovalMutation.graphql';
import DeleteContractorMutation from '../../graphql/DeleteContractorMutation.graphql';
import FieldArrayInternalUser from "../FieldArrayInternalUser/FieldArrayInternalUser";
import {FieldArrayExternalUser} from "../FieldArrayExternalUser/FieldArrayExternalUser";

const notificationOpts = () => ({
  success: {
    title: 'Настройки проекта успешно обновлены',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Настройки проекта не обновлены',
    message: 'Во время обновления настроек возникла ошибка, попробуйте перезагрузит страницу если это не поможет обратитесь в поддержку.',
    position: 'tr',
    autoDismiss: 5,
  },
});


export class FormDocumentSettings extends Component {
  static propTypes = {...ReactRoutePropTypes};

  state = this.initialState;

  get initialState() {
    return {isLoading: false};
  }

  /**
   * @desc метод для изменения статуса прелоатера
   * */
  loadingToggle = () => {
    this.setState((state) => ({
      isLoading: !state.isLoading
    }));
  };

  /**
   * @param {object} value
   * @param {object} value.approvaldate
   * @param {string} value.user.firstname
   * @param {string} value.user.lastname
   * @param {string} value.user.patronymic
   * @param {string} value.user.organizationname
   * @param {string} value.user.position
   * @param {string} value.user.approvaldate
   * @param {string} value.user.signature
   * @param {string} value.user.role
   * @param {string} value.user.role.name
   * @return {Promise}
   * @desc
   * */
  submitCreateContractorApproval = (value) => {
    const variables = {
      approvaldate: value.approvaldate,
      userid: value.user.id,
      ...value.user,
      role: value.user.role.name,
    };
    // TODO: заменить заглушку на мутацию
    return this.props.client.mutate({
      mutation: CreateContractorApprovalMutation,
      variables
    })
  };


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
   * @param {array} nextContractors - новый список контракторов
   * @param {array} prevContractors - значения
   * @return {array}
   * @desc метод получает на вход новый список и старый, сравнивает их и выдает разницу между новым списком и старым
   * */
  getDeletedContractor = (nextContractors, prevContractors) => {
    try {
      let differenceBetweenThePreviousAndTheNext = [];

      prevContractors.forEach((prevContractor) => {
        let result = nextContractors.find(nextContractor => prevContractor.id === nextContractor.id)
        if (!result) {
          differenceBetweenThePreviousAndTheNext.push(prevContractor);
        }
      });
      return differenceBetweenThePreviousAndTheNext;
    } catch (error) {
      console.error('Error transformDocumentApproval: ', error);
      return error;
    }
  };

  createRequestListForRemoveContractorApproval = async (value) => {
    try {
      return await value.map(async (item) => {

        const {data: {deleteContractorApproval}} = await this.removeContractorApprovalMutation(item.id);

        return deleteContractorApproval;
      })
    } catch (error) {
      console.error('Error createContractorApprovalList: ', error);
    }
  };

  removeContractorApproval = async (value) => {
    try {
      const newDate = {
        externalAndInternalApprove: [],
        externalMatching: []
      };
      const promiseLists = {
        externalAndInternalApprove: [],
        externalMatching: []
      };

      if (has.call(value, 'externalAndInternalApprove') && Array.isArray(value.externalAndInternalApprove)) {
        newDate.externalAndInternalApprove = this.getDeletedContractor(value.externalAndInternalApprove, this.props.initialValues.externalAndInternalApprove);
        promiseLists.externalAndInternalApprove = await this.createRequestListForRemoveContractorApproval(newDate.externalAndInternalApprove)
      }
      if (has.call(value, 'externalMatching') && Array.isArray(value.externalMatching)) {
        newDate.externalMatching = this.getDeletedContractor(value.externalMatching, this.props.initialValues.externalMatching);
        promiseLists.externalMatching = await this.createRequestListForRemoveContractorApproval(newDate.externalMatching)
      }

      /** резолвим промисы */
      if (promiseLists.externalAndInternalApprove.length) {
        newDate.externalAndInternalApprove = await Promise.all(promiseLists.externalAndInternalApprove)
      }
      if (promiseLists.externalMatching.length) {
        newDate.externalMatching = await Promise.all(promiseLists.externalMatching)
      }
      return newDate;
    } catch (error) {
      console.error('Error removeContractorApproval: ', error);
      return error;
    }
  };

  /**
   * @param {object} value
   * @param {object} value.id
   * @param {object} value.approvaldate
   * @param {string} value.user.id
   * @param {string} value.user.firstname
   * @param {string} value.user.lastname
   * @param {string} value.user.patronymic
   * @param {string} value.user.organizationname
   * @param {string} value.user.position
   * @param {string} value.user.approvaldate
   * @param {string} value.user.signature
   * @param {string} value.user.role
   * @param {string} value.user.role.name
   * @return {Promise}
   * @desc
   * */
  submitUpdateContractorApproval = (value) => {
    const variables = {
      ...value.user,
      id: value.id,
      approvaldate: value.approvaldate,
      userid: value.user.id,
    };
    // TODO: заменить заглушку на мутацию
    return this.props.client.mutate({
      mutation: UpdateContractorApprovalMutation,
      variables
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
        let contractorapproval = {};

        /** создаем/обновляем объект ContractorApproval */
        if (has.call(item, 'id')) {
          const {data: {updatecontractorapproval}} = await this.submitUpdateContractorApproval(item);
          contractorapproval = updatecontractorapproval.contractorapproval;
        } else {
          const {data: {createcontractorapproval}} = await this.submitCreateContractorApproval(item);
          contractorapproval = createcontractorapproval.contractorapproval;
        }

        return contractorapproval.id;
      })
    } catch (error) {
      console.error('Error createContractorApprovalList: ', error);
    }
  };


  /**
   * @param {object} value
   * @param {array} value.externalAndInternalApprove
   * @param {array} value.externalMatching
   * @return {Promise}
   * @desc метод для преобразования данные формы к виду массивов gql типов ContractorApproval
   * */
  transformDocumentApproval = async (value) => {
    try {
      const newDate = {
        externalAndInternalApprove: [],
        externalMatching: []
      };
      if (has.call(value, 'externalAndInternalApprove') && Array.isArray(value.externalAndInternalApprove)) {
        newDate.externalAndInternalApprove = await this.createContractorApprovalList(value.externalAndInternalApprove)
      }
      if (has.call(value, 'externalMatching') && Array.isArray(value.externalMatching)) {
        newDate.externalMatching = await  this.createContractorApprovalList(value.externalMatching)
      }

      /** резолвим промисы */
      if (newDate.externalAndInternalApprove.length) {
        newDate.externalAndInternalApprove = await Promise.all(newDate.externalAndInternalApprove)
      }
      if (newDate.externalMatching.length) {
        newDate.externalMatching = await Promise.all(newDate.externalMatching)
      }

      return newDate;
    } catch (error) {
      console.error('Error transformDocumentApproval: ', error);
      return error;
    }
  };

  /**
   * @param {object} value
   * @param {array} value.externalAndInternalApprove
   * @param {array} value.externalMatching
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
    this.loadingToggle();
    const removeContractorApproval = await this.removeContractorApproval(value);
    if (removeContractorApproval.message) {
      setNotificationError(notificationOpts().error);
      throw new SubmissionError({_error: removeContractorApproval.message});
    }

    const documentApproval = await this.transformDocumentApproval(value);

    if (documentApproval.message) {
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
          const documentItemOptions = {
            query: DocumentItemQuery,
            variables: {
              id: updatedocument.document.id
            }
          };

          const documentItem = store.readQuery(documentItemOptions);

          documentItem.documentitem = updatedocument.document;

          store.writeQuery({...documentItemOptions, data: documentItem});
        } catch (e) {
          console.error('Error in FormProjectCreate, method updateDocument : ', e);
        }
      },
    };

    return this.props['@apollo/update'](options)
      .then(response => {
        this.loadingToggle();
        setNotificationSuccess(notificationOpts().success);
        history.push(`/app/project/${options.variables.project}`);
        return response;
      })
      .catch(({graphQLErrors, message, networkError, ...rest}) => {
        this.loadingToggle();
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
    console.log(this.props);
    return (
      <Form onSubmit={handleSubmit(this.updateDocument)}>
        <Flex mt={9} mb={'100px'} justifyContent={'space-around'}>
          <Box px={5} width={'50%'}>
            <Container mb={9} maxWidth={'500px'} width={'100%'}>
              <Fields
                names={['name', 'customercode', 'okancode', 'equipmentname']}
                component={BasicDocumentSettings}
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
                Внутренние согласующие ОКАН
              </Text>
              <FieldArray
                name={"internalMatching"}
                component={FieldArrayInternalUser}
              />
            </Container>
          </Box>
          <Box px={5} width={'50%'}>

            <Container mb={9} maxWidth={'500px'} width={'100%'}>
              <Text
                fontSize={6}
                lineHeight={8}
                color={'color7'}
                textAlign={'center'}
                mb={6}
                fontFamily={'primary500'}>
                Утверждающие внешние и внутренние
              </Text>
              <FieldArray
                name={"externalAndInternalApprove"}
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
                Внешние согласующие
              </Text>
              <FieldArray
                name={"externalMatching"}
                component={FieldArrayExternalUser}
              />
            </Container>
          </Box>
        </Flex>

        <Flex justifyContent={'center'} mb={'200px'}>
          <ButtonWithImage
            isLoading={this.state.isLoading}
            type={"submit"}
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

FormDocumentSettings = graphql(UpdateDocumentMutation, {
  name: '@apollo/update',
})(FormDocumentSettings);

FormDocumentSettings = connect(
  state => ({
    values: getFormValues('FormDocumentSettings')(state),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormDocumentSettings);

FormDocumentSettings = reduxForm({
  form: 'FormDocumentSettings',
})(FormDocumentSettings);
FormDocumentSettings = withRouter(FormDocumentSettings);
FormDocumentSettings = withApollo(FormDocumentSettings);
export default FormDocumentSettings;
