import React from 'react';

/**
 * @param {string} string - поисковая строка, после деструктуризации
 * @desc метод для переключения между number и letter в поисковой строке.
 * */
export const changeQueryString = (queryString, targetQS) => {
  let newSearchString = {};

  for (var key in queryString) {
    if (key === 'searchPhrase') {
      newSearchString = { searchPhrase: queryString[key] };
    }
  }

  return targetQS.sectionNumber
    ? (newSearchString = { ...newSearchString, ...targetQS })
    : (newSearchString = { ...newSearchString, ...targetQS });
};
