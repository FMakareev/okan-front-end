const config = {
  test: /\.(graphql|graphqls|gql)$/,
  exclude: /node_modules/,
  loader: 'graphql-tag/loader',
};

module.exports = require('babel-jest').createTransformer(config);
