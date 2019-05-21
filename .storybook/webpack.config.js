// const tsxLoader = require('../configs/tsxLoader');
// const graphqlLoader = require('../configs/graphqlLoader');

module.exports = ({ config }) => {
  // config.module.rules.push(tsxLoader);

  // config.module.rules.push(graphqlLoader);

  config.resolve.extensions.push('.ts', '.tsx', '.jsx', '.js');
  return config;
};
