/* global process */
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import path from 'path';

import { browserConfigGenerator } from '../config/webpack.client';
import {
  createIndex,
  logMessage,
  compilerPromise,
  getVariablesesEnvironment,
  initMessage,
  clear,
} from '../tools/index';

const build = async () => {
  /** @desc remove temporary files */
  await clear();
  /** @desc create index.js in src/modules */
  await createIndex();
  /** @desc create localization files */
  await initMessage();
  /** @desc get cli arguments */
  await getVariablesesEnvironment();

  const clientConfig = browserConfigGenerator();

  clientConfig.plugins.push(
    new HtmlWebPackPlugin({
      template: path.resolve(process.cwd(), 'src/client/index.html'),
      filename: './index.html',
    }),
  );

  const clientCompiler = webpack(clientConfig);
  console.log(clientCompiler);
  const clientPromise = compilerPromise(clientCompiler);

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
    }
    return null;
  });

  try {
    await clientPromise;
    logMessage('Done!', 'info');
    process.exit();
  } catch (error) {
    logMessage(error, 'error');
  }
};

build();
