import React from 'react';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';
import { ProjectListPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

test('ProjectListPage: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <ProjectListPage />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
