import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, display, width, space } from 'styled-system';

import { BorderColorProperty } from '../../styles/styleProperty/BorderColorProperty';
import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';
import { LineHeightProperty } from '../../styles/styleProperty/LineHeightProperty';
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';
import { BorderRadiusProperty } from '../../styles/styleProperty/BorderRadiusProperty';

/**
 * Компонента обычная кнопка
 * @example ./ButtonDefault.example.md
 */

export const ButtonTransparent = styled.button`
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  background-color: transparent;
  font-weight: 400;
  outline: none;
  box-shadow: none;
  border: none;
  ${color};
  ${display};
  ${space};
  ${width};
  ${BorderRadiusProperty};
  ${BorderColorProperty};
  ${BackgroundColorProperty};
  ${FontSizeProperty};
  ${LineHeightProperty};

  :disabled {
    cursor: default;
    opacity: 0.8;
  }

  :focus {
    outline: none;
    box-shadow: #37b770;
  }
`;

ButtonTransparent.propTypes = {
  /** Background color alias. */
  bgc: PropTypes.string,
  /** Background color. */
  backgroundColor: PropTypes.oneOf([0, 1, 2, 3, 4]),
  /** Border color alias. */
  bc: PropTypes.string,
  /** Border color. */
  borderColor: PropTypes.oneOf([0, 1, 2, 3, 4]),
  /** Font color. */
  color: PropTypes.string,
  /** Description of prop "px". */
  px: PropTypes.number,
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  /** Description of prop "py". */
  py: PropTypes.number,
  /** children. */
  children: PropTypes.string,
  /** disabled. */
  disabled: PropTypes.bool,
};

ButtonTransparent.defaultProps = {
  color: 'line.color21',
};

export default ButtonTransparent;
