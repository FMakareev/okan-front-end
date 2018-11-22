import styled from 'styled-components';
import { space } from 'styled-system';

// import TextField from '../TextField/TextField';

export const Wrapper = styled.label`
  ${space};
  display: block;
  position: relative;
`;

export const LabelStyled = styled.span`
  position: absolute;
  top: ${props => props.theme.space[3]}px;
  left: ${props => props.theme.space[0]}px;
  font-size: ${props => props.theme.fontSizes[4]}px;
  line-height: ${props => props.theme.space[5]}px;
  color: ${props => props.theme.colors.fontColor.color7};
  font-weight: ${props => props.theme.fontWeight[1]};
  transform-origin: 0 0;
  transition: all 0.2s ease;
  cursor: text;
`;
