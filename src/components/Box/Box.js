import { space, width, color, fontSize, height, position, zIndex, border,opacity, minHeight, borderRadius, borderColor, borders, overflow, right, lineHeight } from 'styled-system';
import styled from 'styled-components';

/** Style property */
import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';
import { TextAlignProperty } from '../../styles/styleProperty/TextAlignProperty';

export const Box = styled.div`
  ${space};
  ${opacity};
  ${position};
  ${right};
  ${zIndex};
  ${width};
  ${height};
  ${minHeight};
  ${fontSize};
  ${lineHeight};
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
