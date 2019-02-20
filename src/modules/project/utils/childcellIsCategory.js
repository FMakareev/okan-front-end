
const has = Object.prototype.hasOwnProperty;

/**
 * @param {object} cell - объект ячейки
 * @desc метод проверяет является ли дочерняя ячейка категорией
 * */
export const childcellIsCategory = cell => {
  try {
    if (has.call(cell, 'childcell') && cell.childcell) {
      return cell.childcell.isHead;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error cellIsHead: ', cell, error);
    return false;
  }
};
