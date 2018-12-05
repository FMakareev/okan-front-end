import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Absolute } from 'rebass';
import styled from 'styled-components';

/** View */
import Flex from '../../../../components/Flex/Flex';
import TextFieldWithMessage from '../../../../components/TextFieldWithMessage/TextFieldWithMessage';
import Relative from '../../../../components/Relative/Relative';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/** validation */
import required from '../../../../utils/validation/required';

/** Image */
import { SvgEye } from '../../../../components/Icons/SvgEye';

class FieldInputPassword extends Component {
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

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen, type: this.state.isOpen ? 'password' : 'text' });
  }

  render() {
    const { type, isOpen } = this.state;
    const { name, placeholder, validate, TextFieldInput } = this.props;

    console.log('fieldInputpassword', this.state.type);

    return (
      <Relative width={'100%'}>
        <TextFieldInput
          name={name}
          component={TextFieldWithMessage}
          placeholder={placeholder}
          type={type}
          validate={validate}
          fontSize={9}
          lineHeight={11}
          left={'40%'}
        />

        <Absolute top={'33%'} right={'4%'}>
          <ButtonBase variant={'empty'} onClick={this.handleClick} borderRadius={5}>
            {isOpen ? (
              <div style={{ fill: '#00649C' }}>{SvgEye()}</div>
            ) : (
              <div style={{ fill: '#848484' }}> {SvgEye()}</div>
            )}
          </ButtonBase>
        </Absolute>
      </Relative>
    );
  }
}

export default FieldInputPassword;
