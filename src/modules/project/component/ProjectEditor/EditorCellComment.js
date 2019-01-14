import React from 'react';
import PropTypes from 'prop-types';

/** View */
import Text from '../../../../components/Text/Text';

export const EditorCellComment = ({ data }) => {
  return (
    <Text fontSize={5} lineHeight={6} color={'color7'} fontFamily={'primary300'}>
      {data}
    </Text>
  );
};

EditorCellComment.propTypes = {
  /*data for comment*/
  data: PropTypes.string,
};

EditorCellComment.defaultProps = {
  data: '',
};

export default EditorCellComment;
