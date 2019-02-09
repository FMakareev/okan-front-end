import React from 'react';

/** View */
import Box from '../Box/Box';

/** Images */
import tableIcon from '../../assets/image/tableIcon.png';
import pictureIcon from '../../assets/image/pictureIcon.png';

/** Editor types */
import { BLOCK_TABLE, BLOCK_IMAGE } from '../../shared/blockType';

export const EditorTypeIcon = ({type}) => {
  return (
    <Box mr={7}>
      {type == BLOCK_IMAGE && (
        <img src={pictureIcon} width={'40px'}/>
      )}
      {type == BLOCK_TABLE && (
        <img src={tableIcon} width={'40px'}/>        
      )}
    </Box>
  );
};

export default EditorTypeIcon;
