import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from 'styled-system';

/** View */
import Flex from '../Flex/Flex';
import ButtonWithImage from '../ButtonWithImage/ButtonWithImage';

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

const ButtonWithImageStyled = styled(ButtonWithImage)`
  &:disabled {
    cursor: default;
    color: #fff;
    fill: #fff;
    background-color: #d4d1d1;
  }
`;

export const FormButtonSubmit = ({ disabled, children, ml, error, isLoading }) => {

  return (
    <Flex flexDirection={'column'} justifyContent={'center'}>
      {error && <Error>{error}</Error>}
      <ButtonWithImageStyled
        type="submit"
        disabled={disabled}
        isLoading={isLoading}
        variant={'large'}
        size={'large'}
        rightIcon={<SvgPlay/>}
        ml={ml}>
        {children}
      </ButtonWithImageStyled>
    </Flex>
  );
};

FormButtonSubmit.propTypes = {
  /** disabled button */
  disabled: PropTypes.bool,
  /** name button */
  children: PropTypes.string,
  /** css property: margin-left */
  ml: PropTypes.number,
  /** error */
  error: PropTypes.string,
};

export default FormButtonSubmit;
