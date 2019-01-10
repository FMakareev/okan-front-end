import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';

/** View */
import Box from '../../../../components/Box/Box';
import Flex from '../../../../components/Flex/Flex';
import Text from '../../../../components/Text/Text';
import Image from '../../../../components/Image/Image';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
import Link from '../../../../components/Link/Link';

/** Image */
import settings from '../../../../assets/image/settings.png';
import { SvgPlay } from '../../../../components/Icons/SvgPlay';
import { SvgSettings } from '../../../../components/Icons/SvgSettings';

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

  //`/app/document-settings/${id}`
  // `/app/project/${id}`

  render() {
    return (
      <Box>
        <Link mr={6} to={`/app/project/${1}`} textDecoration={'none'}>
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

            <Link mr={6} to={`/app/document-settings/${1}`}>
              <ButtonWithImage type="submit" variant={'empty'}>
                <Image src={settings} />
              </ButtonWithImage>
            </Link>
          </FlexStyled>
        </Link>

        <Link mr={6} to={`/app/project/${1}`} textDecoration={'none'}>
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

            <Link mr={6} to={`/app/document-settings/${1}`}>
              <ButtonWithImage type="submit" variant={'empty'}>
                <Image src={settings} />
              </ButtonWithImage>
            </Link>
          </FlexStyled>
        </Link>

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
