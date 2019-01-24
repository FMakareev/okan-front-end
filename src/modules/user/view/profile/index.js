import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, graphql, compose } from 'react-apollo';

/**View*/
import SmallPreloader from '../../../../components/SmallPreloader/SmallPreloader';
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';

/**Components Admin*/
import FormProfileApproval from '../../component/FormProfileApproval/FormProfileApproval';
import FormProfileCreateUser from '../../component/FormProfileCreateUser/FormProfileCreateUser';
import FormProfileNotification from '../../component/FormProfileNotification/FormProfileNotification';
import FormProfileRecoveryEmail from '../../component/FormProfileRecoveryEmail/FormProfileRecoveryEmail';

/** Components User*/
import FormPersonData from '../../component/FormPersonData/FormPersonData';
import FormChangePassword from '../../component/FormChangePassword/FormChangePassword';

/**PropTypes*/
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** Constants */
import { ROLE_ADMIN, ROLE_USER } from '../../../../shared/roles';

/** Redux user */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/** Graphql schema */
import UserItemQuery from './UserItemQuery.graphql';
import UserListQuery from './UserListQuery.graphql';

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

  render() {
    const {
      user: { role, id },
    } = this.props;

    return (
      <ErrorCatch>
        <Flex ml={'10%'} mr={'70px'} mt={9} flexDirection={'column'}>
          <Flex justifyContent={'space-between'} mb={'100px'}>
            <LeftColumn flexDirection={'column'}>
              <FormProfileApproval data={{ name: '23415', number: 'ТЗ - RK-186-344' }} />
            </LeftColumn>

            <RightColumn flexDirection={'column'}>
              {ROLE_ADMIN && <FormProfileCreateUser />}

              {ROLE_USER && (
                <Query query={UserListQuery}>
                  {({ loading, error, data }) => {
                    console.log('dataList', data);

                    if (id && loading) {
                      return <SmallPreloader />;
                    }
                    if (error) {
                      throw error;
                    }
                    if (id && data && !data.userlist) {
                      throw { message: `GraphQL error: not found` };
                    }

                    return (
                      <Query query={UserItemQuery} variables={{ ...(id ? { id } : null) }}>
                        {({ loading, error, data }) => {
                          console.log('dataItem', data);
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
                    );
                  }}
                </Query>
              )}
            </RightColumn>
          </Flex>

          <Flex justifyContent={'space-between'}>
            <LeftColumn flexDirection={'column'}>
              <FormProfileNotification
                data={{
                  id: '23415',
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
                }}
              />
            </LeftColumn>

            <RightColumn flexDirection={'column'}>
              {ROLE_ADMIN && <FormProfileRecoveryEmail />}
              {role === ROLE_USER && <FormChangePassword />}
            </RightColumn>
          </Flex>
        </Flex>
      </ErrorCatch>
    );
  }
}

ProfilePage = connect(state => ({
  user: getUserFromStore(state),
}))(ProfilePage);

export default ProfilePage;
