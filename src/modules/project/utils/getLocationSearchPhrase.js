import queryString from "query-string";

  /**
 * @param {string} search
 * @return {string|null}
 * @desc метод парсит поисковую строку и озвращает поисковую фразу
 * */
export const getLocationSearchPhrase = (search) => {
  try{
    return queryString.parse(search).searchPhrase
  } catch(error){
    console.error('Error: ', error);
    return null;
  }
};
