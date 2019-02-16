import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';
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
    const { setNotificationSuccess, setNotificationError, id, name, projectid } = this.props;
    this.props.client
      .mutate({
        mutation: DeleteDocumentMutation,
        variables: { id },
        update: (store, { data: { deletedocument } }) => {
          const data = store.readQuery({
            query: ProjectItemQuery,
            variables: { id: projectid },
          });

          let documentIndex = null;

          for (let i = 0; i < data.projectitem.documents.length; i += 1) {
            if (data.projectitem.documents[i].id === deletedocument.document.id) {
              documentIndex = i;
            }
          }

          const projectItemList = data.projectitem.documents;

          // const newProjectItemList = projectItemList.filter(item => item !== documentIndex);

          const newProjectItemList = data.projectitem.documents.splice(documentIndex, 1);

          store.writeQuery({
            query: ProjectItemQuery,
            variables: { id: projectid },
            data,
          });
        },
      })
      .then(response => {
        // console.log(1122233, projectid);
        // console.log(1122234, this.props);

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

SideBarDocumentDelete = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SideBarDocumentDelete);

export default SideBarDocumentDelete;
