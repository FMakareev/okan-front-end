import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from 'react-apollo';
import { Provider as ProviderRedux } from 'react-redux';
import { createStore } from 'redux';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { FormProfileRecoveryEmail } from './FormProfileRecoveryEmail';
import mocksClient from '../../../../apollo/mocksClient';
// import { CreateStore } from '../../../../store';

const store = createStore(() => {});

it('FormProfileRecoveryEmail: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <ApolloProvider client={mocksClient}>
          <FormProfileRecoveryEmail />
        </ApolloProvider>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
});
