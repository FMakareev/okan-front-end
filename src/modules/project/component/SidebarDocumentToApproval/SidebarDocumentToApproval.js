import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';

/** graphql Schema */
import UpdateDocumentMutation from '../../graphql/UpdateDocumentMutation.graphql';
import CheckForChangesInDocQuery from '../../graphql/CheckForChangesInDocQuery.graphql';

/** Image */
import { SvgSidebarComment } from '../../../../components/Icons/SvgSidebarComment';

/** store */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/** Constants */
import { TO_APPROVAL } from '@lib/shared/approvalStatus';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';

const notificationOpts = name => {
  return {
    success: {
      title: `Документ "${name}" отправлен на согласование.`,
      position: 'tr',
      autoDismiss: 2,
    },
    validError: {
      title: `Произошла ошибка.`,
      message: `Документ "${name}" не был отправлен на согласование т.к. в нем есть измененные блоки.`,
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

export class SidebarDocumentToApproval extends Component {
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
  checkForChangesInDoc = id => {
    const { setNotificationError, document, client } = this.props;

    return client
      .query({
        query: CheckForChangesInDocQuery,
        fetchPolicy: 'no-cache',
        variables: {
          id: id,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error checkForChangesInDoc:`, error);
        setNotificationError(notificationOpts(document.name).submitError);
        return error;
      });
  };

  /**
   * @param {string} id
   * @desc запрос на изменение статуса у документа
   * */
  updateApprovalDocumentStatus = id => {
    const { setNotificationSuccess, document, setNotificationError } = this.props;

    return this.props[`@apollo/update`]({
      variables: { approvalstatus: TO_APPROVAL, id: id },
    })
      .then(response => {
        setNotificationSuccess(notificationOpts(document.name).success);
        return response.data;
      })
      .catch(error => {
        console.error(`Error updateApprovalDocumentStatus: `, error);
        setNotificationError(notificationOpts(document.name).submitError);
        return error;
      });
  };

  /**
   * @desc метод объединяет проверку наличия изменений в документе и изенение статуса
   * */
  submitDocumentToApproval = async () => {
    const { document, setNotificationError } = this.props;
    this.setState({ isLoading: true });

    const { checkForChangesInDoc, graphQLErrors, networkError } = await this.checkForChangesInDoc(
      document.id,
    );

    if ((graphQLErrors && graphQLErrors.length) || networkError) {
      /** Проверяем наличие ошибок при вызове метода checkForChangesInDoc */
      setNotificationError(notificationOpts(document.name).submitError);
    } else if (checkForChangesInDoc.answer) {
      /** если есть измененния в документе то выдаем ошибку */
      setNotificationError(notificationOpts(document.name).validError);
    } else {
      /** если  нет измененний в документе то меняем статус согласования */
      const { updatedocument } = await this.updateApprovalDocumentStatus(document.id);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <ButtonWithImage
        isLoading={isLoading}
        p={'2px'}
        fontSize={'15px'}
        onClick={event => {
          event.stopPropagation();
          this.submitDocumentToApproval();
        }}
        title={'Отправить на согласование.'}
        variant={'outlineGray'}>
        <SvgSidebarComment />
      </ButtonWithImage>
    );
  }
}

SidebarDocumentToApproval = graphql(UpdateDocumentMutation, {
  name: `@apollo/update`,
})(SidebarDocumentToApproval);

SidebarDocumentToApproval = withApollo(SidebarDocumentToApproval);

SidebarDocumentToApproval = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarDocumentToApproval);

export default SidebarDocumentToApproval;
