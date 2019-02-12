import { SAVE_BLOCK, REMOVE_BLOCK } from './actionTypes';

// export const saveBlockId = (id) => ({
//   type: SAVE_BLOCK_ID,
//   blockId: id
// })

export const saveBlock = (id, type) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            if (isBrowser) {
                dispatch({
                    type: SAVE_BLOCK,
                    blockId: id
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
