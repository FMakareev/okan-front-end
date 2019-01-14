import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import { Registration } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { Store } from '../../../../store';
import mocksClient from '../../../../apollo/mocksClient';

test('Registration: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={Store}>
        <ApolloProvider client={mocksClient}>
          <BrowserRouter>
            <Registration />
          </BrowserRouter>
        </ApolloProvider>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
