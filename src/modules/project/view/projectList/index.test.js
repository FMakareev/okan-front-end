import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider as ProviderRedux } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { ProjectListPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

const store = createStore(() => {});

test('ProjectListPage: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <BrowserRouter>
          <ProjectListPage />
        </BrowserRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
