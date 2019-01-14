import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** Components */
import EditorCellContent from './EditorCellContent';
import EditorCellForm from './EditorCellForm';

/** View */
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

export class EditorCellController extends Component {
  state = {};

  static propTypes = {
    /** data for components */
    data: PropTypes.sting,
  };

  static defaultProps = { data: '' };

  render() {
    return (
      <Box pl={3} mt={12}>
        <Text fontFamily={'secondary'} lineHeight={8} fontSize={6} color={'color11'}>
          2.1. Основные параметры и характеристики
        </Text>
        <Box mb={4} mt={4}>
          <EditorCellContent
            data={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            }
          />
        </Box>
        <Box mb={4}>
          <EditorCellForm />
        </Box>
      </Box>
    );
  }
}

export default EditorCellController;
