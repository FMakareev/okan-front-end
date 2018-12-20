import React from 'react';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';
import { ProjectEditorPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

test('ProjectEditorPage: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <ProjectEditorPage />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
