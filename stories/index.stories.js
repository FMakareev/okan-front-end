import React from 'react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react';
import StyledThemeProvider from '../src/styles/StyledThemeProvider';

import { ButtonBase } from '../src/components/ButtonBase/ButtonBase';
import { Flex } from '../src/components/Flex/Flex';
import { Box } from '../src/components/Box/Box';
import { Text } from '../src/components/Text/Text';
import { TooltipBase } from '../src/components/TooltipBase/TooltipBase';
import { TextFieldBase } from '../src/components/TextFieldBase/TextFieldBase';
import { TextFieldFirstWrapper } from '../src/components/TextFieldFirstWrapper/TextFieldFirstWrapper';
import { TextFieldLastWrapper } from '../src/components/TextFieldLastWrapper/TextFieldLastWrapper';

/** Image */
import { SvgPlay } from '../src/components/Icons/SvgPlay';
import FormLogo from '../src/modules/user/component//FormLogo/FormLogo';

addDecorator(jsxDecorator);
addDecorator(withKnobs);

storiesOf('Users', module)
  .addDecorator(story => {
    return <StyledThemeProvider>{story()}</StyledThemeProvider>;
  })
  .add('Логин', () => {
    return (
      <Box backgroundColor={'#e5e5e5'}>
        <Box width={'500px'} m={'0 auto'}>
          <FormLogo />
          <TextFieldFirstWrapper>
            <TextFieldBase size={'lg'} variant={'primary'} placeholder={'Логин'} />
          </TextFieldFirstWrapper>
          <TextFieldLastWrapper>
            <TextFieldBase size={'lg'} variant={'primary'} placeholder={'Пароль'} />
          </TextFieldLastWrapper>
          <Flex mt={'100px'} justifyContent={'center'}>
            <ButtonBase
              minWidth={'500px'}
              width={'100%'}
              fontSize={'32px'}
              lineHeight={'40px'}
              p={'8px 60px'}
              variant={'large'}
              mb={3}>
              Войти
              <Flex alignItems={'center'} pl={'20px'}>
                <SvgPlay />
              </Flex>
            </ButtonBase>
          </Flex>
        </Box>
      </Box>
    );
  })
  .add('Регистрация', () => {
    return (
      <Box backgroundColor={'#e5e5e5'}>
        <Box width={'500px'} m={'0 auto'}>
          <FormLogo />
          <TextFieldFirstWrapper>
            <TextFieldBase size={'lg'} variant={'primary'} placeholder={'Логин'} />
          </TextFieldFirstWrapper>
          <TextFieldBase size={'lg'} variant={'primary'} placeholder={'Пароль'} />
          <TextFieldLastWrapper>
            <TextFieldBase size={'lg'} variant={'primary'} placeholder={'Потвердите пароль'} />
          </TextFieldLastWrapper>
          <Flex mt={'100px'} justifyContent={'center'}>
            <ButtonBase
              minWidth={'500px'}
              width={'100%'}
              fontSize={'32px'}
              lineHeight={'40px'}
              p={'8px 60px'}
              variant={'large'}
              mb={3}>
              Регистрация
              <Flex alignItems={'center'} pl={'20px'}>
                <SvgPlay />
              </Flex>
            </ButtonBase>
          </Flex>
        </Box>
      </Box>
    );
  })
  .add('Восстановление пароля', () => {
    return (
      <Box backgroundColor={'#e5e5e5'}>
        <Box width={'500px'} m={'0 auto'}>
          <FormLogo />
          <TextFieldFirstWrapper>
            <TextFieldBase size={'lg'} variant={'primary'} placeholder={'Старый пароль'} />
          </TextFieldFirstWrapper>
          <TextFieldBase size={'lg'} variant={'primary'} placeholder={'Новый пароль'} />
          <TextFieldLastWrapper>
            <TextFieldBase
              size={'lg'}
              variant={'primary'}
              placeholder={'Потвердите новый пароль'}
            />
          </TextFieldLastWrapper>
          <Flex mt={'100px'} justifyContent={'center'}>
            <ButtonBase
              minWidth={'500px'}
              width={'100%'}
              fontSize={'32px'}
              lineHeight={'40px'}
              p={'8px 60px'}
              variant={'large'}
              mb={3}>
              Сменить пароль
              <Flex alignItems={'center'} pl={'20px'}>
                <SvgPlay />
              </Flex>
            </ButtonBase>
          </Flex>
        </Box>
      </Box>
    );
  });
