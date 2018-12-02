import React from 'react';
import styled from 'styled-components';
import { zIndex, width } from 'styled-system';

/** View */
import Box from '../Box/Box';

export const Relative = styled(Box)`
  ${zIndex};
  ${width}
`;
Relative.defaultProps = {
  position: 'relative',
};

export default Relative;
