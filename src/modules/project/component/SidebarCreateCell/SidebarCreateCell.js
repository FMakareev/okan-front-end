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
import {BLOCK_IMAGE, BLOCK_TABLE, BLOCK_TEXT} from "@lib/shared/blockType";

/** Styles property */

export class SidebarCreateCell extends Component {
  static propTypes = {
    /** @desc id предыдущей ячейки, той после которой будет добавлен раздел, этот id будет являтся parent для подраздела */
    prevcell: PropTypes.string,
    /** @desc id ячейки родетеля это общее для ячейки prevcell и той что будет создана следом */
    parent: PropTypes.string,
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

  submit = (prevcell, parent, isHead, contenttype) => {
    this.onToggle();
    this.props.client
      .mutate({
        mutation: CreateCellMutation,
        variables: { prevcell, parent, isHead, contenttype },
      })
      .then(response => {
        console.log('SidebarCreateCell response: ', response);
        if(isHead){
          this.props.addNodeInTree(response.data.createcell.cell);
        }
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
                this.submit(prevcell, parent, true);
              }}>
              Раздел
            </BoxStyled>
            <BoxStyled
              onClick={() => {
                this.submit(null, parent, true);
              }}>
              Подраздел
            </BoxStyled>
            <BoxStyled
              onClick={() => {
                this.submit(null, parent, false, BLOCK_TEXT);
              }}>
              Добавить текст
            </BoxStyled>
            <BoxStyled
              onClick={() => {
                this.submit(null, parent, false, BLOCK_IMAGE);
              }}>
              Добавить изображение
            </BoxStyled>
            <BoxStyled
              onClick={() => {
                this.submit(null, parent, false, BLOCK_TABLE);
              }}>
              Добавить таблица
            </BoxStyled>
          </AbsoluteStyled>
        )}
      </Box>
    );
  }
}

SidebarCreateCell = withApollo(SidebarCreateCell);

export default SidebarCreateCell;
