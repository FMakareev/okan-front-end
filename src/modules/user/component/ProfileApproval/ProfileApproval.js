import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';
import Tbody from '../../../../components/Table/Tbody';
import Td from '../../../../components/Table/Td';
import Tr from '../../../../components/Table/Tr';

const TrStyled = styled(Tr)`
  display: flex;
  justify-content: space-around;
`;

const TbodyStyled = styled(Tbody)`
  border: 1px solid #848484;
  border-radius: 5px;
  margin: 10px 0 0 0;
`;

const TdStyled = styled(Td)`
  font-weight: 700;
`;

export class ProfileApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Text fz={6} lh={7} color={'color7'} textAlign={'center'} mb={13}>
          На согласование
        </Text>
        <Tbody>
          <TrStyled>
            <Td>Номер документа</Td>
            <Td>Название документа</Td>
          </TrStyled>
        </Tbody>
        <TbodyStyled>
          <TrStyled>
            <Td>234151</Td>
            <TdStyled>ТЗ - RK-186-344</TdStyled>
          </TrStyled>
        </TbodyStyled>
        <TbodyStyled>
          <TrStyled>
            <Td>234151</Td>
            <TdStyled>ТЗ - RK-186-344</TdStyled>
          </TrStyled>
        </TbodyStyled>
      </Fragment>
    );
  }
}

export default ProfileApproval;
