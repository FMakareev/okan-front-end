import React from 'react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react';
import StyledThemeProvider from '../src/styles/StyledThemeProvider';

import { ButtonBase } from '../src/components/ButtonBase/ButtonBase';
import { Flex } from '../src/components/Flex/Flex';
import { Box } from '../src/components/Box/Box';
import { Image } from '../src/components/Image/Image';
import { Text } from '../src/components/Text/Text';

/** Image */
import { SvgPlay } from '../src/components/Icons/SvgPlay';
import settings from '../src/assets/image/settings.png';
import { SvgDelete } from '../src/components/Icons/SvgDelete';
import { SvgAdd } from '../src/components/Icons/SvgAdd';
import { SvgTriangle } from '../src/components/Icons/SvgTriangle';

addDecorator(jsxDecorator);
addDecorator(withKnobs);

storiesOf('Project', module)
  .addDecorator(story => {
    return <StyledThemeProvider>{story()}</StyledThemeProvider>;
  })
  .add('Список проектов', () => {
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
  })
  .add('Настройки проекта', () => {
    return (
      <Box width={'500px'} m={'0 auto '}>
        <Flex
          border={'1px solid grey'}
          borderRadius={'5px'}
          alignItems={'center'}
          justifyContent={'center'}
          p={'5px 20px'}
          mb={'56px'}>
          <Text color={'color11'} fontFamily={'secondaryBold'} fontSize={6} lineHeight={8}>
            Проект #2
          </Text>
        </Flex>

        <Text mb={'12px'} variant={'documentTitle'}>
          Согласующие
        </Text>

        <Flex
          borderTop={'1px solid #00649c'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <SvgDelete />
          <Text textAlign={'center'} py={'8px'}>
            Имя Фамилия Отчество
          </Text>
          <Text />
        </Flex>

        <Flex
          borderTop={'1px solid #00649c'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <SvgDelete />
          <Text textAlign={'center'} py={'8px'}>
            Имя Фамилия Отчество
          </Text>
          <Text />
        </Flex>

        <Flex
          borderTop={'1px solid #00649c'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'45px'}>
          <SvgAdd />
          <Text textAlign={'center'} py={'8px'}>
            Добавить нового согласующего
          </Text>
          <SvgTriangle />
        </Flex>

        <Flex alignItems={'center'} mb={'90px'}>
          <Box width={'30px'} height={'30px'} border={'1px solid #00649c'} />
          <Text fontFamily={'primary300'} fontSize={6} lineHeight={8} color={'color11'} ml={20}>
            Сделать проект шаблоном
          </Text>
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
