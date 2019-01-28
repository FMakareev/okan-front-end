import React from 'react';
import PropTypes from 'prop-types';

/** View */
import Text from '../../../../components/Text/Text';

export const EditorCellContent = ({ children }) => {
  return (
    <Text fontSize={5} lineHeight={6} color={'color11'} fontFamily={'primary300'}>
      {children}
    </Text>
  );
};

EditorCellContent.propTypes = {
  /*data for comment*/
  data: PropTypes.string,
};

EditorCellContent.defaultProps = {
  data: '',
};

export default EditorCellContent;
