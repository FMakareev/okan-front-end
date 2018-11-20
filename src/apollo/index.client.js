/* global ENDPOINT_CLIENT */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.APOLLO_STATE),
  link: createHttpLink({
    uri: `${ENDPOINT_CLIENT}/graphql`,
    credentials: 'same-origin',
  }),
  ssrForceFetchDelay: 100,
});

export default client;
