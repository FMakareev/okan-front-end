/* eslint-disable react/no-danger */
import React from 'react';
import serialize from 'serialize-javascript';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet'

const Html = ({ content, client: { cache }, reduxState, asyncState, lang }) => {
  const preLoadedReduxState = reduxState && JSON.stringify(reduxState);
  const helmet = Helmet.renderStatic();

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {helmet.title.toComponent()}
        <style />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
         {cache && (
         <script
         charSet="UTF-8"
         dangerouslySetInnerHTML={{
         __html: `window.APOLLO_STATE=${JSON.stringify(cache.extract())};`,
         }}
         />
         )}
        {asyncState && (
          <script
            charSet="UTF-8"
            dangerouslySetInnerHTML={{
              __html: `window.ASYNC_COMPONENTS_STATE=${serialize(asyncState)};`,
            }}
          />
        )}
        {reduxState && (
          <script
            charSet="UTF-8"
            dangerouslySetInnerHTML={{
              __html: `window.PRELOADED_REDUX_STATE=${preLoadedReduxState};`,
            }}
          />
        )}
        <script src="/bundle.js" charSet="UTF-8" />
      </body>
    </html>
  );
};

Html.propTypes = {
  content: PropTypes.string,
  client: PropTypes.shape({
    cache: PropTypes.object,
  }),
  reduxState: PropTypes.string,
  style: PropTypes.string,
  asyncState: PropTypes.string,
};
Html.defaultProps = {
  content: null,
  client: null,
  reduxState: null,
  style: null,
  asyncState: null,
};

export default Html;
