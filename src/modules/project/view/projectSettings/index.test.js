import React from 'react';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';
import { ProjectSettingsPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

test('ProjectSettingsPage: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <ProjectSettingsPage />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
