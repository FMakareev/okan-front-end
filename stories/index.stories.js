import React from 'react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react';
import StyledThemeProvider from '../src/styles/StyledThemeProvider';

import { ButtonBase } from '../src/components/ButtonBase/ButtonBase';

addDecorator(jsxDecorator);
addDecorator(withKnobs);

storiesOf('Components', module)
  .addDecorator(story => {
    return <StyledThemeProvider>{story()}</StyledThemeProvider>;
  })
  .add('Box', () => {
    return (
      <ButtonBase variant={'large'} size={'medium'}>
        1
      </ButtonBase>
    );
  });
