import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, display, space, variant } from 'styled-system';

/** Style property */
import BorderRadiusProperty from '../../styles/styleProperty/BorderRadiusProperty';
import BorderColorProperty from '../../styles/styleProperty/BorderColorProperty';
import FontSizeProperty from '../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../styles/styleProperty/LineHeightProperty';

const TextField = styled.input`
  width: 100%;
  font-family: ${props => props.theme.fontFamily.secondary};
  border: 1px solid ${props => props.theme.colors.color4};
  background-color: transparent;
  box-sizing: border-box;
  padding: 10px 10px;
  color: ${props => props.theme.colors.color11} !important;
  background-color: #fff;
  ${FontSizeProperty};
  ${LineHeightProperty};
  ${BorderRadiusProperty};
  ${BorderColorProperty};
  ${display};
  ${space};

  ::placeholder {
    color: ${props => props.theme.colors.color4}};
  }

  :focus::-webkit-input-placeholder {
    color: transparent;
  }
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
