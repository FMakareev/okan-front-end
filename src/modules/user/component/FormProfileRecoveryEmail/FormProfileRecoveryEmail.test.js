import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from 'react-apollo';
import { Provider as ProviderRedux } from 'react-redux';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { FormProfileRecoveryEmail } from './FormProfileRecoveryEmail';
import mocksClient from '../../../../apollo/mocksClient';
import { Store } from '../../../../store';

it('FormProfileRecoveryEmail: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={Store}>
        <ApolloProvider client={mocksClient}>
          <FormProfileRecoveryEmail />
        </ApolloProvider>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
});
