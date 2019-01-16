import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color } from 'styled-system';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/** Image */
import { SvgTriangle } from '../../../../components/Icons/SvgTriangle';

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
  ${props => color({ ...props, color: 'color0' })};
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color3' })};
  cursor: pointer;
`;

const BoxStyled = styled(Box)`
  transform: rotate(90deg);
`;

export const SidebarCellRoot = (props) => {
  const {decorators, terminal, onClick, node} = props;
  console.log('SidebarCellRoot: ',node.name);
  console.log('SidebarCellRoot: ',node.toggled);
  return (
    <FlexStyled onClick={onClick} alignItems={'center'} justifyContent={'space-between'}>
      <Flex alignItems={'center'}>
        <Box mx={2}>
          <NodeToggle toggled={node.toggled} fill={'#fff'}/>
        </Box>
        <Text fontFamily={'secondary'} lineHeight={7} fontSize={5} color={'color0'}>
          {node.name}
        </Text>
      </Flex>

      <Flex mr={3} height={'20px'}>
        <Box pr={2}>
          <SidebarProjectSettings />
        </Box>
        <Box pr={2}>
          <SidebarSaveChanges />
        </Box>
        <Box pr={2}>
          <SidebarRevisionList />
        </Box>
        <Box pr={2}>
          <SidebarСreateRevision />
        </Box>
        <Box>
          <SidebarProjectExport />
        </Box>
      </Flex>
    </FlexStyled>
  );
};

SidebarCellRoot.propTypes = {
  decorators: PropTypes.shape({
    Container:PropTypes.func.isRequire,
    Header:PropTypes.func.isRequire,
    Loading:PropTypes.func.isRequire,
    Toggle:PropTypes.func.isRequire,
    TreeBeardWrapper:PropTypes.func.isRequire,
    TreeNodeContainer:PropTypes.func.isRequire,
    TreeNodeList:PropTypes.func.isRequire,
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

SidebarCellRoot.defaultProps = {
};

export default SidebarCellRoot;
