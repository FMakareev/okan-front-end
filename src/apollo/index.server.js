/* global ENDPOINT_SERVER */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';
import https from 'https';

export const client = req => {
  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${ENDPOINT_SERVER}/graphql`,
      credentials: 'same-origin',
      fetch,
      headers: {
        Cookie: req.header('Cookie'),
      },
      /** @desc https://stackoverflow.com/questions/14262986/node-js-hostname-ip-doesnt-match-certificates-altnames */
      fetchOptions: {
        agent: new https.Agent({ rejectUnauthorized: false }),
      },
    }),
    queryDeduplication: true,
    connectToDevTools: true,
    cache: new InMemoryCache(),
  });
};

export default client;
