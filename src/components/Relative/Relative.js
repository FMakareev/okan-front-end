import React from 'react';
import styled from 'styled-components';
import Box from '../Box/Box';
import { zIndex, width } from 'styled-system';

export const Relative = styled(Box)`
  ${zIndex};
  ${width}
`;
Relative.defaultProps = {
  position: 'relative',
};

export default Relative;
