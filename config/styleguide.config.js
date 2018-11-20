const webpack = require('webpack');
const path = require('path');

const {
  createConfig,
  babel,
  file,
  match,
  postcss,
  css,
  env,
  uglify,
  addPlugins,
} = require('webpack-blocks');
const autoprefixer = require('autoprefixer');
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;

function GraphqlLoader () {
  return (context, { merge }) => merge({
    module: {
      rules: [
        Object.assign(
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
          },
          context.match     // carries `test`, `exclude` & `include` as set by `match()`
        )
      ]
    }
  })
}

function IgnoreFile () {
  return (context, { merge }) => merge({
    module: {
      rules: [
        Object.assign(
          {
            test: reStyle,
            loader: 'ignore-loader',
          },
          context.match     // carries `test`, `exclude` & `include` as set by `match()`
        )
      ]
    }
  })
}

module.exports = {
  components: '../src/components/**/*.js',
  styleguideComponents: {
    Wrapper: path.join(__dirname, './styleguideComponents.wrapper'),
  },
  webpackConfig: createConfig([
    babel(),
    match([ '*.gif','*.jpg','*.jpeg','*.png','*.webp', ],[
      file(),
    ]),
    GraphqlLoader(),
    IgnoreFile(),
    match(['*.css', '!*node_modules*'], [
      css(),
      // postcss([
      //   autoprefixer({ browsers: ['last 2 versions'] })
      // ]),
    ]),
    env('development', [
      uglify(),
      addPlugins([
        new webpack.DefinePlugin({
          isBrowser: true,
          DEV: true,
          SSR_FETCH: false,
          PORT: process.env.PORT || 3000,
          ENDPOINT_CLIENT: process.env.ENDPOINT_CLIENT || "'http://localhost:5001'",
          ENDPOINT_SERVER: process.env.ENDPOINT_SERVER || "'http://localhost:5001'",
        }),
      ])
    ])
  ]),

};

