import React from 'react';
import PropTypes from 'prop-types';

/** View */
import Box from '../../../../components/Box/Box';


export const EditorCellCommentList = () => {
  return (
    <Box mt={12}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt doloribus in vel! A aperiam dolore error
      explicabo magnam nam, perspiciatis sed. Error inventore modi nulla sunt tempore, veniam veritatis. Tempora?
    </Box>
  );
};

EditorCellCommentList.propTypes = {
  /*data for comment*/
  data: PropTypes.string,
};

EditorCellCommentList.defaultProps = {
  data: '',
};

export default EditorCellCommentList;
