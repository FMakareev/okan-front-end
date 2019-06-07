import styled from 'styled-components';
import { variant } from 'styled-system';

import { Box } from '../Box/Box';

const inputVariant = variant({
  key: 'variant.inputVariant',
  prop: 'variant',
});
const inputSize = variant({
  key: 'variant.inputSize',
  prop: 'size',
});

export const Input = styled(Box)`
  ${inputVariant};
  ${inputSize};

  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

Input.defaultProps = {
  variant: 'primary',
  size: 'medium',
  as: 'input',
};

export default Input;
