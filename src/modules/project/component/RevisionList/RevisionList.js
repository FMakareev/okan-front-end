import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**View */
import Text from '../../../../components/Text/Text';
import Flex from '../../../../components/Flex/Flex';
import Table from '../../../../components/Table/Table';
import Thead from '../../../../components/Table/Thead';
import Tbody from '../../../../components/Table/Tbody';
import Td from '../../../../components/Table/Td';
import Th from '../../../../components/Table/Th';
import Tr from '../../../../components/Table/Tr';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/** Image */
import { SvgExport } from '../../../../components/Icons/SvgExport';
import { SvgFolder } from '../../../../components/Icons/SvgFolder';

const TableStyled = styled(Table)`
  border-collapse: collapse;
  table-layout: fixed;
`;

const TdStyled = styled(Td)`
  border-top: 2px solid #00649c;
`;

class RevisionList extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <TableStyled width={'100%'}>
        <Tr>
          <Th fz={5} lh={6} fontFamily={'primary500'} py={4} textAlign={'left'} width={'100px'}>
            № Ревизии
          </Th>

          <Th fz={5} lh={6} fontFamily={'primary500'} py={4} width={'500px'}>
            Ф. И. О.
          </Th>

          <Th fz={5} lh={6} fontFamily={'primary500'} py={4}>
            Дата
          </Th>

          <Th fz={5} lh={6} fontFamily={'primary500'} py={4} />
        </Tr>
        <Tbody>
          <Tr>
            <TdStyled fontFamily={'primary300'} py={4} pl={3}>
              1
            </TdStyled>
            <TdStyled fontFamily={'primary300'} py={4} textAlign={'center'}>
              Циалковский Святослав Валентинович
            </TdStyled>
            <TdStyled fontFamily={'primary300'} py={4} textAlign={'center'}>
              12.11.2018
            </TdStyled>
            <TdStyled fontFamily={'primary300'}>
              <Flex justifyContent={'center'}>
                <ButtonBase variant={'empty'}>{SvgFolder()}</ButtonBase>

                <ButtonBase variant={'empty'}>{SvgExport()}</ButtonBase>
              </Flex>
            </TdStyled>
          </Tr>

          <Tr>
            <TdStyled fontFamily={'primary300'} py={4} pl={3}>
              1
            </TdStyled>
            <TdStyled fontFamily={'primary300'} py={4} textAlign={'center'}>
              Циалковский Святослав Валентинович
            </TdStyled>
            <TdStyled fontFamily={'primary300'} py={4} textAlign={'center'}>
              12.11.2018
            </TdStyled>
            <TdStyled fontFamily={'primary300'} py={4}>
              <Flex justifyContent={'center'}>
                <ButtonBase variant={'empty'}>{SvgFolder()}</ButtonBase>

                <ButtonBase variant={'empty'}>{SvgExport()}</ButtonBase>
              </Flex>
            </TdStyled>
          </Tr>
        </Tbody>
      </TableStyled>
    );
  }
}

export default RevisionList;
