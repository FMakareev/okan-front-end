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

/** HOC */
import RenderOpenWindow from '../../../../utils/helpers/RenderOpenWindow';

const EditorAdditionalMenuButton = (
  <Absolute left={'30px'} top={'0%'}>
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
  static propTypes = {
    /** func submit for Form */
    handleClick: PropTypes.func,
    /** open window */
    isOpen: PropTypes.bool,
  };

  static defaultProps = { handleClick: () => {}, isOpen: false };

  render() {
    const { isOpen, handleClick } = this.props;

    return (
      <Box position={'relative'}>
        <ButtonBase variant={'empty'} onClick={handleClick}>
          {SvgSidebarAdd()}
        </ButtonBase>
        {isOpen && EditorAdditionalMenuButton}
      </Box>
    );
  }
}

export default RenderOpenWindow(EditorAdditionalMenu);
