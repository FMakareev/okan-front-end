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
import { TO_APPROVAL } from '@lib/shared/approvalStatus';

const notificationOpts = name => ({
  success: {
    title: `Документ "${name}" отправлен на согласование.`,
    position: 'tr',
    autoDismiss: 6,
  },
  error: {
    title: `Произошла ошибка.`,
    message: `Документ "${name}" не был  отправлен на согласование.`,
    position: 'tr',
    autoDismiss: 6,
  },
});

export class SidebarDocumentToApproval extends Component {
  constructor(props) {
    super(props);
  }

  get initialState() {
    return {};
  }

  submit = () => {
    const { document, setNotificationSuccess, setNotificationError } = this.props;

    return this.props[`@apollo/update`]({
      variables: { approvalstatus: TO_APPROVAL, id: document.id },
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
    // console.log('SidebarDocumentToApproval: ', this.props);
    return (
      <ButtonBase
        onClick={event => {
          event.stopPropagation();
          this.submit();
        }}
        title={'Отправить на согласование.'}
        variant={'empty'}>
        <SvgSidebarComment />
      </ButtonBase>
    );
  }
}

SidebarDocumentToApproval.propTypes = {
  document: PropTypes.object.isRequired,
};

SidebarDocumentToApproval.defaultProps = {};

SidebarDocumentToApproval = graphql(UpdateDocumentMutation, {
  name: `@apollo/update`,
})(SidebarDocumentToApproval);

SidebarDocumentToApproval = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarDocumentToApproval);

export default SidebarDocumentToApproval;
