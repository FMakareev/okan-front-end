import styled from 'styled-components';
import { Box } from '../Box/Box';
import { MaxWidthProperty } from '../../styles/styleProperty/MaxWidthProperty';

export const Container = styled(Box)`
  ${MaxWidthProperty};
`;

Container.defaultProps = {
  mt: 0,
  mb: 0,
  ml: 'auto',
  mr: 'auto',
  maxWidth: '992px',
};

export default Container;
