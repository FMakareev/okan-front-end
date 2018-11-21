import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, color } from 'styled-system';

/**
 *  Компонент одной ячейки таблицы, которая обозначается как заголовочная.
 * @example ./Th.example.md
 */
export const Th = styled.th`
  ${space};
  ${color};
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
