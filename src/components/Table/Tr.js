import PropTypes from 'prop-types';
import styled from 'styled-components';
import { width } from 'styled-system';

/** Style property */
import { TextAlignProperty } from '../../styles/styleProperty/TextAlignProperty';

/**
 * Компонент служит контейнером для создания строки таблицы
 * @example ./Tr.example.md
 */
export const Tr = styled.tr`
  ${TextAlignProperty};
  ${width}
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
