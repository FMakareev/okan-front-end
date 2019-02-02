import React from 'react';
import {renderToStringWithData} from 'react-apollo';
import asyncBootstrapper from 'react-async-bootstrapper';
import {ServerStyleSheet} from 'styled-components';
import {createAsyncContext} from 'react-async-component';
import {Store} from '../store';
import {client} from '../apollo/index.server';

import CreateRootComponent from './CreateRootComponent';
// import { initLocalize } from '../store/reducers/localization/actions';
import CreateRenderComponents from './CreateRenderComponents';
import {userInit} from "../store/reducers/user/actions";

export const Root = async (request, response) => {

  /**
   * @description Create the async context for our provider, this grants us the ability to tap into the state to send back to the client.
   * */
  const asyncContext = createAsyncContext();
  const STStyleRenderer = new ServerStyleSheet();

  await Store.dispatch(userInit(Store.getState(),request));

  const RouterContext = {};

  const ApolloClient = client(request, response);

  const RootComponent = CreateRootComponent({
    ApolloClient,
    RouterContext,
    Store,
    asyncContext,
    STStyleRenderer,
    request,
  });

  const RenderComponents = CreateRenderComponents({
    STStyleRenderer,
    asyncContext,
    Store,
    ApolloClient,
    response,
    request,
  });

  asyncBootstrapper(RootComponent)
    .then(() => {
      /**
       * @param {Object} RootComponent - React component
       * @description https://www.apollographql.com/docs/react/features/server-side-rendering.html#renderToStringWithData
       * */
      renderToStringWithData(RootComponent)
        .then(RenderComponents(RouterContext))
        .catch(e => {
          console.error('APOLLO REQUEST ERROR:', e); // eslint-disable-line no-console

          RouterContext.status = 500;
          RenderComponents(RouterContext)();
          //
          // /** @description http://expressjs.com/en/4x/api.html#res.status */
          // response.status(500);
          // /** @description http://expressjs.com/en/4x/api.html#res.end */
          // response.end(
          //   `APOLLO REQUEST ERROR:An error occurred. Please submit an issue to with the following stack trace:\n\n${
          //     e.stack
          //     }`,
          // );
        });
    })
    .catch(e => {
      console.error('RENDERING ERROR:', e); // eslint-disable-line no-console
      /** @description http://expressjs.com/en/4x/api.html#res.status */
      response.status(500);
      /** @description http://expressjs.com/en/4x/api.html#res.end */
      response.end(
        `An error occurred. Please submit an issue to with the following stack trace:\n\n${
          e.stack
          }`,
      );
    });
};

export default Root;
