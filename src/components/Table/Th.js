import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, color } from 'styled-system';
import { Th as ThComponent } from 'react-super-responsive-table';
import { OrderProperty } from '../../styles/styleProperty/OrderProperty';

/**
 *  Компонент одной ячейки таблицы, которая обозначается как заголовочная.
 * @example ./Th.example.md
 */
export const Th = styled(ThComponent)`
  ${space};
  ${color};
  ${OrderProperty}
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
