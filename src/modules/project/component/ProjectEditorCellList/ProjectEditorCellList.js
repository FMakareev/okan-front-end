import React from 'react';
import {Box} from "@lib/ui/Box/Box";
import {BLOCK_IMAGE, BLOCK_TABLE, BLOCK_TEXT} from "@lib/shared/blockType";
import {withProject} from "../ProjectContext/ProjectContext";
import {EditorCellController} from "../EditorCellController/EditorCellController";

const EditorCellControllerWithProject = withProject(props => <EditorCellController {...props} />);


export const ProjectEditorCellList = ({celllist, childCellIndex, parentNumber}) => {

  return (<Box>
    {
      celllist.map((item, index) => {
        let parentLetterNumber = '';
        if (item.parent.isAttachment && item.content) {
          parentLetterNumber = `${parentNumber}`;
        }
        return (
          <Box
            key={`ProjectEditorCellList-${index}`}
            pb={6}
            pt={6}
            position={'relative'}
            zIndex={celllist.length - index}
          >
            <EditorCellControllerWithProject
              key={`ProjectEditorCellList-${index}`}
              data={item}
              editable={
                item.content.parentNumber === 0 // редактирование первого блока и не запускает автосохранение // TODO: эта штука работает не так, проблема в том что она каждый раз включает
              }
              sectionNumber={`${parentNumber}${index + 1}.`}
              parentLetterNumber={parentLetterNumber}
            />
          </Box>);
      })
    }
  </Box>)
};

ProjectEditorCellList.defaultProps = {
  celllist: [],
};

export default ProjectEditorCellList;
