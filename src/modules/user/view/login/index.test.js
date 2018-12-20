import React from 'react';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';
import { Login } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

test('Login: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
