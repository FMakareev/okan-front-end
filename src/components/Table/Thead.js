import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Компонент для хранения одной или нескольких строк, которые представлены вверху таблицы
 * @example ./Thead.example.md
 */

export const Thead = styled.thead``;

Thead.propTypes = {
  /**  children React element  */
  children: PropTypes.any,
  /** className */
  className: PropTypes.string,
  /** CSS : background-color */
  bgc: PropTypes.string,
};

export default Thead;
