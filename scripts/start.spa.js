/* global process */
import webpack from 'webpack';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import openBrowser from 'react-dev-utils/openBrowser';
import {createIndex, getVariablesesEnvironment} from "../tools";
import {browserConfigGenerator} from "../config/webpack.client";


const start = () => {

  /** создаем index.tsx в src/modules */
  createIndex();

  /** в process.env добавляются настройки из ca-config.json */
  getVariablesesEnvironment();

  /** получаем webpack config */
  const config = browserConfigGenerator();

  /** если есть HMR добавляем плагин */
  if (process.env.hmr) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  /** Добавляем плагин для HTML шаблона */
  config.plugins.push(
    new HtmlWebPackPlugin({
      template: path.resolve(process.cwd(), 'src/client/index.html'),
      filename: './index.html',
    }),
  );

  /** Добавляются пути для сервера и hmr */
  config.entry = [
    ...config.entry,
    `webpack-dev-server/client?http://localhost:${process.env.port || 3000}`,
    ...(process.env.hmr ? ['webpack/hot/only-dev-server'] : []),
  ];
  console.log(config.entry);
  /** Добавляем пути для кеша HMR */

  if (process.env.hmr) {
    config.output.hotUpdateMainFilename = 'cache/updates/[hash].hot-update.json';
    config.output.hotUpdateChunkFilename = 'cache/updates/[id].[hash].hot-update.js';
  }

  /** Создается webpack compiler */
  const compiler = webpack(config);

  /** конфиг для webpack-dev-server */
  const serverConfig = {
    publicPath: config.output.publicPath,
    hot: process.env.hmr,
    hotOnly: true,
    open: true,
    https: false,
    historyApiFallback: true,
    watchContentBase: true,
    disableHostCheck: true,
    // watchOptions: {
    //   aggregateTimeout: 1000,
    //   // poll: 1000
    // }
  };

  /** запуск и прослушивание webpack-dev-server */
  new WebpackDevServer(compiler, serverConfig).listen(
    process.env.port || 3000,
    'localhost',
    (error, result) => {
      if (error) {
        return console.log(error);
      }
      /** открыть в браузере страницу проекта */
      openBrowser(`http://localhost:${process.env.port || 3000}`);
      console.log(`Listening at http://localhost:${process.env.port || 3000}/`);
      return null;
    },
  );

}

start();
