/* global process */

/**
 * @param {array} plugins - array plugins
 *
 * */
export const scriptsLoaderConfig = (plugins = []) => {
  return {
    test: /\.(js|jsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      cacheDirectory: true,
      babelrc: false,
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            /** @desc https://www.styled-components.com/docs/tooling#control-the-components-displayname */
            fileName: false,
            /** @desc https://www.styled-components.com/docs/tooling#control-the-components-displayname */
            displayName: false,
            /** @desc https://www.styled-components.com/docs/tooling#serverside-rendering */
            ssr: true,
            /** @desc https://www.styled-components.com/docs/tooling#dead-code-elimination */
            pure: true,
            /** @desc https://www.styled-components.com/docs/tooling#minification */
            minify: true,
          },
        ],
        '@babel/plugin-proposal-class-properties',
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ...plugins,
      ],
    },
  };
};

export default scriptsLoaderConfig;
