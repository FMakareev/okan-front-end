import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { createStore } from 'redux';

import { Registration } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import mocksClient from '../../../../apollo/mocksClient';

const store = createStore(() => {});

test('Registration: рендер без ошибок', () => {
  const renderWithProps = props => {
    const defaultProps = {
      match: {
        params: { key: '3c64e11c68c5159fb2a87b89ed719ae900e90ff77e2e0b19426b950b4fe8ff33' },
      },
    };
    return renderer.create(
      <StyledThemeProvider>
        <ProviderRedux store={store}>
          <ApolloProvider client={mocksClient}>
            <BrowserRouter>
              <Registration {...defaultProps} />
            </BrowserRouter>
          </ApolloProvider>
        </ProviderRedux>
      </StyledThemeProvider>,
    );
  };
  expect(renderWithProps({})).toMatchSnapshot();
});
