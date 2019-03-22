import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**View */
import Text from '@lib/ui/Text/Text';
import Flex from '@lib/ui/Flex/Flex';
import ButtonBase from '@lib/ui/ButtonBase/ButtonBase';
import PaginationPage from '@lib/ui/PaginationPage/PaginationPage';

import { SvgPlay } from '@lib/ui/Icons/SvgPlay';

export class PaginationPageHOC extends Component {
  constructor() {
    super();
    this.state = { pageNumber: 1 };
  }

  dicrement = () => {
    this.state.pageNumber === 1 ? 1 : this.setState({ pageNumber: this.state.pageNumber - 1 });
  };

  increment = () => {
    this.state.pageNumber >= 1
      ? this.setState({ pageNumber: this.state.pageNumber + 1 })
      : this.state.pageNumber;
  };

  render() {
    const { pageNumber } = this.state;

    return (
      <>{this.props.children({ ...this.props, ...this.state }, this.increment, this.dicrement)}</>
    );
  }
}

export default PaginationPageHOC;

// <PaginationPage dicrement={this.dicrement} increment={this.increment} pageNumber={pageNumber} />;
