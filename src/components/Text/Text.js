import PropTypes from 'prop-types';
import styled from 'styled-components';
import { display, fontWeight, fontFamily, textAlign, letterSpacing } from 'styled-system';

import { FontSizeRemProperty } from '../../styles/styleProperty/FontSizeRemProperty';
import { LineHeightRemProperty } from '../../styles/styleProperty/LineHeightRemProperty';
import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';
import { FillSvgProperty } from '../../styles/styleProperty/FillSvgProperty';

import { Box } from '../Box/Box';
import { FontFamilyProperty } from "../../styles/styleProperty/FontFamilyProperty";

/**
 * Компонент текста
 * @example ./Text.example.md
 */
export const Text = styled(Box)`
  font-family: inherit;
  text-decoration: none;
  ${FontSizeRemProperty};
  ${display};
  ${letterSpacing};
  ${textAlign};
  ${FontFamilyProperty};
  ${fontWeight};
  ${LineHeightRemProperty};
  ${BackgroundColorProperty};
  ${FillSvgProperty};
  ${({ whiteSpace }) => `white-space: ${whiteSpace};`};
  ${({ overflow }) => `overflow: ${overflow};`};
  ${({ textOverflow }) => `text-overflow: ${textOverflow};`};
`;

Text.propTypes = {
  /**  children React element  */
  children: PropTypes.string,
  /** CSS: mb - margin - bottom */
  mb: PropTypes.PropTypes.arrayOf(PropTypes.string),
  /** CSS : color */
  color: PropTypes.string,
  whiteSpace: PropTypes.string,
  textOverflow: PropTypes.string,
  overflow: PropTypes.string,
  /** CSS : fontSize */
  fontSize: PropTypes.number,
  /** CSS : fontSize */
  fz: PropTypes.number,
  /** CSS : lineHeight */
  lineHeight: PropTypes.number,
  /** CSS : lineHeight */
  lh: PropTypes.number,

  ...display.propTypes,
  ...fontWeight.propTypes,
  ...fontFamily.propTypes,
  ...textAlign.propTypes,
  ...letterSpacing.propTypes,
};

Text.defaultProps = {
  color: 'fontColor.color16',
};

export default Text;
