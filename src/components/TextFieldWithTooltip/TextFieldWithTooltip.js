import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/** View */
import { TooltipBase } from '../TooltipBase/TooltipBase';
import { TextFieldBase } from '../TextFieldBase/TextFieldBase';

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
    } = this.props;

    return (
      <TooltipBase
        isActive={meta.touched && meta.error}
        warning={meta.error && meta.error.label}
        message={meta.error && meta.error.text}>
        <TextFieldBase
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
      </TooltipBase>
    );
  }
}
export default TextFieldWithTooltip;
