import React, { Component } from 'react';

import Flex from '../Flex/Flex';
import ButtonBase from '../ButtonBase/ButtonBase';

class ButtonWithImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { leftIcon, rightIcon, name, variant, size, mr, ml } = this.props;
    return (
      <ButtonBase variant={variant} size={size}>
        <Flex justifyContent={'center'} alignItems={'center'}>
          <Flex mr={mr} justifyContent={'center'} alignItems={'center'}>
            {leftIcon}
          </Flex>

          <Flex justifyContent={'center'} alignItems={'center'}>
            {name}
          </Flex>

          <Flex ml={ml} justifyContent={'center'} alignItems={'center'}>
            {rightIcon}
          </Flex>
        </Flex>
      </ButtonBase>
    );
  }
}

export default ButtonWithImage;
