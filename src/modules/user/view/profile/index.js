import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

/**View*/
import SmallPreloader from '@lib/ui/SmallPreloader/SmallPreloader';
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import Flex from '@lib/ui/Flex/Flex';
import { CheckComponentAccessByRole } from '@lib/ui/CheckComponentAccessByRole/CheckComponentAccessByRole';

/**Components Admin*/
import ProfileApproval from '../../component/ProfileApproval/ProfileApproval';
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
import DocumentsForApprovalQuery from './DocumentsForApprovalQuery.graphql';

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

  render() {
    const {
      user: { role, id },
    } = this.props;

    console.log(1, id);

    return (
      <ErrorCatch>
        <Flex ml={'10%'} mr={'70px'} mt={9} flexDirection={'column'}>
          <Flex justifyContent={'space-between'} mb={'100px'}>
            <LeftColumn flexDirection={'column'}>
              <CheckComponentAccessByRole targetRole={[ROLE_USER, ROLE_ADMIN]} userRole={role}>
                <Query skip={!id} query={DocumentsForApprovalQuery} variables={{ user: id }}>
                  {({ loading, error, data }) => {
                    console.log(2, data);
                    if (id && loading) {
                      return <SmallPreloader />;
                    }
                    if (error) {
                      console.error(`Error DocumentsForApprovalQuery: `, error);
                      return null;
                    }
                    if (id && data && !data.documentsforapproval) {
                      return null;
                    }
                    return <ProfileApproval data={data && data.documentsforapproval} />;
                  }}
                </Query>
              </CheckComponentAccessByRole>
            </LeftColumn>

            <RightColumn flexDirection={'column'}>
              <CheckComponentAccessByRole targetRole={[ROLE_ADMIN]} userRole={role && role}>
                <FormProfileCreateUser />
              </CheckComponentAccessByRole>

              <CheckComponentAccessByRole targetRole={[ROLE_USER]} userRole={role && role}>
                <Query query={UserItemQuery} variables={{ ...(id ? { id } : null) }}>
                  {({ loading, error, data }) => {
                    // console.log('useritem', data);

                    if (id && loading) {
                      return <SmallPreloader />;
                    }
                    if (error) {
                      console.error(`Error UserItemQuery: `, error);
                      return null;
                    }
                    if (id && data && !data.useritem) {
                      return null;
                    }
                    return (
                      <FormPersonData
                        initialValues={data && Object.assign({}, { ...data.useritem })}
                      />
                    );
                  }}
                </Query>
              </CheckComponentAccessByRole>
            </RightColumn>
          </Flex>

          <Flex justifyContent={'space-between'}>
            <LeftColumn flexDirection={'column'}>
              <CheckComponentAccessByRole
                targetRole={[ROLE_USER, ROLE_ADMIN]}
                userRole={role && role}>
                <Query query={NotificationListQuery}>
                  {({ loading, error, data }) => {
                    // console.log('notificationslist', data);

                    if (id && loading) {
                      return <SmallPreloader />;
                    }

                    if (error) {
                      console.error(`Error NotificationListQuery: `, error);
                      return null;
                    }
                    if (id && data && !data.notificationslist) {
                      return null;
                    }
                    return (
                      <ProfileNotification
                        initialValues={data && Object.assign({}, { ...data.notificationslist })}
                      />
                    );
                  }}
                </Query>
              </CheckComponentAccessByRole>
            </LeftColumn>

            <RightColumn flexDirection={'column'}>
              <CheckComponentAccessByRole targetRole={[ROLE_ADMIN]} userRole={role && role}>
                <FormProfileRecoveryEmail />
              </CheckComponentAccessByRole>

              <CheckComponentAccessByRole targetRole={[ROLE_USER]} userRole={role && role}>
                <FormChangePassword />
              </CheckComponentAccessByRole>
            </RightColumn>
          </Flex>
        </Flex>
      </ErrorCatch>
    );
  }
}

export default ProfilePage;
