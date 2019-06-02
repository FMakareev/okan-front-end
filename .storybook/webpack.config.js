// const graphqlLoader = require('../config/graphqlLoaderConfig');

module.exports = ({ config }) => {
  // config.module.rules.push(graphqlLoader);

  config.resolve.extensions.push('.ts', '.tsx', '.jsx', '.js');
  return config;
};
