import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';

const Wrapper = styled.div`
  ${space};
`;

const Input = styled.input`
  position: absolute; // take it out of document flow
  opacity: 0; // hide it
  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  // Box.
  & + label:before {
    content: '';
    margin-right: ${props => props.theme.space[4]}px;
    display: inline-block;
    vertical-align: text-top;
    width: ${props => props.theme.space[6]}px;
    height: ${props => props.theme.space[6]}px;
    background-color: ${props => props.theme.colors.color0};
    border: ${props => props.theme.space[1]}px solid ${props => props.theme.colors.color6};
    border-radius: ${props => props.theme.space[2]}px;
    box-sizing: border-box;
  }

  // Box hover
  &:hover + label:before {
    background-color: ${props => props.theme.colors.color2};
  }

  // Box focus
  &:focus + label:before {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }

  // Box checked
  &:checked + label:before {
    background-color: ${props => props.theme.colors.color2};
  }

  // Disabled state label.
  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  // Disabled box.
  &:disabled + label:before {
    box-shadow: none;
    background-color: #ddd;
  }

  // Checkmark. Could be replaced with an image
  &:checked + label:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 9px;
    background-color: ${props => props.theme.colors.color0};
    width: ${props => props.theme.space[1]}px;
    height: ${props => props.theme.space[1]}px;
    box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white,
      4px -8px 0 white;
    transform: rotate(45deg);
  }
`;

/**
 * Компонент чекбокса базового
 * @example ./CheckboxBase.example.md
 */
export class CheckboxBase extends Component {
  static propTypes = {
    // input: inputPropTypes,
    /** The name attribute specifies the name of an <input> element. */
    name: PropTypes.string,
    /** The disabled attribute specifies that the input field is disabled. */
    disabled: PropTypes.bool,
    /** Text field form with a pre-selected checkbox. */
    checked: PropTypes.bool,
    /** Children = label. */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /** Event callback */
    onChange: PropTypes.func,
    /** . */
    index: PropTypes.number,
    /** CSS: margin-bottom */
    mb: PropTypes.string,
    /** CSS: padding left and right */
    py: PropTypes.string,
    /** CSS: padding top and bottom */
    px: PropTypes.string,
  };

  static defaultProps = {};

  render() {
    const { children, input, index, mb, py, px, checked, disabled } = this.props;

    return (
      <Wrapper mb={mb} px={px} py={py}>
        <Input
          id={`styled-checkbox-${index || input.name}`}
          type="checkbox"
          checked={input.value}
          disabled={disabled}
          {...input}
        />
        <label htmlFor={`styled-checkbox-${index || input.name}`}>{children}</label>
      </Wrapper>
    );
  }
}

export default CheckboxBase;
