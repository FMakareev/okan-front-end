/* global process */
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import { fileLoaderConfig } from './fileLoaderConfig';
import { graphqlLoaderConfig } from './graphqlLoaderConfig';
import { scriptsLoaderConfig } from './scriptsLoaderConfig';

export const serverConfigGenerator = () => {
  const reStyle = /\.(css|less|styl|scss|sass|sss)$/;

  return {
    name: 'server',
    mode: process.env.NODE_ENV || 'development',
    watch: process.env.WATCH === 'true' || true,
    entry: [process.env.SERVER_ENTRY || './src/server/index.js'],
    target: 'node',
    externals: [nodeExternals()],
    node: {
      __dirname: true,
    },
    output: {
      path: path.resolve(__dirname, process.env.PUBLIC_URL || '../public'),
      filename: 'server.js',
      publicPath: '/',
      chunkFilename:
        process.env.NODE_ENV === 'development'
          ? 'static/js/[name].chunk.js'
          : 'static/js/[name].[chunkhash:8].chunk.js',
    },
    module: {
      rules: [
        scriptsLoaderConfig(['dynamic-import-node']),
        // Rules for GraphQL
        graphqlLoaderConfig,
        // Rules for image
        fileLoaderConfig,
        {
          test: reStyle,
          loader: 'ignore-loader',
        },
      ],
    },
    plugins: [
      new WriteFileWebpackPlugin(),
      // new BundleAnalyzerPlugin({
      // 	openAnalyzer: false
      // }),
      new webpack.DefinePlugin({
        isBrowser: false,
        DEV: process.env.NODE_ENV === 'development',
        SSR_FETCH: process.env.SSR_FETCH,
        PORT: process.env.PORT || 3000,
        ENDPOINT_CLIENT: process.env.ENDPOINT_CLIENT || "'http://localhost:5001'",
        ENDPOINT_SERVER: process.env.ENDPOINT_SERVER || "'http://localhost:5001'",
      }),

      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};

export default serverConfigGenerator;
