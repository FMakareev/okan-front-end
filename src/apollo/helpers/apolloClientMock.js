const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { SchemaLink } = require('apollo-link-schema');
const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const merge = require('lodash/merge');

export function setupClient(mockResolvers, typeDefs) {
  return function createClient(overwriteMocks = {}) {
    const mergedMocks = merge({ ...mockResolvers }, overwriteMocks);

    const schema = makeExecutableSchema({ typeDefs });
    addMockFunctionsToSchema({
      schema,
      mocks: mergedMocks,
    });

    const apolloCache = new InMemoryCache(isBrowser ? window.APOLLO_STATE : {});

    return new ApolloClient({
      cache: apolloCache,
      link: new SchemaLink({ schema }),
    });
  };
}

export default setupClient;
