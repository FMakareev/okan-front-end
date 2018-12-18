import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** View */
import Box from '../../../../components/Box/Box';
import Flex from '../../../../components/Flex/Flex';
import Text from '../../../../components/Text/Text';
import Image from '../../../../components/Image/Image';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';

/** Image */
import settings from '../../../../assets/image/settings.png';
import { SvgPlay } from '../../../../components/Icons/SvgPlay';

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
          <Text color={'color11'} fontFamily={'secondaryBold'} fontSize={6} lineHeight={8}>
            055 - ЛАЭС - КШ
          </Text>
          <Box>
            <Image src={settings} />
          </Box>
        </FlexStyled>

        <FlexStyled
          alignItems={'center'}
          justifyContent={'space-between'}
          pr={'20px'}
          pl={'50px'}
          py={3}
          mb={'180px'}>
          <Text color={'color11'} fontFamily={'secondaryBold'} fontSize={6} lineHeight={8}>
            055 - ЛАЭС - КШ
          </Text>
          <Box>
            <Image src={settings} />
          </Box>
        </FlexStyled>

        <ButtonWithImage
          type="submit"
          variant={'large'}
          size={'medium'}
          children={'Создать проект'}
          rightIcon={SvgPlay()}
          ml={9}
          width={'100%'}
          widthIcon={'10px'}
        />
      </Box>
    );
  }
}

export default ProjectList;
