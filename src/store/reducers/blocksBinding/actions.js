import { SAVE_BLOCK_ID } from './actionTypes';

// export const saveBlockId = (id) => ({
//   type: SAVE_BLOCK_ID,
//   blockId: id
// })

export const saveBlockId = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            if (isBrowser) {
                dispatch({
                    type: SAVE_BLOCK_ID,
                    blockId: id
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
