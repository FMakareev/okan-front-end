import React from 'react';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';
import { DocumentSettingsPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

test('DocumentSettingsPage: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <DocumentSettingsPage />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
