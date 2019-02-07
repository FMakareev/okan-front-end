import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, display, space, variant } from 'styled-system';

/** Style property */
import BorderRadiusProperty from '../../styles/styleProperty/BorderRadiusProperty';
import BorderColorProperty from '../../styles/styleProperty/BorderColorProperty';
import FontSizeProperty from '../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../styles/styleProperty/LineHeightProperty';
import FontFamilyProperty from '../../styles/FontFamilyProperty';
import BackgroundColorProperty from '../../styles/styleProperty/BackgroundColorProperty';

const inputSize = variant({
  key: 'variant.inputSize',
  prop: 'size',
});

/**
 * Text Field Base
 * @example ./TextFieldBase.example.md
 */
export const TextFieldBase = styled.input`
  width: 100%;
  border: 1px solid;
  ${inputSize};
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => color({ ...props, color: 'color11' })};
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color0' })};
  box-sizing: border-box;
  ${FontSizeProperty};
  ${LineHeightProperty};
  ${FontFamilyProperty};
  ${BorderRadiusProperty};
  ${BorderColorProperty};
  ${display};
  ${space};

  ::placeholder {
    ${props => color({ ...props, color: 'color4' })}
  }

  :focus::-webkit-input-placeholder {
    color: transparent;
  }
`;

TextFieldBase.propTypes = {
  /** Description of prop "px: padding-left and padding-right". */
  px: PropTypes.number,
  /** Description of prop "px: padding-top and padding-bottom". */
  py: PropTypes.number,
  lineHeight: PropTypes.number,
  size: PropTypes.string,
  fontSize: PropTypes.number,
  /**input */
  input: PropTypes.object,
  /**input */
  type: PropTypes.string,
  /**class */
  className: PropTypes.string,
  /**input */
  placeholder: PropTypes.string,
  /**input */
  required: PropTypes.string,
};

TextFieldBase.defaultProps = {
  size: 'lg',
  fontFamily: 'secondary',
};

export default TextFieldBase;
