import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';

/** graphql Schema */
import UpdateDocumentMutation from './UpdateDocumentMutation.graphql';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/** Image */
import { SvgSidebarComment } from '../../../../components/Icons/SvgSidebarComment';

/** store */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/** Constants */
import { NOT_APPROVAL } from '../../../../shared/approvalStatus';

const notificationOpts = name => ({
  success: {
    title: `Файл "${name}" сохранен успешно.`,
    position: 'tr',
    autoDismiss: 6,
  },
  error: {
    title: `Произошла ошибка.`,
    message: `Файл "${name}" не был сохранен.`,
    position: 'tr',
    autoDismiss: 6,
  },
});

export class SidebarCreateRevision extends Component {
  constructor(props) {
    super(props);
  }

  get initialState() {
    return {};
  }

  submit = () => {
    const { document, setNotificationSuccess, setNotificationError } = this.props;

    return this.props[`@apollo/update`]({
      variables: { approvalstatus: NOT_APPROVAL, id: document.id },
    })
      .then(response => {
        console.log(response);
        setNotificationSuccess(notificationOpts(document.name).success);
        return response;
      })
      .catch(error => {
        console.error(`Error SidebarSaveChanges:`, error);
        setNotificationError(notificationOpts(document.name).error);
      });
  };

  render() {
    // console.log('SidebarCreateRevision: ', this.props);
    return (
      <ButtonBase
        onClick={event => {
          event.stopPropagation();
          this.submit();
        }}
        title={'Документ обновлен'}
        variant={'empty'}>
        <SvgSidebarComment />
      </ButtonBase>
    );
  }
}

SidebarCreateRevision.propTypes = {
  document: PropTypes.object.isRequired,
};

SidebarCreateRevision.defaultProps = {};

SidebarCreateRevision = graphql(UpdateDocumentMutation, {
  name: `@apollo/update`,
})(SidebarCreateRevision);

SidebarCreateRevision = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarCreateRevision);

export default SidebarCreateRevision;
