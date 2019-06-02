import React from 'react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react';
import StyledThemeProvider from '../src/styles/StyledThemeProvider';

import { ButtonBase } from '../src/components/ButtonBase/ButtonBase';
import { ButtonWithImage } from '../src/components/ButtonWithImage/ButtonWithImage';
import { Flex } from '../src/components/Flex/Flex';
import { Box } from '../src/components/Box/Box';
import { Card } from '../src/components/Card/Card';
import { Image } from '../src/components/Image/Image';
import { Message } from '../src/components/Message/Message';
import { PreloaderWrapper, SpeedingWheel } from '../src/components/SmallPreloader/SmallPreloader';
import { Text } from '../src/components/Text/Text';
import { TooltipBase } from '../src/components/TooltipBase/TooltipBase';
import { TextFieldBase } from '../src/components/TextFieldBase/TextFieldBase';
import { SelectBase } from '../src/components/SelectBase/SelectBase';
import { TextFieldFirstWrapper } from '../src/components/TextFieldFirstWrapper/TextFieldFirstWrapper';
import { TextFieldLastWrapper } from '../src/components/TextFieldLastWrapper/TextFieldLastWrapper';
import { TextFieldWithTooltip } from '../src/components/TextFieldWithTooltip/TextFieldWithTooltip';
import { Th } from '../src/components/Table/Th';
import { Table } from '../src/components/Table/Table';
import { Tbody } from '../src/components/Table/Tbody';
import { Td } from '../src/components/Table/Td';
import { Tr } from '../src/components/Table/Tr';
import { Thead } from '../src/components/Table/Thead';

import { FieldInputPassword } from '../src/modules/user/component/FieldInputPassword/FieldInputPassword';

/** Image */
import { SvgPlay } from '../src/components/Icons/SvgPlay';
import tableIcon from '../src/assets/image/tableIcon.png';
import FormLogo from '../src/modules/user/component//FormLogo/FormLogo';
import settings from '../src/assets/image/settings.png';
import { SvgSave } from '../src/components/Icons/SvgSave';
import { SvgDelete } from '../src/components/Icons/SvgDelete';
import { SvgAdd } from '../src/components/Icons/SvgAdd';
import { SvgTriangle } from '../src/components/Icons/SvgTriangle';
import { SvgFolder } from '../src/components/Icons/SvgFolder';
import { SvgExport } from '../src/components/Icons/SvgExport';
import { SvgSidebarAdd } from '../src/components/Icons/SvgSidebarAdd';
import { SvgSidebarComment } from '../src/components/Icons/SvgSidebarComment';
import { SvgSettings } from '../src/components/Icons/SvgSettings';
import { SvgSidebarSave } from '../src/components/Icons/SvgSidebarSave';
import { SvgSidebarList } from '../src/components/Icons/SvgSidebarList';
import { SvgSidebarExport } from '../src/components/Icons/SvgSidebarExport';
import { SvgSidebarDelete } from '../src/components/Icons/SvgSidebarDelete';

addDecorator(jsxDecorator);
addDecorator(withKnobs);

storiesOf('Components', module)
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
            <ButtonBase variant={'large'} size={'large'} mb={3}>
              Войти
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
            <ButtonBase variant={'large'} size={'large'} mb={3}>
              Регистрация
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
            <ButtonBase variant={'large'} size={'large'} mb={3}>
              Сменить пароль
            </ButtonBase>
          </Flex>
        </Box>
      </Box>
    );
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
          <ButtonBase variant={'large'} size={'medium'} mb={3} width={'100%'}>
            Создать пользователя
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
          <ButtonBase variant={'large'} size={'medium'} mb={3} width={'100%'}>
            Сменить пароль
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
          <ButtonBase variant={'large'} size={'medium'} mb={3} width={'100%'}>
            Сменить пароль
          </ButtonBase>
        </Flex>
      </Box>
    );
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
          <ButtonBase variant={'large'} size={'medium'} mb={3} width={'100%'}>
            Создать проект
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
          <ButtonBase variant={'large'} size={'medium'} mb={3} width={'100%'}>
            <SvgSave />
            <Text ml={20} color={'#00649c'}>
              Создать проект
            </Text>
          </ButtonBase>
        </Flex>
      </Box>
    );
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
  })
  .add('Просмотр ревизии ', () => {
    return (
      <Box width={'800px'} m={'0 auto'}>
        <Table width={'100%'}>
          <Tr>
            <Th
              fontSize={6}
              lineHeight={8}
              py={4}
              textAlign={'left'}
              width={'150px'}
              color={'color11'}>
              № Ревизии
            </Th>

            <Th fontSize={6} lineHeight={8} color={'color11'} py={4} width={'auto'}>
              Ф. И. О.
            </Th>

            <Th width={'175px'} fontSize={6} lineHeight={8} color={'color11'} py={4}>
              Дата
            </Th>

            <Th width={'100px'} fontSize={6} lineHeight={8} color={'color11'} py={4} />
          </Tr>
          <Tbody>
            <Tr>
              <Td py={4} borderTop={'2px solid #00649c'}>
                Текст таблиц
              </Td>
              <Td py={4} textAlign={'center'} borderTop={'2px solid #00649c'}>
                god god
              </Td>
              <Td py={4} textAlign={'center'} borderTop={'2px solid #00649c'}>
                02.06.2019 12:09:41
              </Td>
              <Td borderTop={'2px solid #00649c'}>
                <Flex justifyContent={'center'}>
                  <ButtonBase variant={'empty'}>
                    <SvgFolder />
                  </ButtonBase>

                  <ButtonBase title={'Эскпортировать ревизию документа'} variant={'empty'}>
                    <SvgExport />
                  </ButtonBase>
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    );
  })
  .add('Редактор документа - Поиск по докменту ', () => {
    return (
      <Flex width={'500px'} textAlign={'center'}>
        <Box height={'20px'} width={'100%'} mt={'-1px'}>
          <TextFieldBase
            name={'name'}
            placeholder={'Введите название документа...'}
            size={'xs'}
            type={'search'}
            borderRadius={'4px'}
            pr={'50px'}
          />
        </Box>

        <Box ml={'3'} height={'20px'}>
          <ButtonWithImage
            type={'submit'}
            title={'Поиск по документам'}
            size={'small'}
            variant={'outlineGray'}
            p={'2px'}
            fontSize={'15px'}>
            Поиск
          </ButtonWithImage>
        </Box>
      </Flex>
    );
  })
  .add('Редактор документа - Создание документа', () => {
    return (
      <Flex width={'500px'} textAlign={'center'}>
        <Box mt={'-1px'} height={'20px'} width={'100%'}>
          <TextFieldBase
            name={'name'}
            placeholder={'Введите название документа...'}
            size={'xs'}
            type={'text'}
            borderRadius={'4px'}
          />
        </Box>

        <Box ml={'3'} height={'20px'}>
          <ButtonBase
            type={'submit'}
            title={'Добавить документ'}
            size={'small'}
            variant={'outlineGray'}
            p={'2px'}
            fontSize={'15px'}>
            <SvgSidebarAdd />
          </ButtonBase>
        </Box>
      </Flex>
    );
  })
  .add('Редактор документа - Панель навигации', () => {
    return (
      <Flex
        minHeight={'22px'}
        width={'350px'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderTop={'1px solid grey'}
        borderBottom={'1px solid grey'}>
        <Flex alignItems={'center'}>
          <Box pr={'10px'}>
            <SvgTriangle fill={'#848484'} />
          </Box>
          <Text fontFamily={'secondary'} lineHeight={7} fontSize={5} color={'#848484'}>
            Раздел №1
          </Text>
        </Flex>

        <Flex height={'20px'}>
          <Box px={1} color={'#848484'}>
            <SvgSettings />
          </Box>
          <Box px={1} color={'#848484'}>
            <SvgSidebarSave />
          </Box>
          <Box px={1} color={'#848484'}>
            <SvgSidebarList />
          </Box>
          <Box px={1} color={'#848484'}>
            <SvgSidebarComment />
          </Box>
          <Box px={1} color={'#848484'}>
            <SvgSidebarExport />
          </Box>
          <Box px={1} color={'#848484'}>
            <SvgSidebarDelete />
          </Box>
        </Flex>
      </Flex>
    );
  })
  .add('Редактор документа - Подраздел', () => {
    return (
      <Flex
        borderTop={'1px solid grey'}
        borderBottom={'1px solid grey'}
        minHeight={'22px'}
        width={'350px'}>
        <Box pr={'20px'}>1. Раздел или подраздел</Box>
        <Box>
          <ButtonBase
            title={'Переименовать раздел.'}
            variant={'outlineGray'}
            p={'2px'}
            fontSize={'15px'}>
            <SvgSettings />
          </ButtonBase>
        </Box>
        <Box>
          <ButtonBase
            title={'Добавить подраздел или раздел.'}
            variant={'outlineGray'}
            p={'2px'}
            fontSize={'15px'}>
            <SvgSidebarAdd />
          </ButtonBase>
        </Box>
        <Box px={1}>
          <ButtonBase title={'Статус проверки блока'} variant={'outlineGray'} p={'10px'}>
            1
          </ButtonBase>
        </Box>
      </Flex>
    );
  });
