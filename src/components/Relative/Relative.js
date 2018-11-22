import React from 'react';
import styled from 'styled-components';
import Box from "../Box/Box";
import { zIndex } from "styled-system";

export const Relative = styled(Box)`
    ${zIndex};

`;
Relative.defaultProps = {
  position: 'relative',
};

export default Relative;
