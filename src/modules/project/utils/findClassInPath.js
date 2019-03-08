/**
 * @param {array} path - массив объекто дом элементов начиная от того на котором сработало событие и до корня документа
 * @param {string} className - название класса который
 * @desc метод ищет в массиве класс и возвращает его индекс.
 * */
export const findClassInPath = (path, className) => {
  try {
    return path.findIndex(item => item.className && item.className.indexOf(className) >= 0);
  } catch (error) {
    return null;
  }
};

export default findClassInPath;
