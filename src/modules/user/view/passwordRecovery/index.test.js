import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { PasswordRecovery } from './index';
import { Store } from '../../../../store';
import mocksClient from '../../../../apollo/mocksClient';

test('PasswordRecovery: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={Store}>
        <ApolloProvider client={mocksClient}>
          <BrowserRouter>
            <PasswordRecovery />
          </BrowserRouter>
        </ApolloProvider>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
