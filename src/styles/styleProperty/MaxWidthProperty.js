import PropTypes from 'prop-types';
export const MaxWidthProperty = ({ maxWidth }) => {
  if (maxWidth) {
    return `max-width: ${maxWidth}`;
  }
};

MaxWidthProperty.propTypes = {
  maxWidth: PropTypes.string,
};

export default MaxWidthProperty;
