import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**View */
import Flex from '../../../../components/Flex/Flex';
import Table from '../../../../components/Table/Table';
import Tbody from '../../../../components/Table/Tbody';
import Td from '../../../../components/Table/Td';
import Th from '../../../../components/Table/Th';
import Tr from '../../../../components/Table/Tr';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/** Image */
import { SvgExport } from '../../../../components/Icons/SvgExport';
import { SvgFolder } from '../../../../components/Icons/SvgFolder';

/** Styles property */
import { BorderColorProperty } from '../../../../styles/styleProperty/BorderColorProperty';


const TableStyled = styled(Table)`
  border-collapse: collapse;
  table-layout: fixed;
`;

const TdStyled = styled(Td)`
  border-top: 2px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color7' })}

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
          <Th fontSize={6} lineHeight={8} fontFamily={'primary500'} py={4} textAlign={'left'} width={'100px'} color={'color11'}>
            № Ревизии
          </Th>

          <Th fontSize={6} lineHeight={8} fontFamily={'primary500'} color={'color11'} py={4} width={'500px'}>
            Ф. И. О.
          </Th>

          <Th fontSize={6} lineHeight={8} fontFamily={'primary500'} color={'color11'} py={4}>
            Дата
          </Th>

          <Th fontSize={6} lineHeight={8} fontFamily={'primary500'} color={'color11'} py={4} />
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
