import styled from 'styled-components';
import { space } from 'styled-system';

export const Wrapper = styled.label`
  ${space};
  display: block;
  position: relative;
`;

export const LabelStyled = styled.span`
  position: absolute;
  top: 8px;
  left: 0px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  -webkit-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
  cursor: text;
`;
