/* global process */

import path from 'path';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import { fileLoaderConfig } from './fileLoaderConfig';
import { graphqlLoaderConfig } from './graphqlLoaderConfig';
import { styleLoaderConfig } from './styleLoaderConfig';
import { scriptsLoaderConfig } from './scriptsLoaderConfig';
import webpackResolve from '../webpack.config';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

export const browserConfigGenerator = () => {
  return {
    mode: process.env.NODE_ENV || 'development',
    watch: process.env.WATCH === 'true',
    name: 'client',
    entry: ['@babel/polyfill', process.env.CLIENT_ENTRY || './src/client/index.js'],
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
        graphqlLoaderConfig,
        fileLoaderConfig,
        styleLoaderConfig,
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/octet-stream',
        },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        },
      ],
    },
    resolve: {
      alias: {
        FroalaEditor: 'file_name'
      },
      modules: ['../node_modules/froala-editor/js','node_modules']
    },
    plugins: [
      new WriteFileWebpackPlugin(),
      new webpack.DefinePlugin({
        // Rules for GraphQL // Rules for image // Rules for style
        isBrowser: 'true',
        DEV: process.env.NODE_ENV === 'development',
        SSR_FETCH: true,
        PORT: process.env.PORT || 3000,
        // ENDPOINT_CLIENT: process.env.ENDPOINT_CLIENT || "'http://localhost:5001'",
        ENDPOINT_CLIENT: process.env.ENDPOINT_CLIENT || '""',
        ENDPOINT_SERVER: process.env.ENDPOINT_SERVER || '""',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ManifestPlugin({
        // new CleanWebpackPlugin([ process.env.PUBLIC_URL || '../../public']),
        fileName: 'asset-manifest.json',
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        FroalaEditor: 'file_name',
      }),
      ...(process.env.ANALYSE ? [new BundleAnalyzerPlugin()] : []),
    ],
    ...webpackResolve,

    devtool: 'eval-source-map',
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
