/* global process */
import webpack from 'webpack';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import openBrowser from 'react-dev-utils/openBrowser';
import { browserConfig } from '../config/webpack.client';
// import {
//   createIndex,
//   logMessage,
//   compilerPromise,
//   getVariablesesEnvironment,
//   initMessage,
//   clear,
// } from '../tools/index';

const config = browserConfig();
config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.plugins.push(
  new HtmlWebPackPlugin({
    template: path.resolve(process.cwd(), 'src/client/index.html'),
    filename: './index.html',
  }),
);

const compiler = webpack(config);
const serverConfig = {
  publicPath: config.output.publicPath,
  hot: true,
  open: true,
  https: false,
  historyApiFallback: true,
  watchContentBase: true,
};

new WebpackDevServer(compiler, serverConfig).listen(
  process.env.PORT || 3000,
  'localhost',
  (error, result) => {
    if (error) {
      return console.log(error);
    }
    console.log(result);
    openBrowser(`http://localhost:${process.env.PORT || 3000}`);
    console.log(`Listening at http://localhost:${process.env.PORT || 3000}/`);
    return null;
  },
);
