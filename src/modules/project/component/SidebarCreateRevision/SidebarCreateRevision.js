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
import CreateRevisionMutation from '../../graphql/CreateRevisionMutation.graphql';
import RevisionListQuery from '../../view/revisionList/RevisionListQuery.graphql';

/** store */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';
import {captureException} from "../../../../hocs/withSentry/withSentry";

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

export class SidebarCreateRevision extends Component {
  static propTypes = {};

  static defaultProps = {};

  createRevision = () => {
    const { documentid, setNotificationSuccess, setNotificationError } = this.props;

    return this.props[`@apollo/create`]({
      variables: {
        id: documentid.id,
        authorrevision: this.props.user.id,
        createrevisiondate: new Date().toISOString(),
      },
      update: (client, { data: { createrevision } }) => {
        try {
          const options = {
            query: RevisionListQuery,
            variables: {
              id: documentid.id,
            },
          };

          const data = client.readQuery(options);

          data.revisionList.push(createrevision.document);

          client.writeQuery({
            ...options,
            data,
          });
        } catch (error) {
          captureException(error);
          console.error('Error createRevision.update: ', error);
        }
      },
    })
      .then(response => {
        setNotificationSuccess(notificationOpts(documentid.name).success);
        return response;
      })
      .catch(error => {
        console.error(`Error SidebarCreateRevision:`, error);
        captureException(error);
        setNotificationError(notificationOpts(documentid.name).error);
      });
  };

  render() {
    return (
      <ButtonBase
        title={'Создать ревизию документа.'}
        onClick={event => {
          event.stopPropagation();
          this.createRevision();
        }}
        variant={'outlineGray'}
        p={'3px'}
        fontSize={'13px'}>
        <SvgSidebarSave />
      </ButtonBase>
    );
  }
}

SidebarCreateRevision = graphql(CreateRevisionMutation, {
  name: `@apollo/create`,
})(SidebarCreateRevision);

SidebarCreateRevision = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarCreateRevision);

export default SidebarCreateRevision;
