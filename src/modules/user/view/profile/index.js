import React, { Component } from 'react';
import styled from 'styled-components';

import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';

import ProfileApproval from '../../component/ProfileApproval/ProfileApproval';
import ProfileCreateUser from '../../component/ProfileCreateUser/ProfileCreateUser';

export class ProfilePage extends Component {
  state = {};
  render() {
    return (
      <ErrorCatch>
        <Flex ml={'240px'} mr={'70px'} justifyContent={'space-between'}>
          <Flex flexDirection={'column'} width={'44%'}>
            <ProfileApproval />
            <div>1</div>
          </Flex>

          <Flex flexDirection={'column'} width={'44%'}>
            <ProfileCreateUser />

            <div>4</div>
          </Flex>
        </Flex>
      </ErrorCatch>
    );
  }
}

export default ProfilePage;
