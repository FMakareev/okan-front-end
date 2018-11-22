import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, width } from 'styled-system';

/**
 * Компонент таблицы
 * @example ./Table.example.md
 */

export const Table = styled.table`
  ${width};
  ${space};
`;

Table.propTypes = {
  /**  children React element  */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  /** className */
  className: PropTypes.string,
  /** width  */
  width: PropTypes.string,
};

export default Table;
