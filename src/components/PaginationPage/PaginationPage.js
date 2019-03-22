import React, { Component, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

/**View */
import Text from '@lib/ui/Text/Text';
import Flex from '@lib/ui/Flex/Flex';
import Box from '@lib/ui/Box/Box';
import ButtonBase from '@lib/ui/ButtonBase/ButtonBase';
import { SvgPlay } from '@lib/ui/Icons/SvgPlay';

export class PaginationPage extends Component {
  render() {
    const { pageNumber, dataLength, increment, dicrement } = this.props;
    const variantDicrement = pageNumber === 1 ? 'disabled' : 'xsmall';
    const variantIncrement = dataLength ? 'disabled' : 'xsmall';

    return (
      <Box>
        {this.props.children({ ...this.props, ...this.state })}
        <Flex justifyContent={'center'} mt={[4]}>
          <ButtonBase
            onClick={dicrement}
            size={'xsmall'}
            variant={variantDicrement}
            style={{ transform: 'rotate(180deg)' }}>
            {SvgPlay()}
          </ButtonBase>

          <Text
            fontSize={6}
            lineHeight={8}
            color={'color7'}
            textAlign={'center'}
            px={[4]}
            fontFamily={'primary500'}>
            {pageNumber}
          </Text>

          <ButtonBase onClick={increment} size={'xsmall'} variant={variantIncrement}>
            {SvgPlay()}
          </ButtonBase>
        </Flex>
      </Box>
    );
  }
}

export default PaginationPage;
