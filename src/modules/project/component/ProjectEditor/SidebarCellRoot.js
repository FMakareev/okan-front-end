import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const FlexStyled = styled(Flex)`
  color: #ffffff;
  background-color: #4f4f4f;
  cursor: pointer;
`;

const BoxStyled = styled(Box)`
  transform: rotate(90deg);
`;

export const SidebarCellRoot = ({ nameSection }) => {
  return (
    <FlexStyled alignItems={'center'} justifyContent={'space-between'}>
      <Flex alignItems={'center'}>
        <BoxStyled mx={2}> {SvgTriangle('#fff')}</BoxStyled>

        <Text fontFamily={'secondary'} lineHeight={7} fontSize={5} color={'color0'}>
          {nameSection}
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
  /*data for component*/
  nameSection: PropTypes.string,
};

SidebarCellRoot.defaultProps = {
  nameSection: '',
};

export default SidebarCellRoot;
