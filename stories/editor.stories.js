import React from 'react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react';
import StyledThemeProvider from '../src/styles/StyledThemeProvider';

import { ButtonBase } from '../src/components/ButtonBase/ButtonBase';
import { ButtonWithImage } from '../src/components/ButtonWithImage/ButtonWithImage';
import { Flex } from '../src/components/Flex/Flex';
import { Box } from '../src/components/Box/Box';
import { Text } from '../src/components/Text/Text';
import { TextFieldBase } from '../src/components/TextFieldBase/TextFieldBase';
import { Image } from '../src/components/Image/Image';

/** Image */
import { SvgTriangle } from '../src/components/Icons/SvgTriangle';
import { SvgSidebarAdd } from '../src/components/Icons/SvgSidebarAdd';
import { SvgSidebarComment } from '../src/components/Icons/SvgSidebarComment';
import { SvgSettings } from '../src/components/Icons/SvgSettings';
import { SvgSidebarSave } from '../src/components/Icons/SvgSidebarSave';
import { SvgSidebarList } from '../src/components/Icons/SvgSidebarList';
import { SvgSidebarExport } from '../src/components/Icons/SvgSidebarExport';
import { SvgSidebarDelete } from '../src/components/Icons/SvgSidebarDelete';

addDecorator(jsxDecorator);
addDecorator(withKnobs);

storiesOf('Editor', module)
  .addDecorator(story => {
    return <StyledThemeProvider>{story()}</StyledThemeProvider>;
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
          <Box p={'0 10px 3px 0'}>
            <SvgTriangle fill={'#848484'} />
          </Box>
          <Text fontFamily={'secondary'} lineHeight={7} fontSize={5} color={'#848484'}>
            Раздел №1
          </Text>
        </Flex>

        <Flex height={'20px'}>
          <ButtonBase
            variant={'outlineGray'}
            p={'2px'}
            fontSize={'15px'}
            mx={'2px'}
            title={'Открыть настройки документа.'}>
            <SvgSettings />
          </ButtonBase>

          <ButtonBase
            variant={'outlineGray'}
            p={'2px'}
            fontSize={'15px'}
            mx={'2px'}
            title={'Создать ревизию документа.'}>
            <SvgSidebarSave />
          </ButtonBase>

          <ButtonBase
            variant={'outlineGray'}
            p={'2px'}
            fontSize={'15px'}
            mx={'2px'}
            title={'Список ревизий.'}>
            <SvgSidebarList />
          </ButtonBase>

          <ButtonBase
            variant={'outlineGray'}
            p={'2px'}
            fontSize={'15px'}
            mx={'2px'}
            title={'Отправить на согласование.'}>
            <SvgSidebarComment />
          </ButtonBase>

          <ButtonBase
            variant={'outlineGray'}
            p={'2px'}
            fontSize={'15px'}
            mx={'2px'}
            title={'Экспортировать документ.'}>
            <SvgSidebarExport />
          </ButtonBase>

          <ButtonBase
            variant={'outlineGray'}
            p={'2px'}
            fontSize={'15px'}
            mx={'2px'}
            title={'Удалить документ.'}>
            <SvgSidebarDelete />
          </ButtonBase>
        </Flex>
      </Flex>
    );
  })
  .add('Редактор документа - Подраздел', () => {
    return (
      <Box>
        <Text mb={'5px'} color={'color7'}>
          Блок навигации - стандартный вид
        </Text>
        <Flex minHeight={'22px'} width={'350px'} mb={'30px'} justifyContent={'space-between'}>
          <Flex>
            <Box p={'0 10px 3px 0'}>
              <SvgTriangle fill={'#848484'} />
            </Box>
            <Box pr={'20px'}>1. Раздел или подраздел</Box>
          </Flex>

          <Box px={1}>
            <ButtonBase title={'Статус проверки блока'} variant={'outlineGray'} p={'10px'}>
              <Box
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: '0.5px solid #848484',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: ' translate(-50%, -50%)',
                  backgroundColor: '#DF4624',
                }}
              />
            </ButtonBase>
          </Box>
        </Flex>

        <Text mb={'5px'} color={'color7'}>
          Блок навигации - при наведенном курсоре на блок, и с желтым статусом (изменения в
          документе)
        </Text>
        <Flex minHeight={'22px'} width={'350px'} mb={'30px'} justifyContent={'space-between'}>
          <Flex>
            <Box p={'0 10px 3px 0'}>
              <SvgTriangle fill={'#848484'} />
            </Box>
            <Box pr={'20px'}>1. Раздел или подраздел</Box>
          </Flex>

          <Flex>
            <Box px={1}>
              <ButtonBase
                title={'Переименовать раздел.'}
                variant={'outlineGray'}
                p={'2px'}
                fontSize={'15px'}>
                <SvgSettings />
              </ButtonBase>
            </Box>
            <Box px={1}>
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
                <Box
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: '0.5px solid #848484',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: ' translate(-50%, -50%)',
                    backgroundColor: '#F3C318',
                  }}
                />
              </ButtonBase>
            </Box>
          </Flex>
        </Flex>

        <Text mb={'5px'} color={'color7'}>
          Блок навигации - при наведенном курсоре на блок, и с зеленым статусом (измнений в
          документе нет)
        </Text>
        <Flex minHeight={'22px'} width={'350px'} mb={'30px'} justifyContent={'space-between'}>
          <Flex>
            <Box p={'0 10px 3px 0'}>
              <SvgTriangle fill={'#848484'} />
            </Box>
            <Box pr={'20px'}>1. Раздел или подраздел</Box>
          </Flex>

          <Flex>
            <Box px={1}>
              <ButtonBase
                title={'Переименовать раздел.'}
                variant={'outlineGray'}
                p={'2px'}
                fontSize={'15px'}>
                <SvgSettings />
              </ButtonBase>
            </Box>
            <Box px={1}>
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
                <Box
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: '0.5px solid #848484',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: ' translate(-50%, -50%)',
                    backgroundColor: '#2FBC0B',
                  }}
                />
              </ButtonBase>
            </Box>
          </Flex>
        </Flex>
      </Box>
    );
  })
  .add('Редактор документа - Раздел создания документа', () => {
    return (
      <React.Fragment>
        <Text fontSize={6} lineHeight={8} color={'color7'} mb={'20px'}>
          Раздел не выбран в панели навигации
        </Text>

        <Box
          style={{
            backgroundColor: '#ffffff',
            paddingTop: '10px',
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            marginBottom: '20px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '5px',
            minHeight: '60px',
          }}>
          <Text fontSize={6} lineHeight={8}>
            Раздел не выбран.
          </Text>
        </Box>

        <Text fontSize={6} lineHeight={8} color={'color7'} mb={'20px'}>
          Выбран раздел
        </Text>

        <Box style={{ backgroundColor: '#E5E5E5', height: '170px' }} mb={'30px'}>
          <Text fontSize={6} lineHeight={8} p={'0 0 10px 20px'}>
            1.
          </Text>
          <Box
            style={{
              backgroundColor: '#ffffff',
              paddingTop: '10px',
              paddingBottom: '20px',
              paddingLeft: '20px',
              paddingRight: '20px',
              marginBottom: '20px',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '5px',
              minHeight: '60px',
              width: 'calc(100% - 380px)',
              margin: '0 0 0 20px',
            }}>
            <Text fontSize={6} lineHeight={8}>
              1.1. Подраздел
            </Text>
          </Box>
          <Flex p={'10px 10px 10px 10px'}>
            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'} pr={'10px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Таблица
                </Text>
              </ButtonBase>
            </Box>

            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Рисунок
                </Text>
              </ButtonBase>
            </Box>

            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Текст
                </Text>
              </ButtonBase>
            </Box>
          </Flex>
        </Box>

        <Text fontSize={6} lineHeight={8} color={'color7'} mb={'20px'}>
          Выбрали создание текста в разделе
        </Text>

        <Box style={{ backgroundColor: '#E5E5E5', height: '200px' }} mb={'40px'}>
          <Text fontSize={6} lineHeight={8} p={'0 0 10px 20px'}>
            1.
          </Text>
          <Box
            style={{
              backgroundColor: '#ffffff',
              paddingTop: '10px',
              paddingBottom: '20px',
              paddingLeft: '20px',
              paddingRight: '20px',
              marginBottom: '20px',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '5px',
              minHeight: '60px',
              width: 'calc(100% - 380px)',
              margin: '0 0 0 20px',
            }}>
            <Text fontSize={6} lineHeight={8}>
              1.1. Подраздел
            </Text>
            <Flex mt={'20px'}>
              <Text m={'0 10px 10px 10px'}> 1.1.1. </Text>

              <Text backgroundColor={'color14'} mr={'10px'}>
                Нажмите чтобы начать редактирование раздела
              </Text>

              <Box>
                <ButtonBase
                  variant={'outlineGray'}
                  p={'2px'}
                  fontSize={'15px'}
                  mx={'2px'}
                  title={'Удалить документ.'}>
                  <SvgSidebarDelete />
                </ButtonBase>
              </Box>
            </Flex>
          </Box>

          <Flex p={'10px 10px 10px 10px'}>
            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'} pr={'10px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Таблица
                </Text>
              </ButtonBase>
            </Box>

            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Рисунок
                </Text>
              </ButtonBase>
            </Box>

            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Текст
                </Text>
              </ButtonBase>
            </Box>
          </Flex>
        </Box>

        <Text fontSize={6} lineHeight={8} color={'color7'} m={'20px 0 20px 0px'}>
          Выбрали создание таблицы в разделе
        </Text>

        <Box style={{ backgroundColor: '#E5E5E5', height: '200px' }} mb={'50px'}>
          <Text fontSize={6} lineHeight={8} p={'0 0 10px 20px'}>
            1.
          </Text>
          <Box
            style={{
              backgroundColor: '#ffffff',
              paddingTop: '10px',
              paddingBottom: '20px',
              paddingLeft: '20px',
              paddingRight: '20px',
              marginBottom: '20px',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '5px',
              minHeight: '60px',
              width: 'calc(100% - 380px)',
              margin: '0 0 0 20px',
            }}>
            <Text fontSize={6} lineHeight={8}>
              1.1. Подраздел
            </Text>

            <Text m={'20px 0 0 0px'} fontWeight={700}>
              Таблица 3.
            </Text>
            <Flex>
              <Text backgroundColor={'color14'} mr={'10px'}>
                Нажмите чтобы начать редактирование раздела
              </Text>

              <Box>
                <ButtonBase
                  variant={'outlineGray'}
                  p={'2px'}
                  fontSize={'15px'}
                  mx={'2px'}
                  title={'Удалить документ.'}>
                  <SvgSidebarDelete />
                </ButtonBase>
              </Box>
            </Flex>
          </Box>

          <Flex p={'10px 10px 10px 10px'}>
            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'} pr={'10px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Таблица
                </Text>
              </ButtonBase>
            </Box>

            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Рисунок
                </Text>
              </ButtonBase>
            </Box>

            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Текст
                </Text>
              </ButtonBase>
            </Box>
          </Flex>

          <Text fontSize={6} lineHeight={8} color={'color7'} m={'20px 0 20px 0px'}>
            Выбрали создание рисунка в разделе
          </Text>

          <Box style={{ backgroundColor: '#E5E5E5', height: '200px' }}>
            <Text fontSize={6} lineHeight={8} p={'0 0 10px 10px'}>
              1.
            </Text>
            <Box
              style={{
                backgroundColor: '#ffffff',
                paddingTop: '10px',
                paddingBottom: '20px',
                paddingLeft: '20px',
                paddingRight: '20px',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '5px',
                minHeight: '60px',
              }}>
              <Text fontSize={6} lineHeight={8}>
                1.1. Подраздел
              </Text>

              <Flex m={'20px 0 10px 0px'}>
                <Text backgroundColor={'color14'} mr={'10px'}>
                  Нажмите чтобы начать редактирование раздела
                </Text>

                <Box>
                  <ButtonBase
                    variant={'outlineGray'}
                    p={'2px'}
                    fontSize={'15px'}
                    mx={'2px'}
                    title={'Удалить документ.'}>
                    <SvgSidebarDelete />
                  </ButtonBase>
                </Box>
              </Flex>
              <Text fontWeight={700}>Рисунок 4.</Text>
            </Box>

            <Flex p={'10px 10px 10px 10px'}>
              <Box pr={'10px'}>
                <ButtonBase variant={'outlineGray'} width={'100px'} pr={'10px'}>
                  <Text color={'color4'} fontSize={5} lineHeight={6}>
                    Таблица
                  </Text>
                </ButtonBase>
              </Box>

              <Box pr={'10px'}>
                <ButtonBase variant={'outlineGray'} width={'100px'}>
                  <Text color={'color4'} fontSize={5} lineHeight={6}>
                    Рисунок
                  </Text>
                </ButtonBase>
              </Box>

              <Box pr={'10px'}>
                <ButtonBase variant={'outlineGray'} width={'100px'}>
                  <Text color={'color4'} fontSize={5} lineHeight={6}>
                    Текст
                  </Text>
                </ButtonBase>
              </Box>
            </Flex>
          </Box>
        </Box>
      </React.Fragment>
    );
  })
  .add('Заполненный раздел (текст, таблица, рисунок)', () => {
    return (
      <React.Fragment>
        <Box style={{ backgroundColor: '#E5E5E5', height: '100%' }} mb={'40px'}>
          <Text fontSize={6} lineHeight={8} p={'0 0 10px 20px'}>
            1.
          </Text>
          <Box
            style={{
              backgroundColor: '#ffffff',
              paddingTop: '10px',
              paddingBottom: '20px',
              paddingLeft: '20px',
              paddingRight: '20px',
              marginBottom: '20px',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '5px',
              minHeight: '60px',
              width: 'calc(100% - 380px)',
              margin: '0 0 0 20px',
            }}>
            <Text fontSize={6} lineHeight={8}>
              1.1. Подраздел
            </Text>

            <Flex mt={'20px'} justifyContent={'space-between'}>
              <Flex>
                <Text m={'0 10px 10px 10px'}> 1.1.1. </Text>

                <Text>Lorem lorem lorem lorem</Text>
              </Flex>

              <Box>
                <ButtonBase
                  variant={'outlineGray'}
                  p={'2px'}
                  fontSize={'15px'}
                  mx={'2px'}
                  title={'Удалить документ.'}>
                  <SvgSidebarDelete />
                </ButtonBase>
              </Box>
            </Flex>

            <Flex m={'20px 0 20px 0'} justifyContent={'space-between'}>
              <Flex>
                <Text m={'0 10px 10px 10px'}> 1.1.2. </Text>

                <Text>Lorem lorem lorem lorem</Text>
              </Flex>

              <Box>
                <ButtonBase
                  variant={'outlineGray'}
                  p={'2px'}
                  fontSize={'15px'}
                  mx={'2px'}
                  title={'Удалить документ.'}>
                  <SvgSidebarDelete />
                </ButtonBase>
              </Box>
            </Flex>

            <Flex alignItems={'flex-end'}>
              <Image
                src={
                  'https://bipbap.ru/wp-content/uploads/2017/09/0_838c4_c99493f3_XXL-640x384.jpg'
                }
              />
              <ButtonBase
                variant={'outlineGray'}
                p={'2px'}
                fontSize={'15px'}
                mx={'2px'}
                title={'Удалить документ.'}>
                <SvgSidebarDelete />
              </ButtonBase>
            </Flex>
            <Text fontWeight={700}>Рисунок 1. Схема подключения электропривода</Text>

            <Text fontWeight={700} my={'10px'}>
              Таблица 1. Характеристики оборудования
            </Text>
            <Box>
              <Flex>
                <Flex
                  border={'0.5px solid #dbe2f2'}
                  width={'40%'}
                  p={'10px'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  Наименование параметра
                </Flex>
                <Flex
                  border={'0.5px solid #dbe2f2'}
                  width={'40%'}
                  p={'10px'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  Значение параметра
                </Flex>
              </Flex>
              <Flex alignItems={'flex-end'}>
                <Flex
                  border={'0.5px solid #dbe2f2'}
                  width={'40%'}
                  p={'10px'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  Наименование изделия
                </Flex>
                <Flex
                  border={'0.5px solid #dbe2f2'}
                  width={'40%'}
                  p={'10px'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  Клапан с электроприводом
                </Flex>
                <ButtonBase
                  variant={'outlineGray'}
                  p={'2px'}
                  fontSize={'15px'}
                  mx={'5px'}
                  title={'Удалить документ.'}>
                  <SvgSidebarDelete />
                </ButtonBase>
              </Flex>
            </Box>
          </Box>

          <Flex p={'10px 10px 10px 20px'}>
            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'} pr={'10px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Таблица
                </Text>
              </ButtonBase>
            </Box>

            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Рисунок
                </Text>
              </ButtonBase>
            </Box>

            <Box pr={'10px'}>
              <ButtonBase variant={'outlineGray'} width={'100px'}>
                <Text color={'color4'} fontSize={5} lineHeight={6}>
                  Текст
                </Text>
              </ButtonBase>
            </Box>
          </Flex>
        </Box>
      </React.Fragment>
    );
  });
