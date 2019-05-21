export const graphqlLoaderConfig = {
  test: /\.(graphql|graphqls|gql)$/,
  exclude: /node_modules/,
  loader: 'graphql-tag/loader',
};

export default graphqlLoaderConfig;
