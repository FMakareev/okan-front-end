import { REMOVE_BLOCK, COPY_CELL } from './actionTypes';

// export const saveBlockId = (id) => ({
//   type: SAVE_BLOCK_ID,
//   blockId: id
// })

export const copyCell = (cell, bind, type) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            if (isBrowser) {
                dispatch({
                    type: COPY_CELL,
                    cell: cell,
                    bind: bind
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const removeBlock = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            if (isBrowser) {
                dispatch({
                    type: REMOVE_BLOCK
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
