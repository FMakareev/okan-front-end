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
  });
// .add('Редактор документа - Панель навигации', () => {
//   return (
//     <Flex
//       minHeight={'22px'}
//       width={'350px'}
//       alignItems={'center'}
//       justifyContent={'space-between'}
//       borderTop={'1px solid grey'}
//       borderBottom={'1px solid grey'}>
//       <Flex alignItems={'center'}>
//         <Box pr={'10px'}>
//           <SvgTriangle fill={'#848484'} />
//         </Box>
//         <Text fontFamily={'secondary'} lineHeight={7} fontSize={5} color={'#848484'}>
//           Раздел №1
//         </Text>
//       </Flex>

//       <Flex height={'20px'}>
//         <Box px={1} color={'#848484'}>
//           <SvgSettings />
//         </Box>
//         <Box px={1} color={'#848484'}>
//           <SvgSidebarSave />
//         </Box>
//         <Box px={1} color={'#848484'}>
//           <SvgSidebarList />
//         </Box>
//         <Box px={1} color={'#848484'}>
//           <SvgSidebarComment />
//         </Box>
//         <Box px={1} color={'#848484'}>
//           <SvgSidebarExport />
//         </Box>
//         <Box px={1} color={'#848484'}>
//           <SvgSidebarDelete />
//         </Box>
//       </Flex>
//     </Flex>
//   );
// })
// .add('Редактор документа - Подраздел', () => {
//   return (
//     <Flex
//       borderTop={'1px solid grey'}
//       borderBottom={'1px solid grey'}
//       minHeight={'22px'}
//       width={'350px'}>
//       <Box pr={'20px'}>1. Раздел или подраздел</Box>
//       <Box>
//         <ButtonBase
//           title={'Переименовать раздел.'}
//           variant={'outlineGray'}
//           p={'2px'}
//           fontSize={'15px'}>
//           <SvgSettings />
//         </ButtonBase>
//       </Box>
//       <Box>
//         <ButtonBase
//           title={'Добавить подраздел или раздел.'}
//           variant={'outlineGray'}
//           p={'2px'}
//           fontSize={'15px'}>
//           <SvgSidebarAdd />
//         </ButtonBase>
//       </Box>
//       <Box px={1}>
//         <ButtonBase title={'Статус проверки блока'} variant={'outlineGray'} p={'10px'}>
//           1
//         </ButtonBase>
//       </Box>
//     </Flex>
//   );
// });
