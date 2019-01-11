import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { FormChangePassword } from './FormChangePassword';

it('FormChangePassword: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <FormChangePassword />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
});
