import React from 'react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react';
import StyledThemeProvider from '../src/styles/StyledThemeProvider';

import { ButtonBase } from '../src/components/ButtonBase/ButtonBase';
import { Box } from '../src/components/Box/Box';
import { Text } from '../src/components/Text/Text';

addDecorator(jsxDecorator);
addDecorator(withKnobs);

storiesOf('Settings Document', module)
  .addDecorator(story => {
    return <StyledThemeProvider>{story()}</StyledThemeProvider>;
  })
  .add('Настройки документа - Параметры документа', () => {
    return (
      <Box width={'500px'} m={'0 auto '}>
        <Text
          mb={'44px'}
          fontSize={'18px'}
          lineHeight={'24px'}
          color={'#00649c'}
          textAlign={'center'}
          fontWeight={'500'}>
          Параметры документа
        </Text>

        <Box p={'10px'}>
          <Text
            fontSize={5}
            border={'1px solid #848484'}
            borderRadius={'5px'}
            lineHeight={7}
            pl={4}
            pt={0}
            pb={2}
            mb={'12px'}>
            Текст таблиц
          </Text>

          <Text
            fontSize={5}
            lineHeight={7}
            pl={4}
            border={'1px solid #848484'}
            borderRadius={'5px'}
            py={'4px'}
            mb={'12px'}>
            оборудование для теска таблиц
          </Text>

          <Text
            fontSize={5}
            lineHeight={7}
            pl={4}
            border={'1px solid #848484'}
            borderRadius={'5px'}
            py={'4px'}
            mb={'12px'}>
            код окана для теста таблиц
          </Text>

          <Text
            fontSize={5}
            lineHeight={7}
            pl={4}
            border={'1px solid #848484'}
            borderRadius={'5px'}
            py={'4px'}>
            код заказчика для теста таблиц
          </Text>
        </Box>
      </Box>
    );
  })
  .add('Настройки документа - Внутренние согласующие ОКАН ', () => {
    return (
      <Box width={'500px'} m={'0 auto '}>
        <Text
          mb={'44px'}
          fontSize={'18px'}
          lineHeight={'24px'}
          color={'#00649c'}
          textAlign={'center'}
          fontWeight={'500'}>
          Внутренние согласующие ОКАН
        </Text>

        <ButtonBase variant={'large'} size={'medium'} mb={3} width={'100%'}>
          Добавить контрагента
        </ButtonBase>
      </Box>
    );
  })
  .add('Настройки документа - Внутренние утверждающие ОКАН ', () => {
    return (
      <Box width={'500px'} m={'0 auto '}>
        <Text
          mb={'44px'}
          fontSize={'18px'}
          lineHeight={'24px'}
          color={'#00649c'}
          textAlign={'center'}
          fontWeight={'500'}>
          Внутренние утверждающие ОКАН
        </Text>

        <ButtonBase variant={'large'} size={'medium'} mb={3} width={'100%'}>
          Добавить контрагента
        </ButtonBase>
      </Box>
    );
  })
  .add('Настройки документа - Внешние согласующие ', () => {
    return (
      <Box width={'500px'} m={'0 auto '}>
        <Text
          mb={'44px'}
          fontSize={'18px'}
          lineHeight={'24px'}
          color={'#00649c'}
          textAlign={'center'}
          fontWeight={'500'}>
          Внешние согласующие
        </Text>

        <ButtonBase variant={'large'} size={'medium'} mb={3} width={'100%'}>
          Добавить контрагента
        </ButtonBase>
      </Box>
    );
  })
  .add('Настройки документа - Внешние утверждающие ', () => {
    return (
      <Box width={'500px'} m={'0 auto '}>
        <Text
          mb={'44px'}
          fontSize={'18px'}
          lineHeight={'24px'}
          color={'#00649c'}
          textAlign={'center'}
          fontWeight={'500'}>
          Внешние утверждающие
        </Text>

        <ButtonBase variant={'large'} size={'medium'} mb={3} width={'100%'}>
          Добавить контрагента
        </ButtonBase>
      </Box>
    );
  });
