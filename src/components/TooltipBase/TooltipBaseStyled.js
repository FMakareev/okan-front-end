import styled from 'styled-components';
import Text from '../Text/Text';

export const Wrapper = styled.div`
  width: fit-content;
  max-width: 240px;
  min-width: 100px;
  padding-top: 13px;
  padding-right: 10px;
  padding-bottom: 14px;
  padding-left: 10px;
  position: absolute;
  top: ${props => props.top}%;
  right: 0;
  left: ${props => props.left}%;
  z-index: 1;
  text-align: left;
  border: 1px solid ${props => props.theme.colors.color9};
  border-radius: 3px;
  background: ${props => props.theme.colors.color0};
`;

export const OutsideTriangle = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  z-index: 1;
  border-style: solid;
  border-width: 10.5px 18px 10.5px 0;
  border-color: transparent ${props => props.theme.colors.color9} transparent transparent;
  transform: rotate(90deg);
  top: -20px;
  left: 15%;
`;

export const InsideTriangle = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  z-index: 2;
  top: -18px;
  left: 15%;
  transform: rotate(90deg);
  border-style: solid;
  border-width: 10.5px 18px 10.5px 0;
  border-color: transparent ${props => props.theme.colors.color0} transparent transparent;
`;

export const Warning = styled(Text)`
  font-family: 'Museo Sans Cyrl', sans-serif;
  font-size: ${props => props.theme.fontSizes[5]}px;
  font-weight: ${props => props.theme.fontWeight[0]};
  line-height: ${props => props.theme.fontSizes[6]}px;
  color: ${props => props.theme.colors.color9};
`;
