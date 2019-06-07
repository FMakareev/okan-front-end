import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** View */
import CheckboxBase from '../CheckboxBase/CheckboxBase';
import { Flex } from '../Flex/Flex';
import { Box } from '../Box/Box';

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

  render() {
    const { input } = this.props;

    return (
      <Box>
        <Flex alignItems={'center'}>
          <CheckboxBase input={input} />
        </Flex>
      </Box>
    );
  }
}

export default Checkbox;
