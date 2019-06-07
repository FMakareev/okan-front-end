import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**View*/
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import Flex from '@lib/ui/Flex/Flex';
import {CheckComponentAccessByRole} from '@lib/ui/CheckComponentAccessByRole/CheckComponentAccessByRole';
import PaginationPageHOC from '@lib/ui/PaginationPageHOC/PaginationPageHOC';
import PaginationPage from '@lib/ui/PaginationPage/PaginationPage';

/**Components Admin*/
import ProfileApproval from '../../component/ProfileApproval/ProfileApproval';
import FormProfileCreateUser from '../../component/FormProfileCreateUser/FormProfileCreateUser';
import ProfileNotification from '../../component/ProfileNotification/ProfileNotification';
import FormProfileRecoveryEmail from '../../component/FormProfileRecoveryEmail/FormProfileRecoveryEmail';

/** Components User*/
import FormChangePassword from '../../component/FormChangePassword/FormChangePassword';

/**PropTypes*/
import {ReactRoutePropTypes} from '../../../../propTypes/ReactRoutePropTypes';

/** Constants */
import {ROLE_ADMIN, ROLE_USER} from '../../../../shared/roles';

/** Graphql schema */
import NotificationListQuery from '../../graphql/NotificationListQuery.graphql';
import DocumentsForApprovalQuery from '../../graphql/DocumentsForApprovalQuery.graphql';

/** HOCS */
import FormPersonDataWithQuery from "../../component/ProfileRightSide/ProfileRightSide";
import Box from "@lib/ui/Box/Box";

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
  static propTypes = {...ReactRoutePropTypes, mb: PropTypes.string};

  static defaultProps = {
    user: {
      role: null,
      id: null
    }
  };

  render() {
    const {
      user: {role, id},
    } = this.props;

    return (
      <ErrorCatch>
        <Flex ml={'10%'} mr={'70px'} mt={9} mb={12} flexDirection={'column'}>
          <Flex justifyContent={'space-between'} mb={'100px'}>
            <LeftColumn flexDirection={'column'}>
              <Box mb={'100px'}>
                <CheckComponentAccessByRole targetRole={[ROLE_USER, ROLE_ADMIN]} userRole={role}>
                  <PaginationPageHOC
                    queryName={'documentsForApproval'}
                    queryVariables={{
                      user: id,
                    }}
                    pageSize={5}
                    pageNumber={1}
                    query={DocumentsForApprovalQuery}>
                    {props => (
                      <PaginationPage
                        {...props}
                        data={props.data && props.data.documentsForApproval}
                        Consumer={ProfileApproval}
                      />
                    )}
                  </PaginationPageHOC>
                </CheckComponentAccessByRole>
              </Box>
              <Box>
                <CheckComponentAccessByRole
                  targetRole={[ROLE_USER, ROLE_ADMIN]}
                  userRole={role && role}>
                  <PaginationPageHOC
                    fetchPolicy={'no-cache'}
                    queryName={'notificationsList'}
                    queryVariables={() => {
                      if (role && role.name === ROLE_ADMIN) {
                        return { };
                      } else if (role && role.name === ROLE_USER) {
                        return {
                          userid: id
                        };
                      }
                      return {};
                    }}
                    pageSize={5}
                    pageNumber={1}
                    query={NotificationListQuery}>
                    {props => (
                      <PaginationPage
                        {...props}
                        data={props.data && props.data.notificationsList}
                        Consumer={ProfileNotification}
                      />
                    )}
                  </PaginationPageHOC>
                </CheckComponentAccessByRole>
              </Box>
            </LeftColumn>

            <RightColumn flexDirection={'column'}>
              <Box mb={'100px'}>
                <CheckComponentAccessByRole targetRole={[ROLE_ADMIN]} userRole={role && role}>
                  <FormProfileCreateUser/>
                </CheckComponentAccessByRole>

                <CheckComponentAccessByRole targetRole={[ROLE_USER]} userRole={role && role}>
                  <FormPersonDataWithQuery id={id}/>
                </CheckComponentAccessByRole>
              </Box>

              <Box>
                <CheckComponentAccessByRole targetRole={[ROLE_ADMIN]} userRole={role && role}>
                  <FormProfileRecoveryEmail/>
                </CheckComponentAccessByRole>

                <CheckComponentAccessByRole targetRole={[ROLE_USER]} userRole={role && role}>
                  <FormChangePassword/>
                </CheckComponentAccessByRole>
              </Box>
            </RightColumn>
          </Flex>

        </Flex>
      </ErrorCatch>
    );
  }
}

export default ProfilePage;
