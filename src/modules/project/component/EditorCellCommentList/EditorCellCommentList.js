import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

/** Components */
import {EditorCellCommentItem} from "../EditorCellCommentItem/EditorCellCommentItem";
import {Box} from "@lib/ui/Box/Box";


export const EditorCellCommentList = ({
                                        comments,
                                        onDelete
                                      }) => (
  <Fragment>
    {comments &&
    comments.map((item, index) => (<Box mb={2} key={`EditorCellCommentItem-${index}`}>
      <EditorCellCommentItem
        onDelete={onDelete}
        {...item}/>
    </Box>))}
  </Fragment>
);

EditorCellCommentList.propTypes = {
  cell: PropTypes.object,
  createdate: PropTypes.string,
  document: PropTypes.string,
  id: PropTypes.string,
  isdelete: PropTypes.bool,
  message: PropTypes.string,
  sender: PropTypes.shape({
    id: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    patronymic: PropTypes.string,
  }),
  updatedate: PropTypes.string,
};
export default EditorCellCommentList;
