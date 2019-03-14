import React from 'react';
import {Box} from "@lib/ui/Box/Box";
import {BLOCK_IMAGE, BLOCK_TABLE, BLOCK_TEXT} from "@lib/shared/blockType";
import {withProject} from "../ProjectContext/ProjectContext";
import {EditorCellController} from "../EditorCellController/EditorCellController";

const EditorCellControllerWithProject = withProject(props => <EditorCellController {...props} />);


const getParentLetterNumber = ({item, tableNumber, imageNumber, parentNumber}) => {
  try {
    let parentLetterNumber = '';
    if (item.parent.isAttachment && item.content) {
      parentLetterNumber = `${parentNumber}`;
      if (item.content.contenttype === BLOCK_TABLE) {
        tableNumber += 1;
        parentLetterNumber = `${parentLetterNumber}${tableNumber} `;
      }
      if (item.content.contenttype === BLOCK_IMAGE) {
        imageNumber += 1;
        parentLetterNumber = `${parentLetterNumber}${imageNumber} `;
      }
    }
    return parentLetterNumber;
  } catch (error) {
    console.log(error);
    return '';
  }
};

export const ProjectEditorCellList = ({celllist, childCellIndex, parentNumber}) => {
  let imageNumber = 0;
  let tableNumber = 0;
  return (<Box>
    {
      celllist.map((item, index) => {
        let parentLetterNumber = getParentLetterNumber({
          imageNumber,
          tableNumber,
          item,
          parentNumber
        });

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
