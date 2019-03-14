import queryString from 'query-string';

/** helpers */
import { changeQueryString } from './changeQueryString';

/**
 * @param {string} currentQS
 * @param {object} targetQS
 * @desc метод добавляет к текущим параметрам поиска новый
 * */
export const joinQueryString = (currentQS = '', targetQS = {}) => {
  let objectCurrentQS = queryString.parse(currentQS);
  return queryString.stringify(changeQueryString(objectCurrentQS, targetQS));
  // return queryString.stringify(...objectCurrentQS, ...targetQS);
};
