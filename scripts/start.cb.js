/* global process */
import ReactPlugin from 'carte-blanche-react-plugin'
import webpack from 'webpack';
import { serverConfigGenerator } from '../config/webpack.server';
import CarteBlanche from 'carte-blanche';
import path from 'path';

import {
  getVariablesesEnvironment,
} from '../tools/index';
import express from "express";
import { browserConfigGenerator } from "../config/webpack.client";
import { logMessage } from "../tools";

const start = async () => {
  await getVariablesesEnvironment();
  const clientConfig = browserConfigGenerator();

  clientConfig.plugins.push( new CarteBlanche({
    componentRoot: path.resolve(__dirname, '../src/components'),
    plugins: [
      new ReactPlugin(),
    ],
  }),);
  const watchOptions = {
    // poll: true,
    ignored: /node_modules/,
    // stats: clientConfig.stats,
  };
  console.log(clientConfig);
  const compiler = webpack(clientConfig);
  compiler.watch(watchOptions, (error, stats) => {
    console.log('error: ',error);
    console.log('stats: ',stats);

    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
    }
    logMessage('Done!', 'info');
  });
};

start();

