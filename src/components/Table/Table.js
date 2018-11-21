import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, width } from 'styled-system';
import { Table as TableComponent } from 'react-super-responsive-table';
import { OrderProperty } from '../../styles/styleProperty/OrderProperty';

export const Table = styled(TableComponent)`
  ${width};
  ${space};
  ${OrderProperty}
`;

/**
 * Компонент таблицы
 * @example ./Table.example.md
 */

Table.propTypes = {
  /**  children React element  */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  /** className */
  className: PropTypes.string,
  /** width  */
  width: PropTypes.string,
};

export default Table;
