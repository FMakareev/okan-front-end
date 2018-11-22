import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Компонент для хранения одной или нескольких строк, которые представлены вверху таблицы
 * @example ./Tfoot.example.md
 */

export const Tfoot = styled.tfoot``;

Tfoot.propTypes = {
  /**  children React element  */
  children: PropTypes.any,
  /** className */
  className: PropTypes.string,
  /** CSS : background-color */
  bgc: PropTypes.string,
};

export default Tfoot;
