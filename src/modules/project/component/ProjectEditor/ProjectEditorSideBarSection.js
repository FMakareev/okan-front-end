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
import ProjectEditorSideBarSubsection from './ProjectEditorSideBarSubsection';

const FlexStyled = styled(Flex)`
  cursor: pointer;

  :hover {
    background-color: #bdbdbd52;
  }
`;

const BoxStyled = styled(Box)`
  transform: rotate(90deg);
`;

class ProjectEditorSideBarSection extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { number, title } = this.props;
    const { isOpen } = this.state;
    return (
      <Fragment>
        <FlexStyled pl={5} pr={3} py={3} alignItems={'center'} onClick={this.handleClick}>
          <Flex justifyContent={'space-between'} width={'100%'}>
            <Flex alignItems={'center'} width={'77%'}>
              {isOpen ? (
                <BoxStyled>{SvgTriangle('#333333')}</BoxStyled>
              ) : (
                <Box>{SvgTriangle('#333333')}</Box>
              )}
              <Text color={'color11'} ml={3} fontFamily={'primary500'}>
                {number}. {title}
              </Text>
            </Flex>

            {SvgStatus('#2FBC0B', '#e5e5e5')}
          </Flex>
        </FlexStyled>

        {isOpen && (
          <ProjectEditorSideBarSubsection
            numberSection={number}
            numberSubsection={1}
            titleSubsection={'Основные параметры и характеристики'}
          />
        )}
      </Fragment>
    );
  }
}

export default ProjectEditorSideBarSection;
