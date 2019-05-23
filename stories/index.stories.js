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
import { Link } from '../src/components/Link/Link';

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
  });
