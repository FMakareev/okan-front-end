import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

/**Image */
import { SvgTriangle } from '../../../../components/Icons/SvgTriangle';
import { SvgStatus } from '../../../../components/Icons/SvgStatus';
import { SvgSidebarAdd } from '../../../../components/Icons/SvgSidebarAdd';
import { SvgSidebarSettings } from '../../../../components/Icons/SvgSidebarSettings';

const FlexStyled = styled(Flex)`
  cursor: pointer;

  :hover {
    background-color: #bdbdbd52;
  }
`;

export class ProjectEditorSideBarSubparagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      numberSectionParagraph,
      numberSubsectionParagraph,
      numberSubparagraph,
      titleSubsectionParagraph,
    } = this.props;

    return (
      <Fragment>
        <FlexStyled pl={15} pr={3} py={3} alignItems={'center'}>
          <Flex width={'77%'}>
            <Text color={'color11'} ml={3}>
              {numberSectionParagraph}.{numberSubsectionParagraph}.{numberSubparagraph}.{' '}
              {titleSubsectionParagraph}
            </Text>
          </Flex>

          <Box pr={2}> {SvgSidebarSettings()}</Box>
          <Box pr={2}> {SvgSidebarAdd()}</Box>
          <Box> {SvgStatus('#DF4624', '#fff')}</Box>
        </FlexStyled>
      </Fragment>
    );
  }
}

export default ProjectEditorSideBarSubparagraph;
