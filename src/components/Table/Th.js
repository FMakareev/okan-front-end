import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, color, width } from 'styled-system';

/** Style property */
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';
import { LineHeightProperty } from '../../styles/styleProperty/LineHeightProperty';
import { TextAlignProperty } from '../../styles/styleProperty/TextAlignProperty';
import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';

/**
 *  Компонент одной ячейки таблицы, которая обозначается как заголовочная.
 * @example ./Th.example.md
 */
export const Th = styled.th`
  ${space};
  ${color};
  ${width};
  ${FontSizeProperty};
  ${LineHeightProperty};
  ${FontFamilyProperty};
  ${TextAlignProperty};
`;

Th.propTypes = {
  /**  children React element  */
  children: PropTypes.any,
  /** columnKey  */
  columnKey: PropTypes.number,
  /** CSS: pb - padding-bottom  */
  pb: PropTypes.number,
  /** CSS: pt - padding-top  */
  pt: PropTypes.number,
  /** CSS : color */
  color: PropTypes.string,
};

export default Th;
