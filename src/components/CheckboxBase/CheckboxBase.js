import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';

/** Image */
import onCheckbox from '../../assets/image/onCheckbox.png';
import offCheckbox from '../../assets/image/offCheckbox.png';

const Wrapper = styled.div`
  ${space};
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;

  & + label {
    position: relative;
    display: block;
    padding: 0;
    cursor: pointer;
  }

  & + label:before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: 32px;
    height: 32px;
    background-image: url(${offCheckbox}) !important;
    background-repeat: no-repeat;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  &:checked + label:before {
    display: none;
  }

  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  &:disabled + label:before {
    -webkit-box-shadow: none;
    box-shadow: none;
    background-color: #ddd;
  }

  &:checked + label:after {
    content: '';
    position: absolute;
    left: 0px;
    top: -2px;
    width: 32px;
    height: 32px;
    background-image: url(${onCheckbox}) !important;
    background-repeat: no-repeat;
  }
`;

/**
 * Компонент чекбокса базового
 * @example ./CheckboxBase.example.md
 */
export class CheckboxBase extends Component {
  static propTypes = {
    // input: inputPropTypes,
    /** The disabled attribute specifies that the input field is disabled. */
    disabled: PropTypes.bool,
    /** Text field form with a pre-selected checkbox. */
    checked: PropTypes.bool,
  };

  static defaultProps = {};

  render() {
    const { input, index, checked, disabled, children, id } = this.props;
    return (
      <Wrapper>
        <Input
          id={`styled-checkbox-${id}`}
          type="checkbox"
          defaultChecked={input.value}
          checked={checked}
          disabled={disabled}
          {...input}
          name={`partners${id}`}
        />

        <label htmlFor={`styled-checkbox-${id}`}>{children}</label>
      </Wrapper>
    );
  }
}

export default CheckboxBase;
