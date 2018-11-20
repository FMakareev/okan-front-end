/* global isBrowser */

import { initialize, addTranslationForLanguage, setActiveLanguage } from 'react-localize-redux';
import findIndex from 'lodash/findIndex';

import Cookies from 'js-cookie';
import queryString from 'query-string';
import languages from './localization.json';
import history from '../../../routes/history';

export const getCurrentLocalize = () => {
  const queryLocale = isBrowser && queryString.parse(window.location.search).lang;
  if (queryLocale) {
    if (findIndex(languages, item => item.code === queryLocale.toUpperCase()) !== -1) {
      return queryLocale.toUpperCase();
    }

    return isBrowser ? window.navigator.language.match(/([A-z]{2})/i)[1].toUpperCase() : '';
  } else if (Cookies.get('lang')) {
    return Cookies.get('lang');
  }
  return isBrowser ? window.navigator.language.match(/([A-z]{2})/i)[1].toUpperCase() : '';
};

export const changeTranslate = (store, language) => dispatch =>
  import(`../../../../public/messages/${language}.json`)
    .then(response => {
      console.log('test1:', response);
      dispatch(addTranslationForLanguage(response, language));
      dispatch(setActiveLanguage(language));

      if (isBrowser) {
        Cookies.set('lang', language, { expires: 700 });
        const queryLocale = isBrowser ? queryString.parse(window.location.search).lang : null;

        if (queryLocale) {
          history.push(`?lang=${language.toUpperCase()}`);
        }

        // document.getElementsByTagName('html')[0].setAttribute('lang', language.toLowerCase())
      }
    })
    .catch(err => {
      console.error(err);
    });

export const initLocalize = (store, locale) => dispatch => {
  const currentLocale = locale || getCurrentLocalize();
  if (languages.length) {
    dispatch(
      initialize(languages, {
        defaultLanguage: currentLocale,
      }),
    );
    dispatch(changeTranslate(store, currentLocale));
  } else {
    console.info('initLocalize: For the application there are no dictionaries.');
    return null;
  }
  return null;
};
