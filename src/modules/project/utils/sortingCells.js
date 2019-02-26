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
      if ((next.parent && next.prevcell) && next.parent.id === next.prevcell.id) {
        return 1;
      }

      if(prev.nextcell && prev.nextcell.id === next.id) {
        return -1
      }
      if(prev.prevcell && prev.prevcell.id === next.id) {
        return 1
      }
      if(prev.nextcell && next.prevcell && prev.nextcell.id === next.prevcell.id) {
        return 0
      }
      if(prev.prevcell && next.nextcell && prev.prevcell.id === next.nextcell.id) {
        return 0
      }

      if(!prev.nextcell) {
        return 1
      }
      if(!next.nextcell) {
        return 1
      }

    });
  } catch (error) {
    console.error('Error sortingCells: ', error);
  }
  return cells;
};
