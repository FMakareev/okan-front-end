import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Absolute } from 'rebass';

/** View */
import TextFieldBase from '../TextFieldBase/TextFieldBase';
import Message from '../Message/Message';
import { Box } from '../Box/Box';

/** PropTypes */
import { fieldInputPropTypes, fieldMetaPropTypes } from '../../propTypes/Forms/FormPropTypes';

const MessageStyled = styled(Message)`
  background-color: #fff;
  border: 1px solid #df4624;
  border-radius: 5px;

  :before {
    border: 1px solid red;
    border-bottom: none;
    border-right: none;
    box-sizing: border-box;
    content: ' ';
    height: 15px;
    left: 20px;
    position: absolute;
    z-index: 11;
    top: -7px;
    width: 15px;
    transform: rotate(45deg);
    background-color: #fff;
  }
`;

/**
 * Компонент инпута (Text Field)
 * @example ./TextField.example.md
 */

export class TextFieldWithMessage extends PureComponent {
  static propTypes = {
    /** input */
    input: fieldInputPropTypes /** meta */,
    meta: fieldMetaPropTypes /** class */,
    className: PropTypes.string /** class */,
    classNameTextField: PropTypes.string /** input */,
    placeholder: PropTypes.string /** input */,
    required: PropTypes.string /** input */,
    type: PropTypes.string /** input */,
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
      color,
      fontSize,
      lineHeight,
      left,
    } = this.props;

    console.log('with message', this.props.type);

    return (
      <Box mb={mb} className={className}>
        <TextFieldBase
          required={required}
          input={input}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          lineHeight={lineHeight}
          fontSize={fontSize}
          type={type}
          meta={meta}
        />
        <Absolute zIndex={10} left={left}>
          <MessageStyled meta={meta} color={'#df4624'} fz={5} lh={6} px={4} py={3} />
        </Absolute>
      </Box>
    );
  }
}

export default TextFieldWithMessage;
