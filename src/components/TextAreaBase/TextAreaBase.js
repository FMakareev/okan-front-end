import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Textarea as DefaultTextArea } from 'rebass';
import styled from 'styled-components';
import { color, space } from 'styled-system';

// import Label from '../Label/Label';

// import BorderRadiusProperty from '../../styles/BorderRadiusProperty';
// import FontSizeProperty from '../../styles/FontSizeProperty';

const NewTextArea = styled(DefaultTextArea)`
  /* background-color: ${props => props.theme.colors.color0}; */
  /* ${BorderRadiusProperty};
  /* box-shadow: ${props => props.theme.boxShadow[2]}; */
  /* ${FontSizeProperty};  */
`;

/**
 * Компоннет Text Area Base
 * @example ./TextAreaBase.example.md
 */

export class TextAreaBase extends Component {
  static propTypes = {
    /** type */
    type: PropTypes.string,
    /** placeholder */
    placeholder: PropTypes.string,
    /** className */
    className: PropTypes.string,
    /** required */
    required: PropTypes.bool,
    /** rows */
    rows: PropTypes.number,
    /** cols */
    cols: PropTypes.number,
  };

  static defaultProps = {};

  render() {
    const { input, type, placeholder, className, required, rows, cols } = this.props;

    return (
      <NewTextArea
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        className={className}
        type={type}
        {...input}
        aria-required={required || false}
      />
    );
  }
}

export default TextAreaBase;