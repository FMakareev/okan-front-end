import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color, display, width, space, fontWeight, variant, position } from 'styled-system';

/** Style property */
import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';
import { LineHeightProperty } from '../../styles/styleProperty/LineHeightProperty';
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';
import { BorderRadiusProperty } from '../../styles/styleProperty/BorderRadiusProperty';

const buttonsVariant = variant({
  key: 'variant.buttons',
  prop: 'variant',
});
const buttonsSize = variant({
  key: 'variant.buttonSize',
  prop: 'size',
});
const buttonComment = variant({
  key: 'variant.buttonComment',
  prop: 'btnComment',
});

/**
 * Компонента обычная кнопка
 * @example ./ButtonBase.example.md
 */
export const ButtonBase = styled.button`
  outline: none !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  /* ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
   */

  ${BorderRadiusProperty};
  ${buttonsVariant};
  ${buttonsSize};
  ${buttonComment};
  ${space};
  ${position};
  ${width};
  ${color};
  ${display};
  ${fontWeight};
  ${LineHeightProperty};
  ${FontSizeProperty};
  ${BackgroundColorProperty};
  ${BorderRadiusProperty};
`;

ButtonBase.propTypes = {
  /** Background color alias. */
  bgc: PropTypes.string,
  /** Border color alias. */
  bc: PropTypes.string,
  /** Font color. */
  color: PropTypes.string,
  /** Description of prop "px". */
  px: PropTypes.number,
  /** Description of prop "py". */
  py: PropTypes.number,
  /** children. */
  children: PropTypes.any,
  /** disabled. */
  disabled: PropTypes.bool,
  /** Active button */
  active: PropTypes.bool,
};

ButtonBase.defaultProps = { borderRadius: '5px' };

export default ButtonBase;
