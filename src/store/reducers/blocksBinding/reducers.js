import { SAVE_BLOCK, REMOVE_BLOCK } from './actionTypes';

const initialState = {

}

export const ReducerBlocksBinding = (state = initialState, action) => {    
  switch (action.type) {
    case SAVE_BLOCK:
        return { 
            ...state,
            bindingBlockId: action.blockId
        }
    case REMOVE_BLOCK: 
        return initialState
    default:
        return state
  }
}
export default ReducerBlocksBinding;