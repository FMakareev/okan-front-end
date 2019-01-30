import React, { useState, Component } from 'react';

import PropTypes from 'prop-types';
import { Mutation, withApollo } from 'react-apollo';

import CreateCellMutation from './CreateCellMutation.graphql';
/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Box from '../../../../components/Box/Box';

/**Image */
import { SvgSidebarAdd } from '../../../../components/Icons/SvgSidebarAdd';
import { AbsoluteStyled, BoxStyled } from './SidebarCreateCellStyled';

/** Styles property */

export class SidebarCreateCell extends Component {
  static propTypes = {
    /** @desc id предыдущей ячейки, той после которой будет добавлен раздел, этот id будет являтся parent для подраздела */
    prevcell: PropTypes.string.isRequired,
    /** @desc id ячейки родетеля это общее для ячейки prevcell и той что будет создана следом */
    parent: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }
  get initialState() {
    return {
      toggle: false,
    };
  }

  onToggle = event => {
    event && event.stopPropagation();
    this.setState(state => ({ toggle: !state.toggle }));
  };

  submit = (prevcell, parent) => {
    console.log(22, prevcell, parent);
    this.onToggle();
    this.props.client
      .mutate({
        mutation: CreateCellMutation,
        variables: { prevcell, parent },
      })
      .then(response => {
        console.log('SidebarCreateCell response: ', response);
        this.props.addNodeInTree(response.data.createcell.cell);
      })
      .catch(error => {
        console.error('Error SidebarCreateCell: ', error);
      });
  };

  render() {
    const { prevcell, parent } = this.props;
    const { toggle } = this.state;
    return (
      <Box position={'relative'}>
        <ButtonBase
          title={'Добавить подраздел или раздел.'}
          variant={'empty'}
          onClick={this.onToggle}>
          <SvgSidebarAdd />
        </ButtonBase>

        {toggle && (
          <AbsoluteStyled
            onClick={event => {
              event.stopPropagation();
            }}
            top={'20px'}
            right={'0'}>
            <BoxStyled
              onClick={() => {
                this.submit(prevcell, parent);
              }}>
              Раздел
            </BoxStyled>
            <BoxStyled
              onClick={() => {
                this.submit(null, parent);
              }}>
              Подраздел
            </BoxStyled>
          </AbsoluteStyled>
        )}
      </Box>
    );
  }
}
// SidebarCreateCell = graphql(CreateCellMutation, {
//   name: '@apollo/create',
// })(SidebarCreateCell);

SidebarCreateCell = withApollo(SidebarCreateCell);

export default SidebarCreateCell;
