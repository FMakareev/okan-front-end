import styled from 'styled-components';
import { zIndex, position } from 'styled-system';
import Box from "../Box/Box";

export const Absolute = styled(Box)`
  ${position}
  ${zIndex};
`;
Absolute.defaultProps = {
  position: 'absolute',
};


export default Absolute;
