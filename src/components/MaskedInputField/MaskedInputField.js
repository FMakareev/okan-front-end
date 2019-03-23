import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** View */
import MaskedInput from '../MaskedInput/MaskedInput';
import TooltipBase from '../TooltipBase/TooltipBase';

/**PropTypes */
import { fieldInputPropTypes } from '../../propTypes/Forms/FormPropTypes';
import { fieldMetaPropTypes } from '../../propTypes/Forms/FormPropTypes';

export class MaskedInputField extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    lineHeight: PropTypes.any,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.any,
    mask: PropTypes.string,
    name: PropTypes.string,
    // ...fieldInputPropTypes,
    // ...fieldMetaPropTypes,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      input,
      name,
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
      <TooltipBase isActive={meta.touched && meta.error} warning={meta.error}>
        <MaskedInput {...this.props} />
      </TooltipBase>
    );
  }
}

export default MaskedInputField;
