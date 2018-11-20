/* global process */
import webpack from 'webpack';
import { serverConfigGenerator } from '../config/webpack.server';
import { browserConfigGenerator } from '../config/webpack.client';
import { Clear } from '../tools/clear';
import { initMessage } from '../tools/initLocalizationFiles';
import { getVariablesesEnvironment } from '../tools/getVariablesesEnvironment';
import { compilerPromise } from '../tools/compilerPromise';
import { logMessage } from '../tools/logMessage';
import {init as createIndex} from '../tools/createIndex';

const build = async () => {
  await Clear();
  await createIndex();
  await initMessage();
  await getVariablesesEnvironment();

  const clientConfig = browserConfigGenerator();
  const serverConfig = serverConfigGenerator();
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers[0];
  const serverCompiler = multiCompiler.compilers[1];

  const clientPromise = compilerPromise(clientCompiler);
  const serverPromise = compilerPromise(serverCompiler);

  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
    }
    return null;
  });

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
    }
    return null;
  });

  // wait until client and server is compiled
  try {
    await serverPromise;
    await clientPromise;
    logMessage('Done!', 'info');
    process.exit();
  } catch (error) {
    logMessage(error, 'error');
  }
};

build();
