import React, { Component, Fragment } from 'react';
import { Absolute } from 'rebass';
import PropTypes from 'prop-types';

/** Image */
import { SvgSidebarAdd } from '../../../../components/Icons/SvgSidebarAdd';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';

/** Components */
import EditorAdditionalMenuButtonTable from './EditorAdditionalMenuButtonTable';
import EditorAdditionalMenuButtonImage from './EditorAdditionalMenuButtonImage';
import EditorAdditionalMenuButtonText from './EditorAdditionalMenuButtonText';

const EditorAdditionalMenuButton = (
  <Absolute left={'10%'} top={'0%'}>
    <Flex>
      <Flex mr={4}>
        <EditorAdditionalMenuButtonTable />
      </Flex>
      <Flex mr={4}>
        <EditorAdditionalMenuButtonImage />
      </Flex>
      <Flex>
        <EditorAdditionalMenuButtonText />
      </Flex>
    </Flex>
  </Absolute>
);

export class EditorAdditionalMenu extends Component {
  state = { isOpen: false };

  handleClick = () => {
    return this.setState(({ isOpen }) => {
      return { isOpen: !isOpen };
    });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <Box position={'relative'}>
        <ButtonBase variant={'empty'} onClick={this.handleClick}>
          {SvgSidebarAdd()}
        </ButtonBase>
        {isOpen && EditorAdditionalMenuButton}
      </Box>
    );
  }
}

export default EditorAdditionalMenu;
