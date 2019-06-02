import React from 'react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react';
import StyledThemeProvider from '../src/styles/StyledThemeProvider';

import { ButtonBase } from '../src/components/ButtonBase/ButtonBase';
import { Flex } from '../src/components/Flex/Flex';
import { Box } from '../src/components/Box/Box';
import { Th } from '../src/components/Table/Th';
import { Table } from '../src/components/Table/Table';
import { Tbody } from '../src/components/Table/Tbody';
import { Td } from '../src/components/Table/Td';
import { Tr } from '../src/components/Table/Tr';

/** Image */
import { SvgFolder } from '../src/components/Icons/SvgFolder';
import { SvgExport } from '../src/components/Icons/SvgExport';

addDecorator(jsxDecorator);
addDecorator(withKnobs);

storiesOf('Revision', module)
  .addDecorator(story => {
    return <StyledThemeProvider>{story()}</StyledThemeProvider>;
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
  });
