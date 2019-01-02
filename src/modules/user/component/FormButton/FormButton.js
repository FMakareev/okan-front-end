import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from 'styled-system';

/** View */
import Flex from '../../../../components/Flex/Flex';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';

/** Image */
import { SvgPlay } from '../../../../components/Icons/SvgPlay';

/** style property */

import { LineHeightProperty } from '../../../../styles/styleProperty/LineHeightProperty';
import { FontFamilyProperty } from '../../../../styles/styleProperty/FontFamilyProperty';
import { FontSizeProperty } from '../../../../styles/styleProperty/FontSizeProperty';

const Error = styled.span`
  position: absolute;
  top: -16px;
  left: 0;
  ${props => FontFamilyProperty({ ...props, fontFamily: 'secondary' })};
  ${props => FontSizeProperty({ ...props, fontSize: '16px' })};
  ${props => LineHeightProperty({ ...props, lineHeight: '18px' })};
  ${props => color({ ...props, color: 'color12' })};
`;

export const FormButton = ({ disabled, children, ml, error }) => {
  return (
    <Flex justifyContent={'center'}>
      <ButtonWithImage
        type="submit"
        disabled={disabled}
        variant={'large'}
        size={'large'}
        children={children}
        rightIcon={SvgPlay()}
        ml={ml}>
        {error && <Error>{error}</Error>}
        {children}
      </ButtonWithImage>
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
