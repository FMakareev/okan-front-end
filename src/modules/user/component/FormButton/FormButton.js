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

// TODO review: позиционарование абсолютное не нужно, можно просто над кнопкой положить сообщение, сравни изменения в коммите
const Error = styled.span`
  //
  // position: absolute;
  // top: -16px;
  // left: 0;
  ${props => FontFamilyProperty({ ...props, fontFamily: 'secondary' })};
  ${props => FontSizeProperty({ ...props, fontSize: '16px' })};
  ${props => LineHeightProperty({ ...props, lineHeight: '18px' })};
  ${props => color({ ...props, color: 'color12' })};
`;

export const FormButton = ({ disabled, children, ml, error }) => {
  return (
    <Flex flexDirection={'column'} justifyContent={'center'}>
      {error && <Error>{error}</Error>}
      <ButtonWithImage
        type="submit"
        disabled={disabled}
        variant={'large'}
        size={'large'}
        children={children}
        rightIcon={SvgPlay()}
        ml={ml}>
        {children}
      </ButtonWithImage>
    </Flex>
  );
};

// TODO review: не все в пропсах описано, допиши

FormButton.propTypes = {
  /** disabled input */
  disabled: PropTypes.bool,
  /** name button */
  children: PropTypes.string,
  /** css property: margin-left */
  ml: PropTypes.number,
};

export default FormButton;
