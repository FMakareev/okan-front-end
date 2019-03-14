import queryString from 'query-string';


/**
 * @param {string} currentQS
 * @param {object} targetQS
 * @desc метод добавляет к текущим параметрам поиска новый
 * */
export const joinQueryString = (currentQS = '', targetQS = {}) => {
  let objectCurrentQS = queryString.parse(currentQS);
  return queryString.stringify({...objectCurrentQS, ...targetQS});
};
