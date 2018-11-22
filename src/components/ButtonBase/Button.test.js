import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import { ButtonBase } from './ButtonBase';

it('Button: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ButtonBase />
    </StyledThemeProvider>,
  );
});
