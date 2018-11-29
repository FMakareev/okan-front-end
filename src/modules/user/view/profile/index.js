import React, { Component } from 'react';
import styled from 'styled-components';

/**Components */

import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';

/** Admin */
import ProfileApproval from '../../component/admin/ProfileApproval/ProfileApproval';
import ProfileCreateUser from '../../component/admin/ProfileCreateUser/ProfileCreateUser';
import ProfileNotification from '../../component/admin/ProfileNotification/ProfileNotification';
import ProfileRecoveryEmail from '../../component/admin/ProfileRecoveryEmail/ProfileRecoveryEmail';

/** User */
import PersonData from '../../component/user/PersonData/PersonData';
import ChangePassword from '../../component/user/ChangePassword/ChangePassword';

export class ProfilePage extends Component {
  state = {};
  render() {
    return (
      <ErrorCatch>
        <Flex ml={'240px'} mr={'70px'} flexDirection={'column'}>
          <Flex justifyContent={'space-between'} mb={'100px'}>
            <Flex width={'44%'} flexDirection={'column'}>
              <ProfileApproval />
            </Flex>
            <Flex width={'44%'} flexDirection={'column'}>
              <ProfileCreateUser />
              {/*<PersonData />*/}
            </Flex>
          </Flex>

          <Flex justifyContent={'space-between'}>
            <Flex width={'44%'} flexDirection={'column'}>
              <ProfileNotification />
            </Flex>
            <Flex width={'44%'} flexDirection={'column'}>
              <ProfileRecoveryEmail />
              {/*<ChangePassword />*/}
            </Flex>
          </Flex>
        </Flex>
      </ErrorCatch>
    );
  }
}

export default ProfilePage;
