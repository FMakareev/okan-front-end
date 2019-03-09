import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '@lib/ui/ButtonBase/ButtonBase';

/** Image */
import { SvgDocumentComment } from '@lib/ui/Icons/SvgDocumentComment';

const ButtonBaseStyled = styled(ButtonBase)`
  padding: 0;
  margin: 0;
  height: 16px;
  z-index: 11;
`;

export const EditorCellCommentButton = props => {
  const { onClick, status } = props;
  return (
    <ButtonBaseStyled
      btnComment={status}
      color={'color0'}
      fontSize={6}
      lineHeight={5}
      position={'relative'}
      borderRadius={'4px'}
      onClick={onClick}
      {...props}
    >
      <SvgDocumentComment />
    </ButtonBaseStyled>
  );
};

EditorCellCommentButton.propTypes = {
  status: PropTypes.string,
};

EditorCellCommentButton.defaultProps = {
  status: 'emptyComment',
  onClick: () => {},
};

export default EditorCellCommentButton;
