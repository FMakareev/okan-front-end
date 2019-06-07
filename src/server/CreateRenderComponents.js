import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Html from './html';


export const CreateRenderComponents = ({
  STStyleRenderer,
  asyncContext,
  Store,
  ApolloClient,
  response,
  request,
}) => (RouterContext = {}) => content => {
  /**
   * @description https://www.styled-components.com/docs/advanced#server-side-rendering
   * */
  const styleTags = STStyleRenderer.getStyleTags(); // or sheet.getStyleElement()

  /**
   * @description Get the async component state. 👇
   * */
  const asyncState = asyncContext.getState();

  /**
   * @description https://redux.js.org/recipes/server-rendering#handling-the-request
   * */
  const reduxState = Store.getState();

  /**
   * @param {string} content - markup of the requested page converted into a string
   * @param {Object} client - Apollo client
   * @description Marking of html markup
   * */
  const REACT_HTML = (
    <Html
      lang={request.language || 'EN'}
      reduxState={reduxState}
      content={content}
      asyncState={asyncState}
      apolloCache={ApolloClient}
    />
  );

  /**
   * @description https://reactjs.org/docs/react-dom-server.html
   * */
  const HTML = `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(REACT_HTML)}`
    /** @description inject style */
    .replace('<style></style>', styleTags);

  /**
   * @description https://reacttraining.com/react-router/web/example/static-router
   * */
  if (RouterContext.status === 404) {
    /** @description http://expressjs.com/en/4x/api.html#res.status */
    response.status(RouterContext.status);
  } else {
    /** @description http://expressjs.com/en/4x/api.html#res.status */
    response.status(200);
  }

  /** @description http://expressjs.com/en/4x/api.html#res.send */
  response.send(HTML);
  /** @description http://expressjs.com/en/4x/api.html#res.end */
  response.end();
};

export default CreateRenderComponents;
