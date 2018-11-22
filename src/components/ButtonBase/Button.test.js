import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import { Button } from './Button';

it('Button: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <Button />
    </StyledThemeProvider>,
  );
});
