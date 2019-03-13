import queryString from 'query-string';

/**
 * @param {string} currentQS
 * @param {object} targetQS
 * @desc метод добавляет к текущим параметрам поиска новый
 * */
export const joinQueryString = (currentQS = '', targetQS = {}) => {
  // let objectCurrentQS = queryString.parse(currentQS);

  let newSearchString = {};

  // for (var key in objectCurrentQS) {
  //   console.log(1, objectCurrentQS);
  //   if (key === 'searchPhrase') {
  //     newSearchString = { key: objectCurrentQS[key] };
  //     console.log(2, newSearchString);
  //   }
  // }

  if (targetQS.sectionNumber) {
    queryString.stringify({ ...newSearchString, ...targetQS });
  }

  if (targetQS.sectionLetterNumber) {
    queryString.stringify({ ...newSearchString, ...targetQS });
  }

  // return queryString.stringify({ ...objectCurrentQS, ...targetQS });
  return targetQS.sectionNumber
    ? queryString.stringify({
        ...newSearchString,
        ...targetQS,
      })
    : queryString.stringify({ ...newSearchString, ...targetQS });
};
