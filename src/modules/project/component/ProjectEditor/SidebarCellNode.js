import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

/** Components */
import SidebarCreateCell from './SidebarCreateCell';
import SidebarApprovalStatus from './SidebarApprovalStatus';
import SidebarChangeCell from './SidebarChangeCell';
import {SvgTriangle} from "@lib/ui/Icons/SvgTriangle";
import NodeToggle from "../NodeToggle/NodeToggle";

export class SidebarCellNode extends Component {
  static propTypes = {
    decorators: PropTypes.shape({
      Container: PropTypes.func.isRequire,
      Header: PropTypes.func.isRequire,
      Loading: PropTypes.func.isRequire,
      Toggle: PropTypes.func.isRequire,
      TreeBeardWrapper: PropTypes.func.isRequire,
      TreeNodeContainer: PropTypes.func.isRequire,
      TreeNodeList: PropTypes.func.isRequire,
    }),
    onClick: PropTypes.func.isRequire,
    terminal: PropTypes.bool.isRequire,
    children: PropTypes.any,
    node: PropTypes.shape({
      children: PropTypes.array,
      name: PropTypes.string.isRequire,
      toggled: PropTypes.bool.isRequire,
    })
  };

  static defaultProps = {};


  render() {
    const {decorators, terminal, onClick, node} = this.props;
    console.log('SidebarCellNode: ', this.props);
    return (
      <Flex onClick={onClick} p={3} alignItems={'center'}>
        <Flex width={'77%'}>
          <Box mx={2}>
            <NodeToggle toggled={node.toggled}/>
          </Box>
          <Text color={'color11'} ml={3}>
            {node.name}
          </Text>
        </Flex>

        <Box pr={2}>
          <SidebarChangeCell/>
        </Box>
        <Box pr={2}>
          <SidebarCreateCell/>
        </Box>
        <Box>
          <SidebarApprovalStatus/>
        </Box>
      </Flex>
    );
  }
}

export default SidebarCellNode;
