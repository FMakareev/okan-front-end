import React, { Fragment } from 'react';
import { Absolute } from 'rebass';
import styled from 'styled-components';
import { color } from 'styled-system';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Box from '../../../../components/Box/Box';

/**Image */
import { SvgSidebarAdd } from '../../../../components/Icons/SvgSidebarAdd';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';
import FontSizeProperty from '../../../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../../../styles/styleProperty/LineHeightProperty';

const AbsoluteStyled = styled(Absolute)`
  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
`;

const BoxStyled = styled(Box)`
  ${props => FontSizeProperty({ ...props, fontSize: 5 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 7 })};
  ${props => color({ ...props, color: 'color11' })};
  padding: 0 3px;
  text-align: center;
  cursor: pointer;

  :hover {
    background-color: #007faf21;
  }
`;

const BoxStyle = styled(Box)`
  ${props => FontSizeProperty({ ...props, fontSize: 5 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 7 })};
  ${props => color({ ...props, color: 'color11' })};
  border-top: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color7' })};
  padding: 0 3px;
  text-align: center;
  cursor: pointer;

  :hover {
    background-color: #007faf21;
  }
`;

export const SidebarCreateCell = ({ handleClickCreateCell, isOpen }) => {
  const Modal = (
    <AbsoluteStyled top={'24%'} left={'25%'}>
      <BoxStyled>Раздел</BoxStyled>
      <BoxStyle>Подраздел</BoxStyle>
    </AbsoluteStyled>
  );

  return (
    <Fragment>
      <ButtonBase variant={'empty'} onClick={handleClickCreateCell}>
        {SvgSidebarAdd()}
      </ButtonBase>

      {isOpen && Modal}
    </Fragment>
  );
};

SidebarCreateCell.propTypes = {
  /*data for comment*/
  data: PropTypes.string,
  /**isOpen  */
  isOpen: PropTypes.bool,
};

SidebarCreateCell.defaultProps = {
  data: '',
  isOpen: false,
};

export default SidebarCreateCell;
