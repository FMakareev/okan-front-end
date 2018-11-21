import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tr as TrComponent } from 'react-super-responsive-table';
import { OrderProperty } from '../../styles/styleProperty/OrderProperty';

/**
 * Компонент служит контейнером для создания строки таблицы
 * @example ./Tr.example.md
 */
export const Tr = styled(TrComponent)`
  border: 0 !important;
  ${OrderProperty};
`;

Tr.propTypes = {
  /**  children React element  */
  children: PropTypes.arrayOf(PropTypes.element),
  /** className */
  className: PropTypes.string,
  /** CSS : background-color */
  bgc: PropTypes.string,
};

export default Tr;
