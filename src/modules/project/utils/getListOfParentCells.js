import CellItemQuery from './CellItemQuery.graphql';

const has = Object.prototype.hasOwnProperty;
/**
 * @param {object} client - apollo client instance
 * @param {string} id - id следующей ячейки
 * @param {array} nodes - список всех полученых ячеек, пополняется каждый раз после выполнения запроса.
 * @desc получить список ячеек попорядку рекурсивно
 * */
export const getListOfParentCells = (client, id, nodes) => {
  return client
    .query({
      query: CellItemQuery,
      variables: {
        id,
      },
    })
    .then(response => {
      // console.log(response);
      const {data} = response;
      if (data && data.cellitem) {
        nodes.push(data.cellitem);
        if (data.cellitem.nextcell && has.call(data.cellitem.nextcell, 'id')) {
          return getListOfParentCells(client, data.cellitem.nextcell.id, nodes);
        }
        return nodes;
      } else {
        return nodes;
      }
    })
    .catch(error => {
      console.error('Error getListOfParentCells: ', error);
      return [];
    });
};
export default getListOfParentCells;
