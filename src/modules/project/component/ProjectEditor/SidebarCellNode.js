import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

/** Components */
import SidebarCreateCell from './SidebarCreateCell';
import SidebarApprovalStatus from './SidebarApprovalStatus';
import SidebarChangeCell from './SidebarChangeCell';

export class SidebarCellNode extends Component {
  static propTypes = {
    /** func method for component */
    handleClickCreateCell: PropTypes.func,
  };

  static defaultProps = { handleClickCreateCell: () => {} };

  state = { isOpen: false };

  handleClickCreateCell = () => {
    return this.setState(({ isOpen }) => {
      return { isOpen: !isOpen };
    });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <Fragment>
        <Flex pl={15} pr={3} py={3} alignItems={'center'}>
          <Flex width={'77%'}>
            <Text color={'color11'} ml={3}>
              2.1.1. Требования к конструкции
            </Text>
          </Flex>

          <Box pr={2}>
            <SidebarChangeCell />
          </Box>
          <Box pr={2}>
            <SidebarCreateCell handleClickCreateCell={this.handleClickCreateCell} isOpen={isOpen} />
          </Box>
          <Box>
            <SidebarApprovalStatus />
          </Box>
        </Flex>
      </Fragment>
    );
  }
}

export default SidebarCellNode;
