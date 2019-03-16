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
    onChangeHOC: PropTypes.func,
  };

  static defaultProps = {
    onChangeHOC: null,
  };

  render() {
    const {meta, input, onChangeHOC, tooltipPosition, ...rest} = this.props;
    return (
      <div
        style={{
          position: 'relative'
        }}
      >
        <TextFieldBase
          {...rest}
          {...input}
          onChange={(event) => {
            if (onChangeHOC) {
              input.onChange(onChangeHOC(event))
            } else {
              input.onChange(event)
            }
          }}
        />
        <TooltipBase
          position={tooltipPosition}
          isActive={meta.touched && meta.error}
          warning={meta.error}
        />
      </div>
    );
  }
}

export default TextFieldWithTooltip;
