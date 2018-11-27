import styled from 'styled-components';
import { width, height, borderRadius, display } from 'styled-system';

export const Image = styled.img`
  ${width};
  ${height};
  ${borderRadius};
  ${display};
`;

Image.defaultProps = {
  display: 'block',
};
export default Image;
