import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';

/** Image */
import onCheckbox from '../../assets/icons/monocolor/onCheckbox.monocolor.svg';
import offCheckbox from '../../assets/icons/monocolor/offCheckbox.monocolor.svg';

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
    position: absolute;
    left: 0px;
    top: 0px;
    width: 32px;
    height: 32px;
    background-image: url(${offCheckbox}) !important;
    background-repeat: no-repeat;
    box-sizing: border-box;
  }

  // Box checked
  &:checked + label:before {
    display: none;
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
    const { children, input, index, checked, disabled } = this.props;

    return (
      <Wrapper>
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
