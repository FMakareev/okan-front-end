/* global process */
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import path from 'path';

import { browserConfigGenerator } from '../config/webpack.client';
import { Clear } from '../tools/clear';
import { initMessage } from '../tools/initLocalizationFiles';
import { getVariablesesEnvironment } from '../tools/getVariablesesEnvironment';
import { logMessage } from '../tools/logMessage';
import { init as createIndex } from '../tools/createIndex';
import { assetsMove } from '../tools/assetsMove';

const build = async () => {
  /** @desc remove temporary files */
  await Clear();
  /** @desc create index.js in src/modules */
  await createIndex();
  /** @desc create localization files */
  await initMessage();
  /** @desc get cli arguments */
  await getVariablesesEnvironment();

  assetsMove();

  const clientConfig = browserConfigGenerator();

  clientConfig.plugins.push(
    new HtmlWebPackPlugin({
      template: path.resolve(process.cwd(), 'src/client/index.html'),
      filename: './index.html',
    }),
  );

  const clientCompiler = webpack(clientConfig);

  try {
    await clientCompiler.run((error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(clientConfig.stats));
      }
      logMessage('Done!', 'info');

      return null;
    });

    await clientCompiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        console.log(stats.toString(clientConfig.stats));
      }
      logMessage('Done!', 'info');
    });
  } catch (error) {
    logMessage(error, 'error');
  }
};

build();
