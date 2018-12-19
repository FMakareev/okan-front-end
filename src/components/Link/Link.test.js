import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import { Link } from './Link';

it('Link: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <Link to="/" />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
});
