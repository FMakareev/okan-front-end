/* global ENDPOINT_SERVER */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';
import mocksClient from './mocksClient';

export const client = req => {
  return mocksClient;
  // return new ApolloClient({
  //   ssrMode: true,
  //   // Remember that this is the interface the SSR server will use to connect to the
  //   // API server, so we need to ensure it isn't firewalled, etc
  //   link: createHttpLink({
  //     uri: `${ENDPOINT_SERVER}/graphql`,
  //     credentials: 'same-origin',
  //     fetch,
  //     headers: {
  //       Cookie: req.header('Cookie'),
  //     },
  //   }),
  //   queryDeduplication: true,
  //   connectToDevTools: true,
  //   cache: new InMemoryCache(),
  // });
};

export default client;

// import mocksClient from './mocksClient';

// export const client = () => mocksClient;

// export default client;
