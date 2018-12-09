import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgTriangle } from '../../../../components/Icons/SvgTriangle';
import { SvgSidebarComment } from '../../../../components/Icons/SvgSidebarComment';
import { SvgSidebarExport } from '../../../../components/Icons/SvgSidebarExport';
import { SvgSidebarList } from '../../../../components/Icons/SvgSidebarList';
import { SvgSidebarSave } from '../../../../components/Icons/SvgSidebarSave';
import { SvgSidebarSettings } from '../../../../components/Icons/SvgSidebarSettings';

/** Components */
import ProjectEditorSideBarSection from './ProjectEditorSideBarSection';

const FlexStyled = styled(Flex)`
  border-top: 1px solid #c4c4c4;
  color: #848484;
  background-color: #fff;
  cursor: pointer;

  :hover {
    background-color: #bdbdbd52;
  }
`;

const FlexStyledisOpen = styled(Flex)`
  color: #ffffff;
  background-color: #4f4f4f;
  cursor: pointer;
`;

const BoxStyled = styled(Box)`
  transform: rotate(90deg);
`;

export class ProjectEditorSideBarDrawing extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { nameSection } = this.props;
    const { isOpen } = this.state;
    return (
      <Fragment>
        {isOpen ? (
          <div>
            <FlexStyledisOpen
              alignItems={'center'}
              justifyContent={'space-between'}
              onClick={this.handleClick}>
              <Flex alignItems={'center'}>
                <BoxStyled mx={2}> {SvgTriangle('#fff')}</BoxStyled>

                <Text fontFamily={'secondary'} lineHeight={6} fontSize={5}>
                  {nameSection}
                </Text>
              </Flex>

              <Flex mr={3} height={'20px'}>
                <Box pr={2}>{SvgSidebarSettings()}</Box>
                <Box pr={2}>{SvgSidebarSave()}</Box>
                <Box pr={2}>{SvgSidebarList()}</Box>
                <Box pr={2}>{SvgSidebarComment()}</Box>
                <Box> {SvgSidebarExport()}</Box>
              </Flex>
            </FlexStyledisOpen>

            <ProjectEditorSideBarSection number={1} title={'Введение'} />
            <ProjectEditorSideBarSection number={2} title={'Технические требования'} />
          </div>
        ) : (
          <FlexStyled alignItems={'center'} onClick={this.handleClick} pl={2}>
            {SvgTriangle('#848484')}

            <Text fontFamily={'secondary'} lineHeight={6} fontSize={5} ml={2}>
              {nameSection}
            </Text>
          </FlexStyled>
        )}
      </Fragment>
    );
  }
}

export default ProjectEditorSideBarDrawing;
