import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, display, space, variant } from 'styled-system';

/** Style property */
import BorderRadiusProperty from '../../styles/styleProperty/BorderRadiusProperty';
import BorderColorProperty from '../../styles/styleProperty/BorderColorProperty';
import FontSizeProperty from '../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../styles/styleProperty/LineHeightProperty';
import FontFamilyProperty from '../../styles/styleProperty/FontFamilyProperty';

const TextField = styled.input`
  width: 100%;
  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => color({ ...props, color: 'color11' })};
  background-color: transparent;
  box-sizing: border-box;
  padding: 10px 10px;
  background-color: #fff;
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
      value,
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
        value={value}
      />
    );
  }
}

export default TextFieldBase;
