import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

it('HomePage: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <HomePage />
    </StyledThemeProvider>,
  );
});
