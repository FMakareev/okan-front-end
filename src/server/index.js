/* global PORT */
import register from 'ignore-styles';
import express from 'express';
import requestLanguage from 'express-request-language';
import cookieParser from 'cookie-parser';
import * as modules from '../modules/index.server';

import { Root } from './root';

const app = express();
const jsonTranslate = require('../store/reducers/localization/localization.json');

const langArray = jsonTranslate.map(item => item.code);
const has = Object.prototype.hasOwnProperty;

try{
  app.use(express.static('public'));
  app.use(cookieParser());

  if (langArray.length) {
    app.use(
      requestLanguage({
        languages: langArray,
        queryName: 'lang',
        cookie: {
          name: 'lang',
          options: {
            path: '/',
            maxAge: 3650 * 24 * 3600 * 1000, // 10 years in miliseconds
          },
          url: '/lang/{language}',
        },
      }),
    );
  }


  Object.entries(modules).map(([moduleName, value]) => {
    if (has.call(value, 'routes')) {
      value.routes.forEach(item => {
        try{
          app[item.method](item.path, item.callback);
        } catch(error){
          console.error(`Error ${moduleName}: `,error);
        }
      });
      return null;
    }
    console.error(
      `ERROR:in the module "${moduleName}" there is no property "routes".
        Add the property "routes" to the module "${moduleName}" and determine at least
        one route otherwise the module will be inaccessible to users.`,
    );
    return null;
  });

  /**
   * @description http://expressjs.com/en/4x/api.html#app.get.method
   * */
  app.use('*', Root);

  app.listen(PORT, () => {
    console.log(`Server is listening on port:${PORT}. !!!!!!!!`);
  });

} catch(error){
  console.error('Error server: ',error);
}
//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('../modules/index.client.js');
}
export default app;
