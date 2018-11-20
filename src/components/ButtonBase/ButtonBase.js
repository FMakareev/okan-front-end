import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color, display, width, space, fontWeight, variant } from 'styled-system';

import { BorderColorProperty } from '../../styles/styleProperty/BorderColorProperty';
import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';
import { LineHeightRemProperty } from '../../styles/styleProperty/LineHeightRemProperty';
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';
import { BorderRadiusProperty } from '../../styles/styleProperty/BorderRadiusProperty';

const buttonsVariant = variant({
  key: 'variant.buttons',
  prop: 'variant',
});

const buttonsSize = variant({
  key: 'variants.buttonSize',
  prop: 'size',
});

/**
 * Компонента обычная кнопка
 * @example ./ButtonDefault.example.md
 */
export const ButtonBase = styled.button`
  outline: none !important;
  cursor: pointer;
  display: 'flex';
  align-items: 'center';
  justify-content: 'center';
  border-radius: 3px;
  ${buttonsVariant};
  ${buttonsSize};
  ${space};
  ${width};
  ${color};
  ${display};
  ${fontWeight};
  ${LineHeightRemProperty};
  ${FontSizeProperty};
  ${BackgroundColorProperty};
  ${BorderRadiusProperty};
`;

ButtonBase.propTypes = {
  /** Background color alias. */
  bgc: PropTypes.string,
  // /** Background color. */
  // backgroundColor: PropTypes.oneOf([0, 1, 2, 3, 4]),
  /** Border color alias. */
  bc: PropTypes.string,
  // /** Border color. */
  // borderColor: PropTypes.oneOf([0, 1, 2, 3, 4]),
  /** Font color. */
  color: PropTypes.string,
  /** Description of prop "px". */
  px: PropTypes.number,
  /** Description of prop "py". */
  py: PropTypes.number,
  /** children. */
  children: PropTypes.string,
  /** disabled. */
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

ButtonBase.defaultProps = {};

export default ButtonBase;
