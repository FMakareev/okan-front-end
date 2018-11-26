import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import { Link } from './Link';

it('Link: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <Link to={'/'} />
    </StyledThemeProvider>,
  );
});
