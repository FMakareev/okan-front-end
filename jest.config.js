const {defaults} = require('jest-config');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions,'js', 'jsx'],
  moduleDirectories: ['node_modules'],
  automock: false,
  transform: {
    '^.+\\.js?$': "<rootDir>/config/jest/transformer.js",
    '\\.(css|less)$': '<rootDir>/node_modules/jest-css-modules',

  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
