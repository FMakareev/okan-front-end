import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

/** Components */
import SidebarProjectSettings from './SidebarProjectSettings';
import SidebarSaveChanges from './SidebarSaveChanges';
import SidebarRevisionList from './SidebarRevisionList';
import {SidebarСreateRevision} from './SidebarCreateRevision';
import SidebarProjectExport from './SidebarProjectExport';

/** Styles property */
import { NodeToggle } from '../NodeToggle/NodeToggle';


const FlexStyled = styled(Flex)`
  cursor: pointer;
`;

export const SidebarCellRoot = (props) => {
  const {decorators, terminal, onClick, node} = props;
  const theme = node.active ? {fill: 'color0',color: 'color0',backgroundColor: 'color3'}:{fill: 'color3',color: 'color3',backgroundColor: 'color0'};

  return (
    <FlexStyled {...theme} pr={'10px'} mb={'10px'} onClick={onClick} alignItems={'center'} justifyContent={'space-between'}>
      <Flex alignItems={'center'}>
        <Box mx={2}>
          <NodeToggle toggled={node.toggled} fill={'inherit'}/>
        </Box>
        <Text fontFamily={'secondary'} lineHeight={7} fontSize={5} color={'inherit'}>
          {node.name}
        </Text>
      </Flex>

      <Flex height={'20px'}>
        <Box px={1}>
          <SidebarProjectSettings/>
        </Box>
        <Box px={1}>
          <SidebarSaveChanges/>
        </Box>
        <Box px={1}>
          <SidebarRevisionList/>
        </Box>
        <Box px={1}>
          <SidebarСreateRevision/>
        </Box>
        <Box px={1}>
          <SidebarProjectExport/>
        </Box>
      </Flex>
    </FlexStyled>
  );
};

SidebarCellRoot.propTypes = {
  decorators: PropTypes.shape({
    Container: PropTypes.func.isRequired,
    Header: PropTypes.func.isRequired,
    Loading: PropTypes.func.isRequired,
    Toggle: PropTypes.func.isRequired,
    TreeBeardWrapper: PropTypes.func.isRequired,
    TreeNodeContainer: PropTypes.func.isRequired,
    TreeNodeList: PropTypes.func.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
  terminal: PropTypes.bool.isRequired,
  children: PropTypes.any,
  node: PropTypes.shape({
    children: PropTypes.array,
    name: PropTypes.string.isRequired,
    toggled: PropTypes.bool.isRequired,
  })
};

SidebarCellRoot.defaultProps = {};

export default SidebarCellRoot;
