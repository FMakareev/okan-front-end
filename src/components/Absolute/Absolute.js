import styled from 'styled-components';
import { zIndex, position } from 'styled-system';
import PropTypes from 'prop-types';

/** View*/
import Box from '../Box/Box';

export const Absolute = styled(Box)`
  ${position}
  ${zIndex};
`;

Absolute.propTypes = {
  /** css property: position */
  position: PropTypes.string,
  /** css property: z-index */
  zIndex: PropTypes.string,
};

Absolute.defaultProps = {
  position: 'absolute',
};

export default Absolute;
