import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import isEmpty from 'lodash/isEmpty';

/**View*/
import SmallPreloader from '@lib/ui/SmallPreloader/SmallPreloader';
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import Flex from '@lib/ui/Flex/Flex';
import Box from '@lib/ui/Box/Box';

/**Components Admin*/
import FormProfileApproval from '../../component/FormProfileApproval/FormProfileApproval';
import FormProfileCreateUser from '../../component/FormProfileCreateUser/FormProfileCreateUser';
import ProfileNotification from '../../component/ProfileNotification/ProfileNotification';
import FormProfileRecoveryEmail from '../../component/FormProfileRecoveryEmail/FormProfileRecoveryEmail';

/** Components User*/
import FormPersonData from '../../component/FormPersonData/FormPersonData';
import FormChangePassword from '../../component/FormChangePassword/FormChangePassword';

/**PropTypes*/
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** Constants */
import { ROLE_ADMIN, ROLE_USER } from '../../../../shared/roles';

/** Graphql schema */
import UserItemQuery from './UserItemQuery.graphql';
import NotificationListQuery from './NotificationListQuery.graphql';
import DocumentListQuery from './DocumentListQuery.graphql';

const LeftColumn = styled(Flex)`
  width: calc(100% - 400px);

  @media (min-width: 1200px) {
    width: calc(100% - 480px);
  }
`;

const RightColumn = styled(Flex)`
  width: 360px;

  @media (min-width: 1200px) {
    width: 400px;
  }
`;

export class ProfilePage extends Component {
  static propTypes = { ...ReactRoutePropTypes, mb: PropTypes.string };

  state = {};

  submit = value => {
    console.log('value', value);
  };

  render() {
    const {
      user: { role, id },
    } = this.props;

    return (
      <ErrorCatch>
        <Flex ml={'10%'} mr={'70px'} mt={9} flexDirection={'column'}>
          <Flex justifyContent={'space-between'} mb={'100px'}>
            <LeftColumn flexDirection={'column'}>
              {ROLE_USER && (
                <Query query={DocumentListQuery} variables={{ ...(id ? { id } : null) }}>
                  {({ loading, error, data }) => {
                    console.log('documentlist', data);
                    // const dataIsEmpty = isEmpty(data) ? null : data;

                    if (id && loading) {
                      return <SmallPreloader />;
                    }
                    if (error) {
                      throw error;
                    }
                    if (id && data && !data.documentlist) {
                      throw { message: `GraphQL error: not found` };
                    }
                    return (
                      <FormProfileApproval
                        initialValues={data && Object.assign({}, { ...data.documentlist })}
                      />
                    );
                  }}
                </Query>
                )}

            </LeftColumn>

            <RightColumn flexDirection={'column'}>
              {ROLE_ADMIN && <FormProfileCreateUser />}

              {ROLE_USER && (
                <Query query={UserItemQuery} variables={{ ...(id ? { id } : null) }}>
                  {({ loading, error, data }) => {
                    console.log('useritem', data);
                    // const dataIsEmpty = isEmpty(data) ? null : data;

                    if (id && loading) {
                      return <SmallPreloader />;
                    }
                    if (error) {
                      throw error;
                    }
                    if (id && data && !data.useritem) {
                      throw { message: `GraphQL error: not found` };
                    }
                    return (
                      <FormPersonData
                        initialValues={data && Object.assign({}, { ...data.useritem })}
                      />
                    );
                  }}
                </Query>
              )}
            </RightColumn>
          </Flex>

          <Flex justifyContent={'space-between'}>
            <LeftColumn flexDirection={'column'}>
              {ROLE_USER && (
                <Query query={NotificationListQuery}>
                  {({ loading, error, data }) => {
                    console.log('notificationslist', data);
                    // const dataIsEmpty = isEmpty(data) ? null : data;

                    if (id && loading) {
                      return <SmallPreloader />;
                    }
                    if (error) {
                      throw error;
                    }
                    if (id && data && !data.notificationslist) {
                      throw { message: `GraphQL error: not found` };
                    }
                    return (
                      <ProfileNotification
                        initialValues={data && Object.assign({}, { ...data.notificationslist })}
                      />
                    );
                  }}
                </Query>
              )}
            </LeftColumn>

            <RightColumn flexDirection={'column'}>
              {ROLE_ADMIN && <FormProfileRecoveryEmail />}
              {ROLE_USER && <FormChangePassword />}
            </RightColumn>
          </Flex>
        </Flex>
      </ErrorCatch>
    );
  }
}

export default ProfilePage;

// <ProfileNotification data={{ id: '23415', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' }} />;
