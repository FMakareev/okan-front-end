import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import { SmallPreloader } from './SmallPreloader';

it('SmallPreloader: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <SmallPreloader />
    </StyledThemeProvider>,
  );
});
