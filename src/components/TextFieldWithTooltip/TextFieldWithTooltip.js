import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TooltipDefault } from '../TooltipDefault/TooltipDefault';

import { TextField } from '../TextField/TextField';

/**
 * Компонент инпута с тултипом (Text Field With Tooltip)
 * @example ./TextFieldWithTooltip.example.md
 */

export class TextFieldWithTooltip extends PureComponent {
  static propTypes = {
    /** class */
    className: PropTypes.string,
    /** class */
    classNameTextField: PropTypes.string,
    /** input */
    label: PropTypes.string,
    /** input */
    placeholder: PropTypes.string,
    /** input */
    required: PropTypes.string,
    /** input */
    type: PropTypes.string,
    /** input */
    disabled: PropTypes.bool,
    /** tooltip's arrow centered */
    arrowCentered: PropTypes.bool,
  };

  static defaultProps = {};

  render() {
    const {
      classNameTextField,
      input,
      label,
      type,
      meta,
      placeholder,
      required,
      disabled,
      loading,
      arrowCentered,
    } = this.props;

    return (
      <TooltipDefault
        isActive={meta.touched && meta.error}
        warning={meta.error && meta.error.label}
        message={meta.error && meta.error.text}
        arrowCentered={arrowCentered}>
        <TextField
          required={required}
          type={type}
          className={classNameTextField}
          input={input}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          meta={meta}
          label={label}
        />
      </TooltipDefault>
    );
  }
}
export default TextFieldWithTooltip;
