import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

/**Image */
import { SvgTriangle } from '../../../../components/Icons/SvgTriangle';
import { SvgStatus } from '../../../../components/Icons/SvgStatus';

/** Components */
import ProjectEditorSideBarSubparagraph from './ProjectEditorSideBarSubparagraph';

const FlexStyled = styled(Flex)`
  cursor: pointer;

  :hover {
    background-color: #bdbdbd52;
  }
`;

const BoxStyled = styled(Box)`
  transform: rotate(90deg);
`;

export class ProjectEditorSideBarSubsection extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { numberSection, numberSubsection, titleSubsection } = this.props;

    const { isOpen } = this.state;

    return (
      <Fragment>
        <FlexStyled pl={9} pr={3} py={3} alignItems={'center'} onClick={this.handleClick}>
          <Flex justifyContent={'space-between'} width={'100%'}>
            <Flex width={'77%'} alignItems={'center'}>
              {isOpen ? (
                <BoxStyled>{SvgTriangle('#333333')}</BoxStyled>
              ) : (
                <Box>{SvgTriangle('#333333')}</Box>
              )}
              <Text color={'color11'} pl={3} fontFamily={'primary500'}>
                {numberSection}.{numberSubsection}. {titleSubsection}
              </Text>
            </Flex>

            {SvgStatus('#F3C318', '#e5e5e5')}
          </Flex>
        </FlexStyled>

        {isOpen && (
          <ProjectEditorSideBarSubparagraph
            numberSectionParagraph={numberSection}
            numberSubsectionParagraph={numberSubsection}
            numberSubparagraph={1}
            titleSubsectionParagraph={'Требования к конструкции'}
          />
        )}
      </Fragment>
    );
  }
}

export default ProjectEditorSideBarSubsection;
