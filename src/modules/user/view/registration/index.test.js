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
            <Registration
              key={'3c64e11c68c5159fb2a87b89ed719ae900e90ff77e2e0b19426b950b4fe8ff33'}
            />
          </BrowserRouter>
        </ApolloProvider>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
