import { SAVE_BLOCK_ID, REMOVE_BLOCK_ID } from './actionTypes';

const initialState = {

}

export const ReducerBlocksBinding = (state = initialState, action) => {    
  switch (action.type) {
    case SAVE_BLOCK_ID:
        return { 
            ...state,
            bindingBlockId: action.blockId
        }
    case REMOVE_BLOCK_ID: 
        return initialState
    default:
        return state
  }
}
export default ReducerBlocksBinding;