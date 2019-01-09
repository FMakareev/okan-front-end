import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**View*/
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';

/**Components Admin*/
import ProfileApproval from '../../component/ProfileApproval/ProfileApproval';
import ProfileCreateUser from '../../component/ProfileCreateUser/ProfileCreateUser';
import ProfileNotification from '../../component/ProfileNotification/ProfileNotification';
import ProfileRecoveryEmail from '../../component/ProfileRecoveryEmail/ProfileRecoveryEmail';

/** Components User*/
import PersonData from '../../component/PersonData/PersonData';
import ChangePassword from '../../component/ChangePassword/ChangePassword';

/**PropTypes*/
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

const LeftColumn = styled(Flex)`
  width: calc(100% - 400px);
  
  @media(min-width: 1200px){
    width: calc(100% - 480px);
  }
`;

const RightColumn = styled(Flex)`
  width: 360px;
  
  @media(min-width: 1200px){
    width: 400px;
  }
`;

export class ProfilePage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};
  render() {
    return <ErrorCatch>
        <Flex ml={'10%'} mr={'70px'} mt={9} flexDirection={'column'}>
          <Flex justifyContent={'space-between'} mb={'100px'}>
            <LeftColumn flexDirection={'column'}>
              <ProfileApproval data={{name:'23415', number:'ТЗ - RK-186-344'}}/>
            </LeftColumn>

            <RightColumn flexDirection={'column'}>
             <ProfileCreateUser />

              {/*   <PersonData
                lastName={'Колесников'}
                firstName={'Александр'}
                patronymic={'Владиславович'}
                birthdate={'12.12.1984'}
                position={'Специалист по технической документации'}
                phone={'8-999-888-77-66'}
                email={'email@okan.su'}
              />
              */}
            </RightColumn>
          </Flex>

          <Flex justifyContent={'space-between'}>
            <LeftColumn flexDirection={'column'}>
              <ProfileNotification data={{
                id:'23415',
                message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim'}} />
            </LeftColumn>

            <RightColumn flexDirection={'column'}>
              <ProfileRecoveryEmail />
              {/* <ChangePassword />*/}
            </RightColumn>
          </Flex>
        </Flex>
      </ErrorCatch>;
  }
}

export default ProfilePage;
