import React from 'react';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';
import { PasswordRecovery } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

test('PasswordRecovery: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <PasswordRecovery />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
