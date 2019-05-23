import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, withApollo } from 'react-apollo';
import { success, error } from 'react-notification-system-redux';
import {Fields, reduxForm, SubmissionError, Form, getFormValues, FieldArray} from 'redux-form';
import { withRouter } from 'react-router-dom';
import { has } from '../../../../utils/has';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import Box from '@lib/ui/Box/Box';
import Flex from '@lib/ui/Flex/Flex';
import Container from '@lib/ui/Container/Container';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';

/** Components */
import BasicDocumentSettings from '../BasicDocumentSettings/BasicDocumentSettings';

/** Image */
import { SvgSave } from '@lib/ui/Icons/SvgSave';

/** Graphql schema */
import UpdateDocumentMutation from '../../graphql/UpdateDocumentMutation.graphql';
import DocumentItemQuery from '../../graphql/DocumentItemQuery.graphql';
import CreateContractorApprovalMutation from '../../graphql/CreateContractorApprovalMutation.graphql';
import UpdateContractorApprovalMutation from '../../graphql/UpdateContractorApprovalMutation.graphql';
import DeleteContractorMutation from '../../graphql/DeleteContractorMutation.graphql';
import { captureException } from '../../../../hocs/withSentry/withSentry';
import FieldArrayExternalUser from "../FieldArrayExternalUser/FieldArrayExternalUser";
import FieldArrayWithTitle from "./FieldArrayWithTitle";
import FieldArrayInternalUser from "../FieldArrayInternalUser/FieldArrayInternalUser";
import ExternalAndInternalApprovalUser from "../ExternalAndInternalApprovalUser/ExternalAndInternalApprovalUser";

const notificationOpts = () => ({
  success: {
    title: 'Настройки проекта успешно обновлены',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Настройки проекта не обновлены',
    message:
      'Во время обновления настроек возникла ошибка, попробуйте перезагрузит страницу если это не поможет обратитесь в поддержку.',
    position: 'tr',
    autoDismiss: 5,
  },
});

export class FormDocumentSettings extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = this.initialState;

  get initialState() {
    return { isLoading: false };
  }

  /**
   * @desc метод для изменения статуса прелоатера
   * */
  loadingToggle = () => {
    this.setState(state => ({
      isLoading: !state.isLoading,
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
  submitCreateContractorApproval = value => {
    const variables = {
      approvaldate: value.approvaldate,
      userid: value.user.id,
      ...value.user,
      role: value.user.role.name,
    };
    return this.props.client.mutate({
      mutation: CreateContractorApprovalMutation,
      variables,
    });
  };

  /**
   * @param {string} id  утверждающего/согласующего
   * @return Promise
   * @desc метод удаления внешнего утверждающего/согласующего на сервере */
  removeContractorApprovalMutation = id => {
    const { client } = this.props;
    return client
      .mutate({
        mutation: DeleteContractorMutation,
        fetchPolicy: 'no-cache',
        variables: {
          id: id,
        },
      })
      .catch(error => {
        captureException(error, 'Error removeContractorApprovalMutation: ');
        return error;
      });
  };

  /**
   * @param {array} nextContractors - новый список контракторов
   * @param {array} prevContractors - значения
   * @return {array}
   * @desc метод получает на вход новый список и старый, сравнивает их и выдает разницу между новым списком и старым
   * */
  getDeletedContractor = (nextContractors, prevContractors) => {
    try {
      let diffBetweenThePrevAndNext = [];

      prevContractors.forEach(prevContractor => {
        let result = nextContractors.find(
          nextContractor => prevContractor.id === nextContractor.id,
        );
        if (!result) {
          diffBetweenThePrevAndNext.push(prevContractor);
        }
      });
      return diffBetweenThePrevAndNext;
    } catch (error) {
      captureException(error, 'Error transformDocumentApproval: ');
      return error;
    }
  };

  /** @desc метод генерирует массив промисов на удаление списка внешних согласующих/утверждающих */
  createRequestListForRemoveContractorApproval = async value => {
    try {
      return await value.map(async item => {
        const {
          data: { deletecontractorapproval },
        } = await this.removeContractorApprovalMutation(item.id);

        return deletecontractorapproval;
      });
    } catch (error) {
      captureException(error, 'Error createContractorApprovalList: ');
    }
  };

  /**
   * @param {object} value
   * @param {array} value.externalApprove
   * @param {array} value.externalMatching
   * @desc метод запускает процесс удаления внешних утверждаюзих/согласующих
   * */
  removeContractorApproval = async value => {
    try {
      const newDate = {
        externalApprove: [],
        externalMatching: [],
      };
      const promiseLists = {
        externalApprove: [],
        externalMatching: [],
      };

      if (
        has.call(value, 'externalApprove') &&
        Array.isArray(value.externalApprove)
      ) {
        newDate.externalApprove = this.getDeletedContractor(
          value.externalApprove,
          this.props.initialValues.externalApprove,
        );
        promiseLists.externalApprove = await this.createRequestListForRemoveContractorApproval(
          newDate.externalApprove,
        );
      }
      if (has.call(value, 'externalMatching') && Array.isArray(value.externalMatching)) {
        newDate.externalMatching = this.getDeletedContractor(
          value.externalMatching,
          this.props.initialValues.externalMatching,
        );
        promiseLists.externalMatching = await this.createRequestListForRemoveContractorApproval(
          newDate.externalMatching,
        );
      }

      /** резолвим промисы */
      if (promiseLists.externalApprove.length) {
        newDate.externalApprove = await Promise.all(
          promiseLists.externalApprove,
        );
      }
      if (promiseLists.externalMatching.length) {
        newDate.externalMatching = await Promise.all(promiseLists.externalMatching);
      }
      return newDate;
    } catch (error) {
      captureException(error, 'Error removeContractorApproval: ');
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
  submitUpdateContractorApproval = value => {
    const variables = {
      ...value.user,
      id: value.id,
      approvaldate: value.approvaldate,
      userid: value.user.id,
    };
    return this.props.client.mutate({
      mutation: UpdateContractorApprovalMutation,
      variables,
    });
  };

  /**
   * @param {array} value
   * @param {object} value[i].user
   * @param {string} value[i].approvaldate
   * @return {Promise}
   * @desc метод для преобразования данных из формы к типу ContractorApproval
   * */
  createContractorApprovalList = async value => {
    try {
      return await value.map(async item => {
        let contractorapproval = {};

        /** создаем/обновляем объект ContractorApproval */
        if (has.call(item, 'id')) {
          const {
            data: { updatecontractorapproval },
          } = await this.submitUpdateContractorApproval(item);
          contractorapproval = updatecontractorapproval.contractorapproval;
        } else  {
          const {
            data: { createcontractorapproval },
          } = await this.submitCreateContractorApproval(item);
          contractorapproval = createcontractorapproval.contractorapproval;
        }

        return contractorapproval.id;
      });
    } catch (error) {
      captureException(error, 'Error createContractorApprovalList: ');
    }
  };

  /**
   * @param {object} value
   * @param {array} value.externalApprove
   * @param {array} value.externalMatching
   * @return {Promise}
   * @desc метод для преобразования данные формы к виду массивов gql типов ContractorApproval
   * */
  transformDocumentApproval = async value => {
    try {
      const newDate = {
        externalApprove: [],
        externalMatching: [],
      };
      if (
        has.call(value, 'externalApprove') &&
        Array.isArray(value.externalApprove)
      ) {
        newDate.externalApprove = await this.createContractorApprovalList(
          value.externalApprove,
        );
      }
      if (has.call(value, 'externalMatching') && Array.isArray(value.externalMatching)) {
        newDate.externalMatching = await this.createContractorApprovalList(value.externalMatching);
      }

      /** резолвим промисы */
      if (newDate.externalApprove.length) {
        newDate.externalApprove = await Promise.all(newDate.externalApprove);
      }
      if (newDate.externalMatching.length) {
        newDate.externalMatching = await Promise.all(newDate.externalMatching);
      }

      return newDate;
    } catch (error) {
      captureException(error, 'Error transformDocumentApproval: ');

      return error;
    }
  };

  /**
   * @param {object} value
   * @param {array} value.externalApprove
   * @param {array} value.internalApprove
   * @param {array} value.externalMatching
   * @param {array} value.internalMatching
   * @param {array} value.partners
   * @param {string} value.name
   * @param {string} value.customercode
   * @param {string} value.okancode
   * @param {string} value.okancode
   * @return {Promise}
   * @desc обновляем документ, тут собрано несколько последовательно выполняющийся методов
   * */
  updateDocument = async value => {
    const { setNotificationError, setNotificationSuccess, history } = this.props;
    this.loadingToggle();

    /** */
    const removeContractorApproval = await this.removeContractorApproval(value);

    if (removeContractorApproval.message) {
      setNotificationError(notificationOpts().error);
      throw new SubmissionError({ _error: removeContractorApproval.message });
    }

    const documentApproval = await this.transformDocumentApproval(value);

    if (documentApproval.message) {
      setNotificationError(notificationOpts().error);
      throw new SubmissionError({ _error: documentApproval.message });
    }

    const options = {
      mutation: UpdateDocumentMutation,
      variables: Object.assign({}, value, documentApproval),
      update: (store, response) => {
        try {
          const {
            data: { updatedocument },
          } = response;
          const documentItemOptions = {
            query: DocumentItemQuery,
            variables: {
              id: updatedocument.document.id,
            },
          };
          const documentItem = store.readQuery(documentItemOptions);
          documentItem.documentitem = updatedocument.document;
          store.writeQuery({ ...documentItemOptions, data: documentItem });
        } catch (e) {
          captureException(e, 'Error in FormProjectCreate, method updateDocument : ');
        }
      },
    };

    return this.props.client.mutate(options)
      .then(response => {
        this.loadingToggle();
        setNotificationSuccess(notificationOpts().success);
        history.push(`/app/project/${options.variables.project}`);
        return response;
      })
      .catch(error => {
        const { message } = error;
        this.loadingToggle();
        setNotificationError(notificationOpts().error);
        captureException(error,'Error catch');

        throw new SubmissionError({ _error: message });
      });
  };

  render() {
    const { handleSubmit } = this.props;

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

            <FieldArrayWithTitle
              component={FieldArrayInternalUser}
              name={'internalMatching'}
              title={'Внутренние согласующие ОКАН'}
            />
            <FieldArrayWithTitle
              component={FieldArrayInternalUser}
              name={'internalApprove'}
              title={'Внутренние утверждающие ОКАН'}
            />
          </Box>

          <Box px={5} width={'50%'}>

            <FieldArrayWithTitle
              name={'externalMatching'}
              title={'Внешние согласующие'}
              component={FieldArrayExternalUser}
            />
            <FieldArrayWithTitle
              name={'externalApprove'}
              title={'Внешние утверждающие'}
              component={FieldArrayExternalUser}
            />
          </Box>
        </Flex>

        <Flex justifyContent={'center'} mb={'200px'}>
          <ButtonWithImage
            isLoading={this.state.isLoading}
            type={'submit'}
            variant={'large'}
            size={'medium'}
            children={'Сохранить настройки'}
            leftIcon={SvgSave()}
            mr={9}
            width={'500px'}
            widthIcon={'16px'}
          />
        </Flex>
      </Form>
    );
  }
}


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
