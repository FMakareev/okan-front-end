import React from 'react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react';
import StyledThemeProvider from '../src/styles/StyledThemeProvider';

import { ButtonBase } from '../src/components/ButtonBase/ButtonBase';
import { Flex } from '../src/components/Flex/Flex';
import { Box } from '../src/components/Box/Box';
import { Text } from '../src/components/Text/Text';
import { Image } from '../src/components/Image/Image';

/** Image */
import { SvgPlay } from '../src/components/Icons/SvgPlay';
import settings from '../src/assets/image/settings.png';
import { SvgDelete } from '../src/components/Icons/SvgDelete';
import { SvgAdd } from '../src/components/Icons/SvgAdd';
import { SvgTriangle } from '../src/components/Icons/SvgTriangle';

addDecorator(jsxDecorator);
addDecorator(withKnobs);

storiesOf('Пагинация', module)
  .addDecorator(story => {
    return <StyledThemeProvider>{story()}</StyledThemeProvider>;
  })
  .add('Пример пагинации ', () => {
    return (
      <Box width={'800px'} m={'0 auto'}>
        <Flex justifyContent={'center'} mt={[4]}>
          <ButtonBase
            fontSize={4}
            size={'xsmall'}
            variant={'large'}
            style={{ transform: 'rotate(180deg)' }}>
            <SvgPlay />
          </ButtonBase>

          <Text fontSize={7} lineHeight={9} color={'color7'} mx={4}>
            1
          </Text>

          <ButtonBase fontSize={4} size={'xsmall'} variant={'large'}>
            <SvgPlay />
          </ButtonBase>
        </Flex>
      </Box>
    );
  })
  .add('Пример пагинации с списком проектов ', () => {
    return (
      <Box width={'500px'} m={'0 auto'}>
        <Flex
          border={'1px solid grey'}
          borderRadius={'5px'}
          alignItems={'center'}
          justifyContent={'space-between'}
          pr={'20px'}
          pl={'50px'}
          py={3}
          mb={4}>
          <Text color={'color11'} fontFamily={'secondaryBold'} fontSize={6} lineHeight={8}>
            Проект #1
          </Text>

          <Image src={settings} />
        </Flex>

        <Flex
          border={'1px solid grey'}
          borderRadius={'5px'}
          alignItems={'center'}
          justifyContent={'space-between'}
          pr={'20px'}
          pl={'50px'}
          py={3}
          mb={4}>
          <Text color={'color11'} fontFamily={'secondaryBold'} fontSize={6} lineHeight={8}>
            Проект #2
          </Text>

          <Image src={settings} />
        </Flex>

        <Flex justifyContent={'center'} mt={[4]} mb={'30px'}>
          <ButtonBase
            fontSize={4}
            size={'xsmall'}
            variant={'large'}
            style={{ transform: 'rotate(180deg)' }}>
            <SvgPlay />
          </ButtonBase>

          <Text fontSize={7} lineHeight={9} color={'color7'} mx={4}>
            1
          </Text>

          <ButtonBase fontSize={4} size={'xsmall'} variant={'large'}>
            <SvgPlay />
          </ButtonBase>
        </Flex>

        <Flex justifyContent={'center'}>
          <ButtonBase
            minWidth={'250px'}
            width={'100%'}
            fontSize={'18px'}
            lineHeight={'24px'}
            p={'8px 0px'}
            variant={'large'}
            mb={3}>
            Создать проект
            <Flex alignItems={'center'} pl={'20px'}>
              <SvgPlay />
            </Flex>
          </ButtonBase>
        </Flex>
      </Box>
    );
  });
