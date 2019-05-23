import React, { Fragment } from 'react';
import * as Sentry from '@sentry/browser';
import { hydrate } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider as ProviderRedux } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { AsyncComponentProvider } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import { client } from '../apollo/index.client';
import { ConfigRouter } from '../routes';
import { CreateStore } from '../store';
import { StyledThemeProvider } from '../styles/StyledThemeProvider';
import { GlobalStyle } from '../styles/GlobalStyle';
import { documentOffsetTop } from '../utils/dom/documentOffsetTop';

documentOffsetTop();
const Store = CreateStore();

export const SentryInstance = process.env.NODE_ENV === 'production' && Sentry.init({
  dsn: 'https://612734293d1f4ba4ae745fcbc7e22330@sentry.io/1431983',
});
// should have been called before using it here
// ideally before even rendering your react app

/**
 * @description https://github.com/ctrlplusb/react-async-component#server-side-rendering
 * */
const rehydrateState = window.ASYNC_COMPONENTS_STATE;

/**
 * {@linkcode https://github.com/ctrlplusb/react-universally/blob/master/client/index.js#L34}
 * {@linkcode https://github.com/ctrlplusb/react-async-component#server-side-rendering}
 * */
export const ROOT = (
  <AsyncComponentProvider rehydrateState={rehydrateState}>
    <StyledThemeProvider>
      <ApolloProvider client={client()}>
        <ProviderRedux store={Store}>
          <Fragment>
            <GlobalStyle />
            <BrowserRouter>{renderRoutes(ConfigRouter)}</BrowserRouter>
          </Fragment>
        </ProviderRedux>
      </ApolloProvider>
    </StyledThemeProvider>
  </AsyncComponentProvider>
);

/** {@linkcode https://github.com/ctrlplusb/react-async-component#server-side-rendering} */
asyncBootstrapper(ROOT).then(() => {
  /** {@linkcode https://reactjs.org/docs/react-dom.html#hydrate } */
  hydrate(ROOT, document.getElementById('app'));
  if (module.hot) {
    module.hot.accept();
  }
});
