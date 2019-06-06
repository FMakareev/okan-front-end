import { configure } from '@storybook/react';

/** this is babel-plugin working on run testing */
if (process.env.NODE_ENV === 'test') {
  require('babel-plugin-require-context-hook/register')();
}

const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
