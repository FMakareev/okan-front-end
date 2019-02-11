import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgSidebarSave } from '../../../../components/Icons/SvgSidebarSave';

/** graphql Schema */
import CreateRevisionMutation from './CreateRevisionMutation.graphql';

/** store */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

const notificationOpts = name => ({
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

export class SidebarSaveChanges extends Component {
  static propTypes = {};

  static defaultProps = {};

  submit = () => {
    const { documentid, setNotificationSuccess, setNotificationError } = this.props;
    console.log(1, this.props);

    return this.props[`@apollo/create`]({
      variables: {
        id: documentid.id,
        authorrevision: this.props.user.id,
        createrevisiondate: new Date().toISOString(),
      },
    })
      .then(response => {
        // console.log(response);
        setNotificationSuccess(notificationOpts(documentid.name).success);
        return response;
      })
      .catch(error => {
        console.error(`Error SidebarSaveChanges:`, error);
        setNotificationError(notificationOpts(documentid.name).error);
      });
  };

  render() {
    return (
      <ButtonBase
        onClick={event => {
          event.stopPropagation();
          this.submit();
        }}
        title={'Создать ревизию документа.'}
        variant={'empty'}>
        <SvgSidebarSave />
      </ButtonBase>
    );
  }
}

SidebarSaveChanges = graphql(CreateRevisionMutation, {
  name: `@apollo/create`,
})(SidebarSaveChanges);

SidebarSaveChanges = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarSaveChanges);

export default SidebarSaveChanges;
