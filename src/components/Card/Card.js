import styled from 'styled-components';
import {
  borderBottom,
  borders,
  borderColor,
  borderRadius,
  boxShadow,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  opacity,
  zIndex,
} from 'styled-system';

/** View */
import { Box } from '../Box/Box';

/** Style property */
import { BorderRadiusProperty } from '../../styles/styleProperty/BorderRadiusProperty';
import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';
import { BoxShadowProperty } from '../../styles/styleProperty/BoxShadowProperty';

/**
 * Компонент карточки
 * @example ./Card.example.md
 */
export const Card = styled(Box)`
  ${BoxShadowProperty};
  ${zIndex};
  ${borderColor};
  ${borderRadius};
  ${backgroundImage};
  ${BackgroundColorProperty};
  ${backgroundPosition};
  ${backgroundSize};
  ${backgroundRepeat};
  ${opacity};
  ${borders};
  ${borderBottom};
  ${BorderRadiusProperty};
`;

Card.propTypes = {
  ...borders.propTypes,
  ...borderBottom.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
  ...boxShadow.propTypes,
  ...backgroundImage.propTypes,
  ...backgroundSize.propTypes,
  ...backgroundPosition.propTypes,
  ...backgroundRepeat.propTypes,
  ...opacity.propTypes,
  ...zIndex.propTypes,
};

Card.defaultProps = {
  borderRadius: 2,
  backgroundColor: 'colorWhite',
};

export default Card;
