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
      input,
      type,
      meta,
      placeholder,
      required,
      disabled,
      loading,
      fontSize,
      lineHeight,
    } = this.props;

    return (
      <TooltipBase
        isActive={meta.touched && meta.error}
        warning={meta.error}
      >
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
          fontFamily={'secondary'}
        />
      </TooltipBase>
    );
  }
}
export default TextFieldWithTooltip;
