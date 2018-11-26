import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Flex from '../../../../components/Flex/Flex';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';

import { SvgPlay } from '../../../../components/Icons/SvgPlay';

export const FormButton = ({ disabled, children }) => {
  return (
    <Flex justifyContent={'center'}>
      <ButtonWithImage
        type="submit"
        disabled={disabled}
        variant={'large'}
        size={'large'}
        children={children}
        rightIcon={SvgPlay()}
      />
    </Flex>
  );
};

export default FormButton;
