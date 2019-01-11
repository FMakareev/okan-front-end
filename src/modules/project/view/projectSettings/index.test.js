import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import { ProjectSettingsPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { Store } from '../../../../store';
import mocksClient from '../../../../apollo/mocksClient';

test('ProjectSettingsPage: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <ProviderRedux store={Store}>
          <ApolloProvider client={mocksClient}>
            <ProjectSettingsPage />
          </ApolloProvider>
        </ProviderRedux>
      </BrowserRouter>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
