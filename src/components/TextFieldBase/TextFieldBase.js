import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, display, space, variant } from 'styled-system';

import BorderRadiusProperty from '../../styles/styleProperty/BorderRadiusProperty';
import BorderColorProperty from '../../styles/styleProperty/BorderColorProperty';
import LineHeightRemProperty from '../../styles/styleProperty/LineHeightRemProperty';
import FontSizeRemProperty from '../../styles/styleProperty/FontSizeRemProperty';

const TextField = styled.input`
  width: 100%;
  border: 1px solid;
  background-color: transparent;
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 5px;
  ${BorderRadiusProperty};
  ${BorderColorProperty};
  ${display};
  ${color};
  ${space};
`;

/**
 * Text Field Base
 * @example ./TextFieldBase.example.md
 */
export class TextFieldBase extends Component {
  static propTypes = {
    /** Description of prop "px: padding-left and padding-right". */
    px: PropTypes.number,
    /** Description of prop "px: padding-top and padding-bottom". */
    py: PropTypes.number,
    lineHeight: PropTypes.number,
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

  static defaultProps = {};

  render() {
    const {
      input,
      type,
      placeholder,
      className,
      required,
      py,
      px,
      disabled,
      lineHeight,
      fontSize,
      meta,
      color,
    } = this.props;

    return (
      <TextField
        px={px}
        py={py}
        placeholder={placeholder}
        className={className}
        type={type}
        {...this.props}
        {...input}
        aria-required={required || false}
        disabled={disabled}
        meta={meta}
      />
    );
  }
}

export default TextFieldBase;
