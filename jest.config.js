const { defaults } = require('jest-config');

module.exports = {
  cacheDirectory: '.cache/jest',
  clearMocks: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'jsx', 'json'],
  moduleDirectories: ['node_modules'],
  automock: false,
  setupTestFrameworkScriptFile: '<rootDir>/config/setupTests.js',
  transform: {
    '^.+\\.js?$': '<rootDir>/config/jest/transformer.js',
    '\\.(gql|graphql|graphqls)$': 'jest-transform-graphql',
    '\\.(css|less)$': '<rootDir>/node_modules/jest-css-modules',
    '^.+\\.svg$': '<rootDir>/config/jest/inlineSvg',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '/.(css|less)$/': 'identity-obj-proxy',
    // '/.(css|scss)$/': '<rootDir>/styleMock.js',
    '^@lib/ui(.*)$': '<rootDir>/src/components$1',
    '^@lib/styles(.*)$': '<rootDir>/src/styles$1',
    '^@lib/utils(.*)$': '<rootDir>/src/utils$1',
    '^@lib/shared(.*)$': '<rootDir>/src/shared$1',
    '/.(jpg|jpeg|png)$/': '<rootDir>/src/utils/assetsTransformer.js',
  },
  globals: {
    ENDPOINT_CLIENT: 'http://localhost:5001',
    ENDPOINT_SERVER: 'http://localhost:5001',
    isBrowser: true,
  },
  roots: ['<rootDir>/src'],
};
