import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, display, space, variant } from 'styled-system';

import BorderRadiusProperty from '../../styles/styleProperty/BorderRadiusProperty';
import BorderColorProperty from '../../styles/styleProperty/BorderColorProperty';

const TextField = styled.input`
  width: 100%;
  border: 2px solid
    ${props => {
      if ((props.meta && props.meta.active) || props.meta.dirty) {
        return props.theme.colors.color7;
      }
      return props.theme.colors.color4;
    }}!important;
  background-color: transparent;
  box-sizing: border-box;
  padding-left: 5px;
  font-size: 32px;
  line-height: 40px;
  padding: 10px 10px;
  border-radius: 5px;
  color: ${props => props.theme.colors.color10};
  background-color: #fff;
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
