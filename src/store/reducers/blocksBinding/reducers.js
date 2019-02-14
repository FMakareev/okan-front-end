import { REMOVE_BLOCK, COPY_CELL} from './actionTypes';

const initialState = {

}

export const ReducerBlocksBinding = (state = initialState, action) => {    
  switch (action.type) {
    case COPY_CELL:
        return {
            ...state,
            cellToCopy: action.cell,
            bindAfterCopy: action.bind
        }
    case REMOVE_BLOCK: 
        return initialState
    default:
        return state
  }
}
export default ReducerBlocksBinding;