import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** View */
import TextFieldBase from '../TextFieldBase/TextFieldBase';
import ButtonBase from '../ButtonBase/ButtonBase';
import { Box } from '../Box/Box';

/** PropTypes */
import { fieldInputPropTypes, fieldMetaPropTypes } from '../../propTypes/Forms/FormPropTypes';

const TextFieldStyled = styled(TextFieldBase)`
  border: 0;
  text-align: center;
`;
/**
 * Компонент инпута (Text Field)
 * @example ./TextField.example.md
 */

export class TextFieldWithourBorder extends Component {
  static propTypes = {
    /** input */
    ...fieldInputPropTypes,
    /** meta */
    ...fieldMetaPropTypes,
    /** class */
    className: PropTypes.string,
    /** class */
    classNameTextField: PropTypes.string,
    /** input */
    placeholder: PropTypes.string,
    /** input */
    required: PropTypes.string,
    /** input */
    type: PropTypes.string,
    /** input */
    disabled: PropTypes.bool,
  };

  static defaultProps = {};

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.meta.active !== this.props.meta.active ||
      nextProps.loading !== this.props.loading ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.input.value !== this.props.input.value ||
      nextProps.label !== this.props.label ||
      nextProps.type !== this.props.type
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {
      className,
      mb,
      input,
      type,
      meta,
      placeholder,
      required,
      disabled,
      loading,
      fontSize,
      lineHeight,
      fontFamily,
    } = this.props;

    return (
      <Box mb={mb} className={className} width={'100%'}>
        <TextFieldStyled
          required={required}
          input={input}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          lineHeight={lineHeight}
          fontSize={fontSize}
          type={type}
          fontFamily={fontFamily}
          meta={meta}
        />
      </Box>
    );
  }
}

export default TextFieldWithourBorder;
