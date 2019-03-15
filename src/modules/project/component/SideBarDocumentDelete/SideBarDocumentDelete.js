import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgSidebarDelete } from '../../../../components/Icons/SvgSidebarDelete';

/** Graphql schema */
import DeleteDocumentMutation from './DeleteDocumentMutation.graphql';
import ProjectItemQuery from '../../view/projectEditor/ProjectItemQuery.graphql';

/** store */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/** Context */
import { getPosition } from '../ProjectContext/ProjectContextSelectors';

const notificationOpts = name => ({
  success: {
    title: `Документ "${name || ''}" удален.`,
    position: 'tr',
    autoDismiss: 6,
  },
  error: {
    title: `Произошла ошибка.`,
    message: `Документ "${name || ''}" не удален.`,
    position: 'tr',
    autoDismiss: 6,
  },
});

export class SideBarDocumentDelete extends Component {
  static propTypes = {
    documentId: PropTypes.string.isRequired,
    documentName: PropTypes.string.isRequired,
  };

  deleteDocument = () => {
    const {
      setNotificationSuccess,
      setNotificationError,
      documentId,
      documentName,
      history,
      project,
    } = this.props;
    this.props.client
      .mutate({
        mutation: DeleteDocumentMutation,
        variables: { id: documentId },
        update: (store, { data: { deletedocument } }) => {
          try {
            const options = {
              query: ProjectItemQuery,
              variables: { id: getPosition(project, 'projectid') },
            };
            const data = store.readQuery(options);

            let documentIndex = data.projectitem.documents.findIndex(
              item => item.id === deletedocument.document.id,
            );
            data.projectitem.documents.splice(documentIndex, 1);

            store.writeQuery({
              ...options,
              data,
            });
          } catch (error) {
            console.error('Error update cache after deletedocument: ', error);
          }
          try {
            if (getPosition(project, 'documentid') === deletedocument.document.id) {
              history.push(`/app/project/${getPosition(project, 'projectid')}`);
            }
          } catch (error) {
            console.error('Error change path after deletedocument: ', error);
          }
        },
      })
      .then(response => {
        setNotificationSuccess(notificationOpts(documentName).success);
      })
      .catch(error => {
        console.error('Error deleteCell: ', error);
        setNotificationError(notificationOpts(documentName).error);
      });
  };

  render() {
    return (
      <ButtonBase
        title={'Удалить документ.'}
        p={'2px'}
        fontSize={'15px'}
        onClick={event => {
          event.stopPropagation();
          if (confirm('Вы уверены что хотите удалить документ?')) {
            this.deleteDocument();
          }
        }}
        variant={'outlineGray'}>
        <SvgSidebarDelete />
      </ButtonBase>
    );
  }
}

SideBarDocumentDelete = withApollo(SideBarDocumentDelete);

SideBarDocumentDelete = withRouter(SideBarDocumentDelete);

SideBarDocumentDelete = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SideBarDocumentDelete);

export default SideBarDocumentDelete;
