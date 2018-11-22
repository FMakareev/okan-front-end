import PropTypes from 'prop-types';

import { Link as DefaultLink } from 'react-router-dom';
import styled from 'styled-components';
import { space, width, display, color } from 'styled-system';
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';

export const Link = styled(DefaultLink)`
  color: ${props => props.theme.colors.color2};
  ${space};
  ${width};
  ${FontSizeProperty};
  ${display};
  ${color};

  ${({ textDecoration }) => `text-decoration: ${textDecoration};`} &:hover {
    color: ${props => props.theme.colors.color3};
  }
`;

Link.propTypes = {
  /** Children */
  children: PropTypes.any,
  /** Description of prop "px: padding-left and padding-right". */
  px: PropTypes.number,
  /** Description of prop "py: padding-top and padding-bottom". */
  py: PropTypes.number,
  /** Description of font sizes */
  fontSize: PropTypes.number,
  /** Description of proline-height. */
  lh: PropTypes.number,
  /** Description of prop "ml: margin-left". */
  ml: PropTypes.number,
  /** Description of prop "mb: margin-bottom". */
  mb: PropTypes.number,
  textDecoration: PropTypes.string,
};

Link.defaultProps = {
  textDecoration: 'none',
};

/**
 * Компонент ссылки
 * @example ./Link.example.md
 */

export default Link;
