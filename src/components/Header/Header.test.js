import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import Header from './Header';

test('Header: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
});
