import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {connect} from "react-redux";

import CreateRevisionMutation from './CreateRevisionMutation.graphql'
/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import {SvgSidebarComment} from '../../../../components/Icons/SvgSidebarComment';
import {error, success} from "react-notification-system-redux";
import {USER_ADD} from "../../../../store/reducers/user/actionTypes";

const notificationOpts = (name) => ({
  success: {
    title: `Ревизия документа "${name}" создана.`,
    position: 'tr',
    autoDismiss: 6,
  },
  error: {
    title: `Произошла ошибка.`,
    message: `Ревизия документа "${name}" не создана.`,
    position: 'tr',
    autoDismiss: 6,
  },
});


export class SidebarCreateRevision extends Component {

  constructor(props){
    super(props);
  }

  get initialState(){
    return {

    }
  }


  submit = () => {
    const {document, setNotificationSuccess, setNotificationError} = this.props;

    return this.props[`@apollo/create`]({
      variables: {
        id: document.id,
      }
    })
      .then((response) => {
        console.log(response);
        setNotificationSuccess(notificationOpts(document.name).success);
        return response;
      })
      .catch((error) => {
        console.error(`Error SidebarCreateRevision:`, error);
        setNotificationError(notificationOpts(document.name).error);
      })
  };

  render() {
    console.log('SidebarCreateRevision: ', this.props);
    return (<ButtonBase
      onClick={(event) => {
        event.stopPropagation();
        this.submit();
      }}
      variant={'empty'}>
      <SvgSidebarComment/>
    </ButtonBase>)
  }
}


SidebarCreateRevision.propTypes = {
  document: PropTypes.object.isRequired,
};

SidebarCreateRevision.defaultProps = {};

SidebarCreateRevision = graphql(CreateRevisionMutation, {
  name: `@apollo/create`,
})(SidebarCreateRevision);

SidebarCreateRevision = connect(
  null,
  dispatch => ({
    addUser: user => dispatch({type: USER_ADD, payload: user}),
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarCreateRevision);

export default SidebarCreateRevision;
