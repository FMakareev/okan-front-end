import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';
import {error, success} from 'react-notification-system-redux';

/** graphql Schema */
import UpdateDocumentMutation from './UpdateDocumentMutation.graphql';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/** Image */
import {SvgSidebarComment} from '../../../../components/Icons/SvgSidebarComment';

/** store */
import {getUserFromStore} from '../../../../store/reducers/user/selectors';

/** Constants */
import {TO_APPROVAL} from '@lib/shared/approvalStatus';
import ButtonWithImage from "@lib/ui/ButtonWithImage/ButtonWithImage";

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
    this.state = this.initialState;
  }

  get initialState() {
    return {
      isLoading: false,
    };
  }

  submit = () => {
    const {document, setNotificationSuccess, setNotificationError} = this.props;
    this.setState({isLoading: true});
    return this.props[`@apollo/update`]({
      variables: {approvalstatus: TO_APPROVAL, id: document.id},
    })
      .then(response => {
        console.log(response);
        setNotificationSuccess(notificationOpts(document.name).success);
        this.setState({isLoading: false});
        return response;
      })
      .catch(error => {
        console.error(`Error SidebarSaveChanges:`, error);
        this.setState({isLoading: false});
        setNotificationError(notificationOpts(document.name).error);
      });
  };

  render() {
    const {isLoading} = this.state;
    return (
      <ButtonWithImage
        isLoading={isLoading}
        p={'2px'}
        fontSize={'15px'}
        onClick={event => {
          event.stopPropagation();
          this.submit();
        }}
        title={'Отправить на согласование.'}
        variant={'outlineGray'}>
        <SvgSidebarComment/>
      </ButtonWithImage>
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
  state => ({user: getUserFromStore(state)}),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarDocumentToApproval);

export default SidebarDocumentToApproval;
