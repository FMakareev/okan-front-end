import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Message from '../Message/Message';
import CheckboxBase from '../CheckboxBase/CheckboxBase';
import { Flex } from '../Flex/Flex';
import { Text } from '../Text/Text';
import { Box } from "../Box/Box";

/**
 * Компонент чекбокса (Checkbox)
 * @example ./Checkbox.example.md
 */

export class Checkbox extends Component {
  static propTypes = {
    /** className */
    className: PropTypes.string,
    /** CSS: margin-bottom */
    mb: PropTypes.number,
    /** inputtom */
    input: PropTypes.object,
    /** label */
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    /** typetom */
    type: PropTypes.string,
    /** */
    meta: PropTypes.object,
    /** placeholder */
    placeholder: PropTypes.string,
  };

  static defaultProps = {};

  componentDidMount() {
    if (this.props.input.value === '') {
      this.props.input.onChange(false);
    } else {
    }
  }

  render() {
    const { input, label, meta, placeholder } = this.props;

    return (
      <Box>
        <Flex alignItems={'center'}>
          {label && <Text mr={5}>{label}</Text>}
          <CheckboxBase input={input} placeholder={placeholder} />
        </Flex>
        {
          meta &&
          <Message meta={meta} />
        }
      </Box>
    );
  }
}

export default Checkbox;
