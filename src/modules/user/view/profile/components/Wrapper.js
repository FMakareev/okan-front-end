import React from 'react';
import styled from 'styled-components';

import Flex from '../../../../../components/Flex/Flex';

const LeftPadding = styled.div`
  width: 15%;
`;

const RigthPadding = styled.div`
  width: 5%;
`;

const CentralSection = styled.div`
  width: 80%;
  max-width: 1130px;
  background-color: white;
`;
export const Wrapper = ({ children }) => (
  <Flex>
    <LeftPadding />
    <CentralSection>{children}</CentralSection>
    <RigthPadding />
  </Flex>
);

export default Wrapper;
