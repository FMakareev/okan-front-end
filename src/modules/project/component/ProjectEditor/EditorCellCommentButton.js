import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Flex from '../../../../components/Flex/Flex';

const FlexStyled = styled(Flex)`
  position: relative;
  bottom: 5px;
`;

const Div = styled(Flex)`
  width: 0;
  height: 0;
  position: absolute;
  z-index: 2;
  top: 14px;
  left: 22%;
  transform: rotate(270deg);
  border-style: solid;
  border-width: 0px 5px 7px 0;
  border-color: transparent #df4624 transparent transparent;
`;

export const EditorCellCommentButton = ({ handleClickCommentButton }) => {
  return (
    <ButtonBase
      btnComment={'newComment'}
      color={'color0'}
      fontSize={6}
      lineHeight={5}
      position={'absolute'}
      borderRadius={'4px'}
      onClick={handleClickCommentButton}>
      <FlexStyled alignItems={'center'}>...</FlexStyled>
      <Div />
    </ButtonBase>
  );
};

EditorCellCommentButton.propTypes = {
  /**function for managements components*/
  handleClickCommentButton: PropTypes.func,
};

EditorCellCommentButton.defaultProps = {
  handleClickCommentButton: () => {},
};

export default EditorCellCommentButton;
