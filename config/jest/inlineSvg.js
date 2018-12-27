const babelJest = require('babel-jest');
module.exports = {
  process: function(src, filename) {
    if (filename.match(/\.svg(\?v=\d+\.\d+\.\d+)?$/)) {
      return '';
    }
    return babelJest.process(src, filename);
  },
};
