/* global process */

import path from 'path';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import { fileLoaderConfig } from './fileLoaderConfig';
import { graphqlLoaderConfig } from './graphqlLoaderConfig';
import { styleLoaderConfig } from './styleLoaderConfig';
import { scriptsLoaderConfig } from './scriptsLoaderConfig';


export const browserConfigGenerator = () => {
  return {
    mode: process.env.NODE_ENV || 'development',
    watch: process.env.WATCH === 'true',
    name: 'client',
    entry: [process.env.CLIENT_ENTRY || './src/client/index.js'],
    output: {
      path: path.resolve(__dirname, process.env.PUBLIC_URL || '../public'),
      publicPath: '/',
      filename: 'bundle.js',
      chunkFilename:
        process.env.NODE_ENV === 'development'
          ? 'static/js/[name].chunk.js'
          : 'static/js/[name].[chunkhash:8].chunk.js',
    },
    module: {
      rules: [
        scriptsLoaderConfig(['@babel/plugin-syntax-dynamic-import']),
        // Rules for GraphQL
        graphqlLoaderConfig,
        // Rules for image
        fileLoaderConfig,
        // Rules for style
        styleLoaderConfig,
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          use: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          use: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: "url-loader?limit=10000&mimetype=application/octet-stream"
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: "file-loader"
        }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=image/svg+xml"
        },
      ],
    },
    plugins: [
      new WriteFileWebpackPlugin(),
      // new BundleAnalyzerPlugin({
      // 	openAnalyzer: false
      // }),
      new webpack.DefinePlugin({
        isBrowser: 'true',
        DEV: process.env.NODE_ENV === 'development',
        SSR_FETCH: true,
        PORT: process.env.PORT || 3000,
        ENDPOINT_CLIENT: process.env.ENDPOINT_CLIENT || "'http://localhost:5001'",
        ENDPOINT_SERVER: process.env.ENDPOINT_SERVER || "'http://localhost:5001'",
      }),
      // new CleanWebpackPlugin([ process.env.PUBLIC_URL || '../../public']),
      new webpack.HotModuleReplacementPlugin(),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ],
    resolve: {
      modules: ['node_modules']
    },
    stats: {
      cached: false,
      cachedAssets: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      timings: true,
      version: false,
    },
  };
};

export default browserConfigGenerator;
