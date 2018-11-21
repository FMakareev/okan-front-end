import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex/Flex';
import ButtonBase from '../ButtonBase/ButtonBase';

export const ButtonWithImage = ({ leftIcon, rightIcon, name, variant, size, mr, ml }) => {
  return (
    <ButtonBase variant={variant} size={size}>
      <Flex justifyContent={'center'} alignItems={'center'}>
        {leftIcon && (
          <Flex mr={mr} justifyContent={'center'} alignItems={'center'}>
            {leftIcon}
          </Flex>
        )}

        <Flex justifyContent={'center'} alignItems={'center'}>
          {name}
        </Flex>

        {rightIcon && (
          <Flex ml={ml} justifyContent={'center'} alignItems={'center'}>
            {rightIcon}
          </Flex>
        )}
      </Flex>
    </ButtonBase>
  );
};

ButtonWithImage.PropTypes = {
  /**name button */
  name: PropTypes.string,
  /**left icon */
  leftIcon: PropTypes.string,
  /**right icon */
  rightIcon: PropTypes.string,
  /**variant button */
  variant: PropTypes.string,
  /**size button */
  size: PropTypes.string,
  /**css value - margin-right */
  mr: PropTypes.string,
  /**css value - margin-left */
  ml: PropTypes.string,
};

export default ButtonWithImage;
