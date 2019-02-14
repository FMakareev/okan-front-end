import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

/** Components */
import SidebarProjectSettings from '../SidebarProjectSettings/SidebarProjectSettings';
import SidebarCreateRevision from '../SidebarCreateRevision/SidebarCreateRevision';
import SidebarRevisionList from '../SidebarRevisionList/SidebarRevisionList';
import SidebarProjectExport from '../SidebarProjectExport/SidebarProjectExport';
import SideBarDocumentDelete from '../SideBarDocumentDelete/SideBarDocumentDelete';
import SidebarDocumentToApproval from '../SidebarDocumentToApproval/SidebarDocumentToApproval';

/** Styles property */
import { NodeToggle } from '../NodeToggle/NodeToggle';

const FlexStyled = styled(Flex)`
  cursor: pointer;
  transition: all 0.225s;
  ${({ active, ...rest }) => {
    return active
      ? `
    {
      fill: #FFFFFF;
      color: #FFFFFF;
      background-color: #4F4F4F;
      
      &:hover {
        fill: #FFFFFF;
        color: #FFFFFF;
        background-color: #4F4F4F;
      }
    }
  `
      : `
    {
      fill: #848484;
      color: #848484;
      background-color: #FFFFFF;
      &:hover{
        fill: #FFFFFF;
        color: #FFFFFF;
        background-color: #4F4F4F;
      }
    }
  `;
  }}
`;

export const SidebarCellRoot = props => {
  const { decorators, terminal, document, projectid, onClick, node } = props;

  return (
    <FlexStyled
      active={node.active}
      pr={'10px'}
      mb={'10px'}
      onClick={onClick}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <Flex alignItems={'center'}>
        <Box mx={2}>
          <NodeToggle toggled={node.toggled} fill={'inherit'} />
        </Box>
        <Text fontFamily={'secondary'} lineHeight={7} fontSize={5} color={'inherit'}>
          {node.name}
        </Text>
      </Flex>

      <Flex height={'20px'}>
        <Box px={1}>
          <SidebarProjectSettings projectid={projectid} documentid={document.id} />
        </Box>
        <Box px={1}>
          <SidebarCreateRevision documentid={document} />
        </Box>
        <Box px={1}>
          <SidebarRevisionList documentid={document.id} projectid={projectid} />
        </Box>
        <Box px={1}>
          <SidebarDocumentToApproval document={document} />
        </Box>
        <Box px={1}>
          <SidebarProjectExport />
        </Box>
        <Box px={1}>
          <SideBarDocumentDelete id={node.id} name={node.name} projectid={projectid} />
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
    TreeBeardWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    TreeNodeContainer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    TreeNodeList: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  }),
  onClick: PropTypes.func.isRequired,
  terminal: PropTypes.bool.isRequired,
  children: PropTypes.any,
  node: PropTypes.shape({
    children: PropTypes.array,
    name: PropTypes.string.isRequired,
    toggled: PropTypes.bool.isRequired,
  }),
};

SidebarCellRoot.defaultProps = {};

export default SidebarCellRoot;
