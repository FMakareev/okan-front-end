/* global ENDPOINT_CLIENT */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'unfetch';


export const client = () => {
  // return mocksClient;
  return new ApolloClient({
    // cache: new InMemoryCache().restore(window.APOLLO_STATE),
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: createHttpLink({
      uri: `${ENDPOINT_CLIENT}/graphql`,
      credentials: 'same-origin',
      fetch,
    }),
    ssrForceFetchDelay: 100,
  });
};

export default client;
