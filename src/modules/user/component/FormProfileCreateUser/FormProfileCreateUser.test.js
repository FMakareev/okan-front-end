import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from 'react-apollo';
import { Provider as ProviderRedux } from 'react-redux';
import { createStore } from 'redux';

import mocksClient from '../../../../apollo/mocksClient';
import { Store } from '../../../../store';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { FormProfileCreateUser } from './FormProfileCreateUser';

const store = createStore(() => {});

it('FormProfileCreateUser: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <ApolloProvider client={mocksClient}>
          <FormProfileCreateUser />
        </ApolloProvider>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
});
