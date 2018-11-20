import {
  justifyContent,
  alignItems,
  alignContent,
  flex,
  flexBasis,
  flexDirection,
  flexWrap,
  display,
} from 'styled-system';
import styled from 'styled-components';
import { Box } from '../Box/Box';
import { OrderProperty } from '../../styles/styleProperty/OrderProperty';

export const Flex = styled(Box)`
  display: flex;
  ${justifyContent};
  ${alignItems};
  ${alignContent};
  ${flex};
  ${flexBasis};
  ${flexDirection};
  ${flexWrap};
  ${display};
  ${OrderProperty};
`;

Flex.propTypes = {
  ...justifyContent.propTypes,
  ...alignItems.propTypes,
  ...alignContent.propTypes,
  ...flex.propTypes,
  ...flexBasis.propTypes,
  ...flexDirection.propTypes,
  ...flexWrap.propTypes,
  ...display.propTypes,
};

export default Flex;
