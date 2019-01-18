import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {color} from 'styled-system';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/** Components */
import SidebarProjectSettings from './SidebarProjectSettings';
import SidebarSaveChanges from './SidebarSaveChanges';
import SidebarRevisionList from './SidebarRevisionList';
import SidebarСreateRevision from './SidebarСreateRevision';
import SidebarProjectExport from './SidebarProjectExport';

/** Styles property */
import BackgroundColorProperty from '../../../../styles/styleProperty/BackgroundColorProperty';
import {NodeToggle} from "../NodeToggle/NodeToggle";

const FlexStyled = styled(Flex)`
  ${props => color({...props, color: 'color0'})};
  ${props => BackgroundColorProperty({...props, backgroundColor: 'color3'})};
  cursor: pointer;
`;

export const SidebarCellRoot = (props) => {
  const {decorators, terminal, onClick, node} = props;

  return (
    <FlexStyled pr={'10px'} mb={'10px'} onClick={onClick} alignItems={'center'} justifyContent={'space-between'}>
      <Flex alignItems={'center'}>
        {!terminal && <NodeToggle toggled={node.toggled} fill={'#fff'}/>}
        <Text fontFamily={'secondary'} lineHeight={7} fontSize={5} color={'color0'}>
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
