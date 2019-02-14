import CellItemQuery from './CellItemQuery.graphql';

/**
 * @param {object} client - apollo client instance
 * @param {object} data - новые данные для ячейки, этот объект обязательно должен содержать id ячейки которую следует обновить.
 * @desc
 * */
export const UpdateCellInCache = (client, data) => {
  console.log('UpdateCellInCache: ',data);
  let cell = {cellitem: {}};
  let options = {
    query: CellItemQuery,
    variables: {
      id: data.id,
    },
  };
  try {
    cell = client.readQuery(options);
  } catch (error) {
    console.warn('Warning UpdateCellInCache read: ', error);
  }
  try {
    client.writeQuery({
      ...options,
      data: {
        cellitem: {
          ...cell.cellitem,
          ...data,
        }
      }
    });

  } catch (error) {
    console.error('Error UpdateCellInCache write: ', error);
  }
};
export default UpdateCellInCache;
