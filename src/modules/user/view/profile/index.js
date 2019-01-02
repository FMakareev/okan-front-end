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

const FlexStyled = styled(Flex)`
  width: calc(100% - 630px);
`;

export class ProfilePage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};
  render() {
    return <ErrorCatch>
        <Flex ml={'10%'} mr={'70px'} mt={9} flexDirection={'column'}>
          <Flex justifyContent={'space-between'} mb={'100px'}>
            <FlexStyled flexDirection={'column'}>
              <ProfileApproval data={{name:'23415', number:'ТЗ - RK-186-344'}}/>
            </FlexStyled>

            <Flex width={'35%'} flexDirection={'column'}>
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
            </Flex>
          </Flex>

          <Flex justifyContent={'space-between'}>
            <FlexStyled flexDirection={'column'}>
              <ProfileNotification data={{
                id:'23415', 
                message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim'}} />
            </FlexStyled>

            <Flex width={'35%'} flexDirection={'column'}>
              <ProfileRecoveryEmail />
              {/* <ChangePassword />*/}
            </Flex>
          </Flex>
        </Flex>
      </ErrorCatch>;
  }
}

export default ProfilePage;
