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
import { Table } from '../src/components/Table/Table';
import { Tbody } from '../src/components/Table/Tbody';
import { Td } from '../src/components/Table/Td';
import { Th } from '../src/components/Table/Th';
import { Thead } from '../src/components/Table/Thead';
import { Tr } from '../src/components/Table/Tr';
import { Text } from '../src/components/Text/Text';
import { TooltipBase } from '../src/components/TooltipBase/TooltipBase';
import { TextFieldBase } from '../src/components/TextFieldBase/TextFieldBase';

/** Image */
import { SvgPlay } from '../src/components/Icons/SvgPlay';
import tableIcon from '../src/assets/image/tableIcon.png';

addDecorator(jsxDecorator);
addDecorator(withKnobs);

storiesOf('Components', module)
  .addDecorator(story => {
    return <StyledThemeProvider>{story()}</StyledThemeProvider>;
  })
  .add('Button', () => {
    return (
      <Box>
        <ButtonBase variant={'xsmall'} size={'medium'} mb={3}>
          ButtonBase
        </ButtonBase>

        <ButtonBase variant={'small'} size={'large'} mb={3}>
          ButtonBase
        </ButtonBase>

        <ButtonWithImage variant={'xsmall'} size={'medium'} leftIcon={<SvgPlay />} mr={5}>
          Button With Image
        </ButtonWithImage>
      </Box>
    );
  })
  .add('Card', () => {
    return (
      <Card border={'1px solid #000'}>
        <Flex alignItems={'center'} justifyContent={'center'} minHeight={'90px'}>
          Card
        </Flex>
      </Card>
    );
  })
  .add('Image', () => {
    return <Image src={tableIcon} width={'50px'} height={'50px'} />;
  })
  .add('Message', () => {
    return <Message description={'Message block'} />;
  })
  .add('SmallPreloader', () => {
    return (
      <PreloaderWrapper>
        <SpeedingWheel />
      </PreloaderWrapper>
    );
  })
  .add('Table', () => {
    return (
      <Table width={'100%'}>
        <Tr>
          <Th fontSize={8} lh={10}>
            First
          </Th>
          <Th fontSize={8} lh={10}>
            Second
          </Th>
          <Th fontSize={8} lh={10}>
            Three
          </Th>
        </Tr>

        <Tr textAlign={'center'}>
          <Td>1</Td>
          <Td>2</Td>
          <Td>3</Td>
        </Tr>
      </Table>
    );
  })
  .add('Text', () => {
    return <Text variant={'document'}> Lorem lorem</Text>;
  })
  .add('TooltipBase', () => {
    return (
      <TooltipBase position={'top'}>
        <Text variant={'document'}> Lorem lorem</Text>
      </TooltipBase>
    );
  });
