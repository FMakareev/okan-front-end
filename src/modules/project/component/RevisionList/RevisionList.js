import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

/**View */
import Th from '@lib/ui/Table/Th';
import Tr from '@lib/ui/Table/Tr';
import Table from '@lib/ui/Table/Table';
import Tbody from '@lib/ui/Table/Tbody';
import {RevisionItem} from "../RevisionItem/RevisionItem";


const TableStyled = styled(Table)`
  border-collapse: collapse;
  table-layout: fixed;
`;

export class RevisionList extends Component {
  static propTypes = {};

  state = {};

  render() {
    const {data} = this.props;
    return (
      <TableStyled width={'100%'}>
        <Tr>
          <Th
            fontSize={6}
            lineHeight={8}
            fontFamily={'primary500'}
            py={4}
            textAlign={'left'}
            width={'100px'}
            color={'color11'}>
            № Ревизии
          </Th>

          <Th
            fontSize={6}
            lineHeight={8}
            fontFamily={'primary500'}
            color={'color11'}
            py={4}
            width={'auto'}>
            Ф. И. О.
          </Th>

          <Th width={'175px'} fontSize={6} lineHeight={8} fontFamily={'primary500'} color={'color11'} py={4}>
            Дата
          </Th>

          <Th width={'100px'} fontSize={6} lineHeight={8} fontFamily={'primary500'} color={'color11'} py={4}/>
        </Tr>
        <Tbody>
        {
          data.map((item, index) => (<RevisionItem key={`RevisionItem-${index}`} {...item}/>))
        }

        </Tbody>
      </TableStyled>
    );
  }
}

export default RevisionList;
