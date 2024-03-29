import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';

/** graphql Schema */
import UpdateDocumentMutation from '../../graphql/UpdateDocumentMutation.graphql';
import CheckForCommentsInCellsQuery from '../../graphql/CheckForCommentsInCellsQuery.graphql';

/** Image */
import { SvgSidebarComment } from '../../../../components/Icons/SvgSidebarComment';

/** store */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/** View */
import ButtonDocumentToApproval from '../../utils/ButtonDocumentToApproval';

/** Constants */
import { APPROVAL, NOT_APPROVAL } from '@lib/shared/approvalStatus';
import { captureException } from '../../../../hocs/withSentry/withSentry';

const notificationOpts = name => {
  return {
    success: {
      title: `Документ "${name}" согласован.`,
      position: 'tr',
      autoDismiss: 2,
    },
    validError: {
      title: `Произошла ошибка.`,
      message: `Документ "${name}" не был согласование т.к. в нем есть комментарии.`,
      position: 'tr',
      autoDismiss: 6,
    },
    submitError: {
      title: `Произошла ошибка.`,
      message: `Документ "${name}" не был отправлен на согласование из-за неизвестной ошибки.`,
      position: 'tr',
      autoDismiss: 6,
    },
  };
};

export class SidebarCommentingDocumentToApproval extends Component {
  static propTypes = {
    client: PropTypes.object,
    document: PropTypes.object,
    setNotificationError: PropTypes.func,
    setNotificationSuccess: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      isLoading: false,
    };
  }

  /**
   * @param {string} id
   * @desc запрос на получение информации о наличии изменений в документе, проверяет ячейки
   * */
  checkForCommentsInCells = id => {
    const { setNotificationError, document, client } = this.props;

    return client
      .query({
        query: CheckForCommentsInCellsQuery,
        fetchPolicy: 'no-cache',
        variables: {
          id: id,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error checkForCommentsInCells:`, error);
        setNotificationError(notificationOpts(document.name).submitError);
        captureException(error);
        return error;
      });
  };

  /**
   * @param {string} id документа
   * @param {string} approvalstatus статус
   * @desc запрос на изменение статуса у документа
   * */
  updateApprovalDocumentStatus = (id, approvalstatus) => {
    const { document, setNotificationError } = this.props;

    return this.props.client
      .mutate({
        mutation: UpdateDocumentMutation,
        variables: {
          approvalstatus: approvalstatus,
          id: id,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error updateApprovalDocumentStatus: `, error);
        setNotificationError(notificationOpts(document.name).submitError);
        captureException(error);
        return error;
      });
  };

  /**
   * @desc метод объединяет проверку наличия изменений в документе и изенение статуса
   * */
  submitDocumentToApproval = async () => {
    const { document, setNotificationSuccess, setNotificationError } = this.props;
    this.setState({ isLoading: true });

    const {
      checkForCommentsInCells,
      graphQLErrors,
      networkError,
    } = await this.checkForCommentsInCells(document.id);

    if ((graphQLErrors && graphQLErrors.length) || networkError) {
      /** Проверяем наличие ошибок при вызове метода checkForCommentsInCells */
      setNotificationError(notificationOpts(document.name).submitError);
    } else if (checkForCommentsInCells.answer) {
      /** если есть комментарии в документе то выдаем ошибку */
      setNotificationError(notificationOpts(document.name).validError);
      const { updatedocument } = await this.updateApprovalDocumentStatus(document.id, NOT_APPROVAL);
    } else {
      /** если есть нет измененний в документе то меняем статус согласования */
      const {
        updatedocument,
        networkError,
        graphQLErrors,
      } = await this.updateApprovalDocumentStatus(document.id, APPROVAL);
      if (!graphQLErrors || !networkError) {
        setNotificationSuccess(notificationOpts(document.name).success);
      }
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <ButtonDocumentToApproval
        isLoading={isLoading}
        onClick={event => {
          event.stopPropagation();
          this.submitDocumentToApproval();
        }}
        title={'Согласовать'}
        size={'toApproval'}
        variant={'outlineGray'}
        children={<SvgSidebarComment />}
      />
    );
  }
}

SidebarCommentingDocumentToApproval = withApollo(SidebarCommentingDocumentToApproval);

SidebarCommentingDocumentToApproval = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarCommentingDocumentToApproval);

export default SidebarCommentingDocumentToApproval;
