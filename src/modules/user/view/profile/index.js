import React, { Component } from 'react';
import styled from 'styled-components';

import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';

import ProfileApproval from '../../component/ProfileApproval/ProfileApproval';
import ProfileCreateUser from '../../component/ProfileCreateUser/ProfileCreateUser';
import ProfileNotification from '../../component/ProfileNotification/ProfileNotification';
import ProfileRecoveryEmail from '../../component/ProfileRecoveryEmail/ProfileRecoveryEmail';

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
            </Flex>
          </Flex>

          <Flex justifyContent={'space-between'}>
            <Flex width={'44%'} flexDirection={'column'}>
              <ProfileNotification />
            </Flex>
            <Flex width={'44%'} flexDirection={'column'}>
              <ProfileRecoveryEmail />
            </Flex>
          </Flex>
        </Flex>
      </ErrorCatch>
    );
  }
}

export default ProfilePage;
