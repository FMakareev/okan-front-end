import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';
import { withRouter } from 'react-router-dom';
import { Mutation, withApollo } from 'react-apollo';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgSidebarDelete } from '../../../../components/Icons/SvgSidebarDelete';

/** Graphql schema */
import DeleteDocumentMutation from './DeleteDocumentMutation.graphql';
import ProjectItemQuery from '../../view/projectEditor/ProjectItemQuery.graphql';

/** store */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

const notificationOpts = name => ({
  success: {
    title: `Документ "${name}" удален.`,
    position: 'tr',
    autoDismiss: 6,
  },
  error: {
    title: `Произошла ошибка.`,
    message: `Документ "${name}" не удален.`,
    position: 'tr',
    autoDismiss: 6,
  },
});

export class SideBarDocumentDelete extends Component {
  state = {};

  DeleteDocument = () => {
    const {
      setNotificationSuccess,
      setNotificationError,
      id,
      name,
      projectid,
      pathname,
    } = this.props;
    this.props.client
      .mutate({
        mutation: DeleteDocumentMutation,
        variables: { id },
        update: (store, { data: { deletedocument } }) => {
          try{
            const options = {
              query: ProjectItemQuery,
              variables: { id: projectid },
            };
            const data = store.readQuery(options);

            let documentIndex = data.projectitem.documents.findIndex(item =>item.id === deletedocument.document.id);
            data.projectitem.documents.splice(documentIndex, 1);
            store.writeQuery({
              ...options,
              data,
            });
          } catch(error){
            console.error('Error update cache after deletedocument: ',error);
          }
        },
      })
      .then(response => {
        const indexProjectidInPathname = pathname.indexOf(projectid);
        const idPathname = pathname.substring(indexProjectidInPathname);
        if (idPathname.length !== projectid.length) {
          this.props.history.push(`/app/project/${projectid}`);
        }

        setNotificationSuccess(notificationOpts(name).success);
      })
      .catch(error => {
        console.error('Error deleteCell: ', error);
        setNotificationError(notificationOpts(name).error);
      });
  };

  render() {
    return (
      <ButtonBase
        title={'Удалить документ.'}
        onClick={event => {
          event.stopPropagation();
          this.DeleteDocument();
        }}
        variant={'empty'}>
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
