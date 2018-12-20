import React from 'react';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';
import { Registration } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

test('Registration: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
