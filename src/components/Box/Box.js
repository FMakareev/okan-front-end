import { space, width, color, fontSize, height, position } from 'styled-system';
import styled from 'styled-components';
import { OrderProperty } from '../../styles/styleProperty/OrderProperty';

export const Box = styled.div`
  ${space};
  ${position};
  ${width};
  ${height};
  ${fontSize};
  ${color};
  ${OrderProperty};
`;

Box.propTypes = {
  ...space.propTypes,
  ...position.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
};

export default Box;
