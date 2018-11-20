import React, {Fragment} from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider as ProviderRedux } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { AsyncComponentProvider } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import { client } from '../apollo/index.client';
import { ConfigRouter } from '../routes';
import { Store } from '../store';
import { StyledThemeProvider } from '../styles/StyledThemeProvider';
import { GlobalStyle } from "../styles/GlobalStyle";




/**
 * @description https://github.com/ctrlplusb/react-async-component#server-side-rendering
 * */
const rehydrateState = window.ASYNC_COMPONENTS_STATE;

/**
 * {@linkcode https://github.com/ctrlplusb/react-universally/blob/master/client/index.js#L34}
 * {@linkcode https://github.com/ctrlplusb/react-async-component#server-side-rendering}
 * */
const ROOT = (
  <AsyncComponentProvider rehydrateState={rehydrateState}>
    <StyledThemeProvider>
      <ApolloProvider client={client}>
        <ProviderRedux store={Store}>
          <Fragment>
            <GlobalStyle/>
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
