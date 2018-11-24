import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex/Flex';
import ButtonBase from '../ButtonBase/ButtonBase';

export const ButtonWithImage = ({ leftIcon, rightIcon, children, variant, size, mr, ml }) => {
  return (
    <ButtonBase variant={variant} size={size}>
      <Flex justifyContent={'center'} alignItems={'space-around'}>
        {leftIcon && (
          <Flex mr={mr} justifyContent={'center'} alignItems={'center'}>
            {leftIcon}
          </Flex>
        )}

        <Flex justifyContent={'center'} alignItems={'center'}>
          {children}
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

ButtonWithImage.propTypes = {
  /**name button */
  name: PropTypes.string,
  /**left icon */
  leftIcon: PropTypes.any,
  /**right icon */
  rightIcon: PropTypes.any,
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
