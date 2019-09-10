import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import mocksClient from '../../../../apollo/mocksClient';
import { createStore } from 'redux';
import { LogOut } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
// import { CreateStore } from '../../../../store';

const store = createStore(() => {});

test('LogOut: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <BrowserRouter>
          <ApolloProvider client={mocksClient}>
            <LogOut />
          </ApolloProvider>
        </BrowserRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
