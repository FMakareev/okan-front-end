import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Absolute } from 'rebass';
import styled from 'styled-components';

/** View */
import Relative from '../../../../components/Relative/Relative';
import TextFieldWithTooltip from '../../../../components/TextFieldWithTooltip/TextFieldWithTooltip';

/** Image */
import { SvgEye } from '../../../../components/Icons/SvgEye';

const BtnEye = styled.div`
  cursor: pointer;
`;

export class FieldInputPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { type: 'password', isOpen: false };
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    /** name input */
    name: PropTypes.string,
    /** placeholder input */
    placeholder: PropTypes.string,
    /** validation */
    validate: PropTypes.func,
    /** type input */
    type: PropTypes.string,
    /** open input password */
    isOpen: PropTypes.bool,
  };

  handleClick(e) {
    this.setState({ isOpen: !this.state.isOpen, type: this.state.isOpen ? 'password' : 'text' });
  }

  render() {
    const { type, isOpen } = this.state;

    return (
      <Relative width={'100%'}>
        <TextFieldWithTooltip left={'40%'} {...this.props} type={type} />

        <Absolute top={'33%'} right={'4%'}>
          <BtnEye onClick={this.handleClick} borderRadius={5}>
            {isOpen ? (
              <div style={{ fill: '#00649C' }}>{SvgEye()}</div>
            ) : (
              <div style={{ fill: '#848484' }}> {SvgEye()}</div>
            )}
          </BtnEye>
        </Absolute>
      </Relative>
    );
  }
}

export default FieldInputPassword;
