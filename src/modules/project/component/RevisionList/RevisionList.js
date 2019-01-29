import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { reduxForm, Form, getFormValues } from 'redux-form';

/**View */
import Td from '@lib/ui/Table/Td';
import Th from '@lib/ui/Table/Th';
import Tr from '@lib/ui/Table/Tr';
import Flex from '@lib/ui/Flex/Flex';
import Table from '@lib/ui/Table/Table';
import Tbody from '@lib/ui/Table/Tbody';
import ButtonBase from '@lib/ui/ButtonBase/ButtonBase';

/** Image */
import { SvgExport } from '@lib/ui/Icons/SvgExport';
import { SvgFolder } from '@lib/ui/Icons/SvgFolder';

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

export class RevisionList extends Component {
  static propTypes = {};

  state = {};

  render() {
    const { initialValues } = this.props;

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
            width={'500px'}>
            Ф. И. О.
          </Th>

          <Th fontSize={6} lineHeight={8} fontFamily={'primary500'} color={'color11'} py={4}>
            Дата
          </Th>

          <Th fontSize={6} lineHeight={8} fontFamily={'primary500'} color={'color11'} py={4} />
        </Tr>
        {/*initialValues && initialValues.map(item => console.log(item.name))*/}
        <Tbody>
          <Tr>
            <TdStyled fontFamily={'primary300'} py={4} pl={3}>
              1{/*initialValues[0]*/}
            </TdStyled>
            <TdStyled fontFamily={'primary300'} py={4} textAlign={'center'}>
              {'initialValues'}
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
        </Tbody>
      </TableStyled>
    );
  }
}

RevisionList = connect(
  state => ({ values: getFormValues('RevisionList')(state) }),
  null,
)(RevisionList);

RevisionList = reduxForm({
  form: 'RevisionList',
})(RevisionList);

export default RevisionList;
