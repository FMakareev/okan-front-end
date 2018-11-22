import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, width, color } from 'styled-system';

/**
 * Компонент одной ячейки таблицы.
 * @example ./Td.example.md
 */
const Td = styled.td`
  ${space};
  ${color};
  ${width};
`;

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
