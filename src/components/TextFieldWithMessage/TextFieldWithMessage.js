import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** View */
import TooltipBase from '../TooltipBase/TooltipBase';
import TextFieldBase from '../TextFieldBase/TextFieldBase';

/** Css value */
import { Wrapper } from './TextFieldWithMessageStyled';

/**
 * Компонент инпута (Text Field)
 * @example ./TextField.example.md
 */

export class TextField extends Component {
  static propTypes = {
    // /**input */
    // input: ReduxFormInputPropTypes,
    // /** meta*/
    // meta: ReduxFormMetaPropTypes,
    /**class */
    className: PropTypes.string,
    /**class*/
    classNameTextField: PropTypes.string,
    /**input */
    label: PropTypes.string,
    /** input*/
    placeholder: PropTypes.string,
    /** input*/
    required: PropTypes.string,
    /** CSS: margin-bottom */
    mb: PropTypes.number,
    /** input*/
    type: PropTypes.string,
    /** input*/
    disabled: PropTypes.bool,
  };

  static defaultProps = {};

  render() {
    const {
      className,
      classNameTextField,
      mb,
      input,
      type,
      meta,
      placeholder,
      required,
      disabled,
      loading,
    } = this.props;

    return (
      <Wrapper mb={mb} className={className}>
        <TextFieldBase
          required={required}
          type={type}
          className={classNameTextField}
          input={input}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          meta={meta}
        />
        <TooltipBase meta={meta} />
      </Wrapper>
    );
  }
}

export default TextField;
