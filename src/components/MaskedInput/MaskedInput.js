import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-maskedinput';
import styled from 'styled-components';
import { color } from 'styled-system';

/** Style property */
import BorderColorProperty from '../../styles/styleProperty/BorderColorProperty';
import FontSizeProperty from '../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../styles/styleProperty/LineHeightProperty';
import FontFamilyProperty from '../../styles/styleProperty/FontFamilyProperty';

/**PropTypes */
import { fieldInputPropTypes } from '../../propTypes/Forms/FormPropTypes';
import { fieldMetaPropTypes } from '../../propTypes/Forms/FormPropTypes';

const MaskedInputStyled = styled(MaskedInput)`
  width: 100%;
  outline: 0;
  padding: 10px 10px;
  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => color({ ...props, color: 'color11' })};
  ${FontSizeProperty};
  ${LineHeightProperty};
  ${FontFamilyProperty};
`;

class MaskedInputs extends Component {
  static propTypes = {
    mask: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    mask: PropTypes.string,
    name: PropTypes.bool,
    ...fieldInputPropTypes,
    ...fieldMetaPropTypes,
  };

  static defaultProps = {
    mask: '+7 - 111 - 111 - 11 - 11',
  };

  constructor(props) {
    super(props);
    this.state = { masked: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {
      input: { onChange },
    } = this.props;

    this.setState({ masked: event.target.value });

    onChange(event.target.value);
  }

  render() {
    const {
      input,
      meta,
      mask,
      placeholder,
      required,
      disabled,
      loading,
      name,
    } = this.props;

    const { masked } = this.state;

    return (
      <MaskedInputStyled
        mask={mask}
        name={name}
        placeholder={placeholder}
        {...this.props}
        required={required}
        disabled={disabled}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        onChange={this.handleChange}
        value={!input.value ? '' : masked}
      />
    );
  }
}

export default MaskedInputs;
