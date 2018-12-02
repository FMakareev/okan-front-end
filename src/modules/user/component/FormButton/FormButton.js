import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** View */
import Flex from '../../../../components/Flex/Flex';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';

/** Image */
import { SvgPlay } from '../../../../components/Icons/SvgPlay';

export const FormButton = ({ disabled, children, ml }) => {
  return (
    <Flex justifyContent={'center'}>
      <ButtonWithImage
        type="submit"
        disabled={disabled}
        variant={'large'}
        size={'large'}
        children={children}
        rightIcon={SvgPlay()}
        ml={ml}
      />
    </Flex>
  );
};

FormButton.propTypes = {
  /** disabled input */
  disabled: PropTypes.bool,
  /** name button */
  children: PropTypes.string,
  /** css property: margin-left */
  ml: PropTypes.number,
};

export default FormButton;
