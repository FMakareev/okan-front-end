import React from 'react';
import renderer from 'react-test-renderer';

import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import Header from './Header';

it('Header: Рендерится без ошибок', () => {
  renderer
    .create(
      <StyledThemeProvider>
        <Header />
      </StyledThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
