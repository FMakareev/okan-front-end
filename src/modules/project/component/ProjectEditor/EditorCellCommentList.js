import React from 'react';
import PropTypes from 'prop-types';

/** View */
import Box from '../../../../components/Box/Box';

/** Components */
import EditorCellComment from './EditorCellComment';

export const EditorCellCommentList = () => {
  return (
    <Box mt={12}>
      <EditorCellComment
        data={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }
      />

      <Box mt={3}>
        <EditorCellComment
          data={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }
        />
      </Box>
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
