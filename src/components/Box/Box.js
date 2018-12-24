import { space, width, color, fontSize, height, position } from 'styled-system';
import styled from 'styled-components';

/** Style property */
import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';
import { TextAlignProperty } from '../../styles/styleProperty/TextAlignProperty';


export const Box = styled.div`
  ${space};
  ${position};
  ${width};
  ${height};
  ${fontSize};
  ${color};
  ${BackgroundColorProperty};
  ${TextAlignProperty}
`;

Box.propTypes = {
  ...space.propTypes,
  ...position.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes
};

export default Box;
