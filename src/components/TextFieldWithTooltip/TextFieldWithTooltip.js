import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

/** View */
import {TooltipBase} from '../TooltipBase/TooltipBase';
import {TextFieldBase} from '../TextFieldBase/TextFieldBase';

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

  static defaultProps = {
    onChangeHOC: (event) => event,
  };

  render() {
    const {meta, input, onChangeHOC, tooltipPosition} = this.props;
    return (
      <TooltipBase position={tooltipPosition} isActive={meta.touched && meta.error} warning={meta.error}>
        <TextFieldBase
          {...this.props}
          {...input}
          onChange={(event) => input.onChange(onChangeHOC(event))}
        />
      </TooltipBase>
    );
  }
}

export default TextFieldWithTooltip;
