import React from 'react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react';
import StyledThemeProvider from '../src/styles/StyledThemeProvider';

import { ButtonBase } from '../src/components/ButtonBase/ButtonBase';
import { Flex } from '../src/components/Flex/Flex';
import { Box } from '../src/components/Box/Box';
import { Text } from '../src/components/Text/Text';
import { TextFieldBase } from '../src/components/TextFieldBase/TextFieldBase';
import { TextFieldFirstWrapper } from '../src/components/TextFieldFirstWrapper/TextFieldFirstWrapper';
import { TextFieldLastWrapper } from '../src/components/TextFieldLastWrapper/TextFieldLastWrapper';

/** Image */
import { SvgPlay } from '../src/components/Icons/SvgPlay';

addDecorator(jsxDecorator);
addDecorator(withKnobs);

storiesOf('Profile', module)
  .addDecorator(story => {
    return <StyledThemeProvider>{story()}</StyledThemeProvider>;
  })
  .add('Профиль: Вход выполнен от админа - Создание пользователя', () => {
    return (
      <Box width={'360px'} m={'0 auto'}>
        <Box mb={'36px'}>
          <Text mb={'44px'} variant={'documentTitle'}>
            Создать пользователя
          </Text>
          <TextFieldFirstWrapper>
            <TextFieldBase size={'md'} variant={'primary'} placeholder={'Фамилия'} />
          </TextFieldFirstWrapper>

          <TextFieldBase size={'md'} variant={'primary'} placeholder={'Имя'} />
          <TextFieldBase size={'md'} variant={'primary'} placeholder={'Отчество'} />
          <TextFieldBase size={'md'} variant={'primary'} placeholder={'Дата рождения'} />
          <TextFieldBase size={'md'} variant={'primary'} placeholder={'Должность'} />
          <TextFieldBase size={'md'} variant={'primary'} placeholder={'(111) - 111 - 11 - 11'} />
          <TextFieldBase size={'md'} variant={'primary'} placeholder={'Электронная почта'} />
          <TextFieldLastWrapper>
            <TextFieldBase size={'md'} variant={'primary'} placeholder={'Загрузить подпись'} />
          </TextFieldLastWrapper>
        </Box>

        <Flex mt={'100px'} justifyContent={'center'}>
          <ButtonBase
            minWidth={'250px'}
            width={'100%'}
            fontSize={'18px'}
            lineHeight={'24px'}
            p={'8px 0px'}
            variant={'large'}
            mb={3}>
            Создать пользователя
            <Flex alignItems={'center'} pl={'20px'}>
              <SvgPlay />
            </Flex>
          </ButtonBase>
        </Flex>
      </Box>
    );
  })
  .add('Профиль: Вход выполнен от админа - Воссановление пароля', () => {
    return (
      <Box width={'360px'} m={'0 auto'}>
        <Box mb={'12px'}>
          <TextFieldBase
            size={'md'}
            variant={'primary'}
            placeholder={'email@okan.su'}
            borderRadius={'5px'}
          />
        </Box>

        <Flex justifyContent={'center'}>
          <ButtonBase
            minWidth={'250px'}
            width={'100%'}
            fontSize={'18px'}
            lineHeight={'24px'}
            p={'8px 0px'}
            variant={'large'}
            mb={3}>
            Сменить пароль
            <Flex alignItems={'center'} pl={'20px'}>
              <SvgPlay />
            </Flex>
          </ButtonBase>
        </Flex>
      </Box>
    );
  })
  .add('Профиль: Вход выполнен от админа или от пользователя - Оповещение', () => {
    return (
      <Box width={'500px'} m={'0 auto'}>
        <Text mb={'24px'} variant={'documentTitle'}>
          Оповещения
        </Text>

        <Box mb={[4]}>
          <Box borderRadius={'5px 5px 0 0'} border={'1px solid grey'} p={'5px'}>
            <Text fontSize={6} lineHeight={8} color={'color11'} fontFamily={'secondary'}>
              <Flex>
                Добавлен
                <Text color={'color7'} ml={'5px'}>
                  {' '}
                  комментарий "1"
                </Text>
              </Flex>
            </Text>
          </Box>

          <Flex borderRadius={'0 0 5px 5px'} border={'1px solid grey'} p={'5px'}>
            <Text pr={'8px'}>Автор: kate kate</Text>
            <Text>Создан: 21.03.2019 14:41:24</Text>
          </Flex>
        </Box>

        <Box mb={[4]}>
          <Box borderRadius={'5px 5px 0 0'} border={'1px solid grey'} p={'5px'}>
            <Text fontSize={6} lineHeight={8} color={'color11'} fontFamily={'secondary'}>
              <Flex>
                Добавлен
                <Text color={'color7'} ml={'5px'}>
                  комментарий "2"
                </Text>
              </Flex>
            </Text>
          </Box>

          <Flex borderRadius={'0 0 5px 5px'} border={'1px solid grey'} p={'5px'}>
            <Text pr={'8px'}>Автор: kate kate</Text>
            <Text>Создан: 21.03.2019 14:41:24</Text>
          </Flex>
        </Box>
      </Box>
    );
  })
  .add('Профиль: Вход выполнен от пользователя - Личные данные', () => {
    return (
      <Box width={'500px'} m={'0 auto'}>
        <Text mb={'44px'} variant={'documentTitle'}>
          Личные данные
        </Text>

        <Box p={'10px'} border={'1px solid #848484'} borderRadius={'5px'}>
          <Text fontSize={5} lineHeight={7} pl={4} pt={0} pb={2}>
            Иванов
          </Text>

          <Text fontSize={5} lineHeight={7} pl={4} borderTop={'2px solid #00649C'} py={'4px'}>
            Иван
          </Text>

          <Text fontSize={5} lineHeight={7} pl={4} borderTop={'2px solid #00649C'} py={'4px'}>
            Ивнаович
          </Text>

          <Text fontSize={5} lineHeight={7} pl={4} borderTop={'2px solid #00649C'} py={'4px'}>
            01.01.2020
          </Text>

          <Text fontSize={5} lineHeight={7} pl={4} borderTop={'2px solid #00649C'} py={'4px'}>
            Должность
          </Text>

          <Text fontSize={5} lineHeight={7} pl={4} borderTop={'2px solid #00649C'} py={'4px'}>
            +7 - 111 - 111 - 11 - 11
          </Text>

          <Text
            fontSize={5}
            lineHeight={7}
            pl={4}
            borderTop={'2px solid #00649C'}
            py={'4px'}
            mb={-2}>
            okan@okan.su
          </Text>
        </Box>
      </Box>
    );
  })
  .add('Профиль: Вход выполнен от пользователя - Смена пароля', () => {
    return (
      <Box width={'500px'} m={'0 auto'}>
        <Flex justifyContent={'center'}>
          <ButtonBase
            minWidth={'250px'}
            width={'100%'}
            fontSize={'18px'}
            lineHeight={'24px'}
            p={'8px 0px'}
            variant={'large'}
            mb={3}>
            Сменить пароль
            <Flex alignItems={'center'} pl={'20px'}>
              <SvgPlay />
            </Flex>
          </ButtonBase>
        </Flex>
      </Box>
    );
  });
