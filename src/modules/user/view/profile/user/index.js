import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1130px;
  margin-top: 30px;
  background-color: coral;
`;

export const ProfilePage = () => (
  <div>
    <div>1</div>
    <Wrapper>ProfilePageUser</Wrapper>
    <div>3</div>
  </div>
);

export default ProfilePage;
