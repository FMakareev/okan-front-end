import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ChangePassword } from './ChangePassword/ChangePassword';
import { BrowserRouter } from 'react-router-dom';

it('ChangePassword: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
});
