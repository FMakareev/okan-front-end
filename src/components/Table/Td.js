import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, width, color } from 'styled-system';
import { Td as TdComponent } from 'react-super-responsive-table';
import { OrderProperty } from '../../styles/styleProperty/OrderProperty';

const NewTd = styled(TdComponent)`
  ${space};
  ${color};
  ${width};
  ${OrderProperty};
`;

/**
 * Компонент одной ячейки таблицы.
 * @example ./Td.example.md
 */

export class Td extends Component {
  static propTypes = {
    /**  children React element  */
    children: PropTypes.any,
    /** columnKey  */
    columnKey: PropTypes.number,
    /** CSS: pb - padding-bottom  */
    pb: PropTypes.number,
    /** CSS: pt - padding-top  */
    pt: PropTypes.number,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    return <NewTd {...this.props} />;
  }
}

export default Td;
