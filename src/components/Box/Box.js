import { space, width, color, fontSize, height, position, zIndex, border,opacity, minHeight, borderRadius, borderColor, borders, overflow } from 'styled-system';
import styled from 'styled-components';

/** Style property */
import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';
import { TextAlignProperty } from '../../styles/styleProperty/TextAlignProperty';

export const Box = styled.div`
  ${space};
  ${opacity};
  ${position};
  ${zIndex};
  ${width};
  ${height};
  ${minHeight};
  ${fontSize};
  ${border};
  ${borders};
  ${borderColor};
  ${borderRadius};
  ${overflow};
  ${color};
  ${BackgroundColorProperty};
  ${TextAlignProperty}
`;

Box.propTypes = {
  ...space.propTypes,
  ...position.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
  ...border.propTypes,
  ...borders.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
  ...overflow.propTypes,
  ...color.propTypes,
};

export default Box;
