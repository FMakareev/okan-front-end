import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, width, color } from 'styled-system';
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';
import { LineHeightProperty } from '../../styles/styleProperty/LineHeightProperty';
import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';

/**
 * Компонент одной ячейки таблицы.
 * @example ./Td.example.md
 */
export const Td = styled.td`
  ${space};
  ${color};
  ${width};
  ${FontSizeProperty};
  ${LineHeightProperty};
  ${FontFamilyProperty}
`;

Td.defaultProps = {
  color: '#333333',
  fontSize: '18px',
  lineHeight: '24px',
};

Td.propTypes = {
  /**  children React element  */
  children: PropTypes.any,
  /** columnKey  */
  columnKey: PropTypes.number,
  /** CSS: pb - padding-bottom  */
  pb: PropTypes.number,
  /** CSS: pt - padding-top  */
  pt: PropTypes.number,
};

export default Td;
