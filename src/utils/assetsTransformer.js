const path = require('path');

module.exports = {
  process(src) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};

// https://github.com/facebook/jest/issues/2663#issuecomment-317109798
