/* global process */

import webpack from 'webpack';
import nodemon from 'nodemon';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';

import { serverConfigGenerator } from '../config/webpack.server';
import { browserConfigGenerator } from '../config/webpack.client';

import {
  createIndex,
  logMessage,
  compilerPromise,
  getVariablesesEnvironment,
  initMessage,
  clear,
} from '../tools/index';

// https://github.com/manuelbieh/react-ssr-setup

const start = async () => {
  await clear();
  await createIndex();
  await initMessage();
  await getVariablesesEnvironment();

  const app = express();
  const WEBPACK_PORT = 3001;
  const clientConfig = browserConfigGenerator();
  const serverConfig = serverConfigGenerator();

  clientConfig.entry = [
    `webpack-hot-middleware/client?path=http://localhost:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry,
  ];

  clientConfig.output.hotUpdateMainFilename = 'cache/updates/[hash].hot-update.json';
  clientConfig.output.hotUpdateChunkFilename = 'cache/updates/[id].[hash].hot-update.js';

  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers[0];
  const serverCompiler = multiCompiler.compilers[1];

  const clientPromise = compilerPromise(clientCompiler);
  const serverPromise = compilerPromise(serverCompiler);

  const watchOptions = {
    // poll: true,
    ignored: /node_modules/,
    // stats: clientConfig.stats,
  };

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });

  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats,
      watchOptions,
    }),
  );

  app.use(
    webpackHotMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
    }),
  );

  app.use(express.static('public'));

  app.listen(WEBPACK_PORT);

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }

    if (error) {
      logMessage(error, 'error');
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].split('\n');
      logMessage(errors[0], 'error');
      logMessage(errors[1], 'error');
      logMessage(errors[2], 'error');
    }
  });

  // wait until client and server is compiled
  try {
    await serverPromise;
    await clientPromise;
  } catch (error) {
    logMessage(error, 'error');
  }

  const script = nodemon({
    script: `public/server.js`,
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
  });

  script.on('restart', () => {
    logMessage('Server side app has been restarted.', 'warning');
  });

  script.on('quit', () => {
    console.log('Process ended');
    process.exit();
  });

  script.on('error', () => {
    logMessage('An error occured. Exiting', 'error');
    process.exit(1);
  });
};

start();
