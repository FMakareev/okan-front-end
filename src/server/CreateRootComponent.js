import React, {Fragment} from 'react';
import url from 'url';
import { AsyncComponentProvider } from 'react-async-component';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { StyleSheetManager } from 'styled-components';

import { Provider as ProviderRedux } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import StyledThemeProvider from '../styles/StyledThemeProvider';
import { ConfigRouter } from '../routes';
import { GlobalStyle } from "../styles/GlobalStyle";

/**
 * @params {} asyncContext -
 * @params {} STStyleRenderer -
 * @params {} request -
 * @params {} Store -
 * @params {} RouterContext -
 * @params {} client -
 *
 * @description root react component
 * */
export const CreateRootComponent = ({
  asyncContext,
  STStyleRenderer,
  request,
  Store,
  RouterContext,
  ApolloClient,
}) => {
  /**
   * @description parse request url
   * */
  const { search } = url.parse(request.originalUrl);

  return (
    <AsyncComponentProvider asyncContext={asyncContext}>
      <ProviderRedux store={Store}>
        <ApolloProvider client={ApolloClient}>
          <StyleSheetManager sheet={STStyleRenderer.instance}>
            <StyledThemeProvider>
              <Fragment>
                <GlobalStyle/>
                <StaticRouter
                  location={{
                    pathname: request.originalUrl,
                    search,
                  }}
                  context={RouterContext}>
                  {renderRoutes(ConfigRouter)}
                </StaticRouter>
              </Fragment>
            </StyledThemeProvider>
          </StyleSheetManager>
        </ApolloProvider>
      </ProviderRedux>
    </AsyncComponentProvider>
  );
};

export default CreateRootComponent;
