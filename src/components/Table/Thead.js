import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Thead as TheadComponent } from 'react-super-responsive-table';
import { OrderProperty } from '../../styles/styleProperty/OrderProperty';

/**
 * Компонент для хранения одной или нескольких строк, которые представлены вверху таблицы
 * @example ./Thead.example.md
 */

export const Thead = styled(TheadComponent)`
  ${OrderProperty};
`;

Thead.propTypes = {
  /**  children React element  */
  children: PropTypes.any,
  /** className */
  className: PropTypes.string,
  /** CSS : background-color */
  bgc: PropTypes.string,
};

export default Thead;
