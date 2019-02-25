/**
 * @param {array} cells
 * @desc сортировка по указателям ветки ячеек
 * */
export const sortingCells = (cells) => {
  try {
    return cells.sort((prev, next) => {
      if ((prev.parent && prev.prevcell) && prev.parent.id === prev.prevcell.id) {
        return -1;
      }
      if (!prev.nextcell) {
        return 1;
      }
      if ((prev.nextcell && next.id) && prev.nextcell.id === next.id) {
        return -1;
      } else if ((next.nextcell && prev.id) && next.nextcell.id === prev.id) {
        return 1;
      } else {
        return 1;
      }
    });
  } catch (error) {
    console.error('Error sortingCells: ', error);
  }
  return cells;
};
