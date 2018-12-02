import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**View */
import Box from '../../../../../components/Box/Box';
import Flex from '../../../../../components/Flex/Flex';
import Text from '../../../../../components/Text/Text';

/** Image */
import { SvgSetting } from '../../../../../components/Icons/SvgSetting';

const FlexStyled = styled(Flex)`
  border: 1px solid #333333;
  border-radius: 5px;
`;

export class ProjectList extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Box>
        <FlexStyled
          alignItems={'center'}
          justifyContent={'space-between'}
          pr={'20px'}
          pl={'50px'}
          py={3}
          mb={4}>
          <Text color={'color11'} fontFamily={'secondaryBold'} fz={6} lh={7}>
            055 - ЛАЭС - КШ
          </Text>
          <Box>{SvgSetting()}</Box>
        </FlexStyled>

        <FlexStyled
          alignItems={'center'}
          justifyContent={'space-between'}
          pr={'20px'}
          pl={'50px'}
          py={3}
          mb={4}>
          <Text color={'color11'} fontFamily={'secondaryBold'} fz={6} lh={7}>
            055 - ЛАЭС - КШ
          </Text>
          <Box>{SvgSetting()}</Box>
        </FlexStyled>
      </Box>
    );
  }
}

export default ProjectList;
