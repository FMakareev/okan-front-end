import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from 'styled-system';

/** View */
import Flex from '../Flex/Flex';
import ButtonWithImage from '../ButtonWithImage/ButtonWithImage';
import SmallPreloader from '../SmallPreloader/SmallPreloader';

/** Image */
import { SvgPlay } from '../Icons/SvgPlay';

/** style property */
import { LineHeightProperty } from '../../styles/styleProperty/LineHeightProperty';
import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';

const Error = styled.span`
  ${props => FontFamilyProperty({ ...props, fontFamily: 'secondary' })};
  ${props => FontSizeProperty({ ...props, fontSize: '16px' })};
  ${props => LineHeightProperty({ ...props, lineHeight: '18px' })};
  ${props => color({ ...props, color: 'color12' })};
`;

export const FormButtonSubmit = ({ disabled, children, ml, error, isLoading }) => {
  const buttonIconRender = isLoading ? <SmallPreloader /> : SvgPlay();

  return (
    <Flex flexDirection={'column'} justifyContent={'center'}>
      {error && <Error>{error}</Error>}
      <ButtonWithImage
        type="submit"
        disabled={disabled}
        variant={'large'}
        size={'large'}
        rightIcon={buttonIconRender}
        ml={ml}>
        {children}
      </ButtonWithImage>
    </Flex>
  );
};

FormButtonSubmit.propTypes = {
  /** disabled input */
  disabled: PropTypes.bool,
  /** name button */
  children: PropTypes.string,
  /** css property: margin-left */
  ml: PropTypes.number,
  /** error */
  error: PropTypes.string,
};

export default FormButtonSubmit;

// &:disabled {
//   cursor: default;
//   border-color: ${props => CreateColor(color(props).borderColor)
//       .darken(0.7)
//       .hex()};
// }
