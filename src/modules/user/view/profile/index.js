import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**View*/
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';

/**Components Admin*/
import ProfileApproval from '../../component/admin/ProfileApproval/ProfileApproval';
import ProfileCreateUser from '../../component/admin/ProfileCreateUser/ProfileCreateUser';
import ProfileNotification from '../../component/admin/ProfileNotification/ProfileNotification';
import ProfileRecoveryEmail from '../../component/admin/ProfileRecoveryEmail/ProfileRecoveryEmail';

/** Components User*/
import PersonData from '../../component/user/PersonData/PersonData';
import ChangePassword from '../../component/user/ChangePassword/ChangePassword';

/**PropTypes*/
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

const FlexStyled = styled(Flex)`
  width: calc(100% - 600px + 60px);
`;

export class ProfilePage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};
  render() {
    return (
      <ErrorCatch>
        <Flex ml={'10%'} mr={'70px'} mt={9} flexDirection={'column'}>
          <Flex justifyContent={'space-between'} mb={'100px'}>
            <FlexStyled flexDirection={'column'}>
              <ProfileApproval />
            </FlexStyled>
            <Flex width={'35%'} flexDirection={'column'}>
              <ProfileCreateUser />
              {/* <PersonData />*/}
            </Flex>
          </Flex>

          <Flex justifyContent={'space-between'}>
            <FlexStyled flexDirection={'column'}>
              <ProfileNotification />
            </FlexStyled>
            <Flex width={'35%'} flexDirection={'column'}>
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
