import React from 'react';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';
import { ProjectCreatePage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

test('ProjectCreatePage: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <ProjectCreatePage />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
