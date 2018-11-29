import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**Components */
import Text from '../../../../../components/Text/Text';
import Flex from '../../../../../components/Flex/Flex';
import Tbody from '../../../../../components/Table/Tbody';
import Td from '../../../../../components/Table/Td';
import Tr from '../../../../../components/Table/Tr';

const TrStyled = styled(Tr)`
  display: flex;
  justify-content: space-around;
  padding: 3px 0;
  cursor: pointer;

  &:hover {
    background-color: #007faf21;
  }
`;

const TbodyStyled = styled(Tbody)`
  border: 1px solid #848484;
  border-radius: 5px;
  margin: 10px 0 0 0;
`;

export class ProfileApproval extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Text fz={6} lh={7} color={'color7'} textAlign={'center'} mb={13} fontFamily={'primary500'}>
          На согласование
        </Text>
        <Tbody>
          <Flex justifyContent={'space-around'}>
            <Text fz={5} lh={6} fontFamily={'primary500'}>
              Номер документа
            </Text>

            <Text fz={5} lh={6} fontFamily={'primary500'}>
              Название документа
            </Text>
          </Flex>
        </Tbody>
        <TbodyStyled>
          <TrStyled>
            <Td fontFamily={'primary500'}>234151</Td>
            <Td fontFamily={'secondaryBold'}>ТЗ - RK-186-344</Td>
          </TrStyled>
        </TbodyStyled>
        <TbodyStyled>
          <TrStyled>
            <Td fontFamily={'primary500'}>234151</Td>
            <Td fontFamily={'secondaryBold'}>ТЗ - RK-186-344</Td>
          </TrStyled>
        </TbodyStyled>
      </Fragment>
    );
  }
}

export default ProfileApproval;
