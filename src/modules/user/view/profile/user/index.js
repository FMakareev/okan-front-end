import React from 'react';
import styled from 'styled-components';

import Wrapper from '../components/Wrapper';

const Primary300 = styled.p`
  font-family: ${props => props.theme.fontFamily.primary300};
`;

const Primary500 = styled.p`
  font-family: ${props => props.theme.fontFamily.primary500};
  /* font-family: 'Museo Sans 500'; */
`;

const Primary700 = styled.p`
  font-family: ${props => props.theme.fontFamily.primary700};

  /* font-family: 'Museo Sans 700'; */
`;

const Secondary = styled.p`
  font-family: ${props => props.theme.fontFamily.secondary};
  /* font-family: 'Museo Sans 500'; */
`;

const SecondaryBold = styled.p`
  font-family: ${props => props.theme.fontFamily.secondaryBold};
  /* font-family: 'Museo Sans 700'; */
`;

export const ProfilePage = () => (
  <Wrapper>
    <Primary300>ProfilePageUser</Primary300>
    <Primary500>ProfilePageUser</Primary500>
    <Primary700>ProfilePageUser</Primary700>
    <Secondary>ProfilePageUser</Secondary>
    <SecondaryBold>ProfilePageUser</SecondaryBold>
  </Wrapper>
);

export default ProfilePage;
