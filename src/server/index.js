/* global PORT */
import register from 'ignore-styles';
import express from 'express';
import requestLanguage from 'express-request-language';
import cookieParser from 'cookie-parser';

import { Root } from './root';

const app = express();
const jsonTranslate = require('../store/reducers/localization/localization.json');

const langArray = jsonTranslate.map(item => item.code);

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

/**
 * @description http://expressjs.com/en/4x/api.html#app.get.method
 * */
app.use('*', Root);

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}. !!!!!!!!`);
});

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('../modules');
}
export default app;
