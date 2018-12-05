import PropTypes from 'prop-types';
import styled from 'styled-components';
import { display, fontWeight, fontFamily, textAlign, letterSpacing, variant } from 'styled-system';

/** Style property */
import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';
import { FillSvgProperty } from '../../styles/styleProperty/FillSvgProperty';
import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';
import { FontFamileProperty } from '../../styles/styleProperty/FontFamileProperty';
import { LineHeightProperty } from '../../styles/styleProperty/LineHeightProperty';

/** View */
import { Box } from '../Box/Box';

const textVariant = variant({
  key: 'variant.text',
  prop: 'variant',
});

/**
 * Компонент текста
 * @example ./Text.example.md
 */
export const Text = styled(Box)`
  ${textVariant};
  ${display};
  ${letterSpacing};
  ${LineHeightProperty};
  ${textAlign};
  ${FontFamilyProperty};
  ${FontFamileProperty}
  ${fontWeight};
  ${BackgroundColorProperty};
  ${FillSvgProperty};
`;
// TODO review:nik-z: добавь propTypes для варианта и для шрифта, использую перечисление PropTypes.oneOf и туда передай масив доступных в теме значений
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
  ...textAlign.propTypes,
  ...letterSpacing.propTypes,
};
// TODO review:nik-z: забыл прописать пропсы по умолчанию
Text.defaultProps = {
  color: 'fontColor.color1',
};

export default Text;
