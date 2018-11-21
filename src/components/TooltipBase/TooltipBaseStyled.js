import styled from 'styled-components';
// import { Text, Relative } from 'rebass';
import { Relative } from 'rebass';
import Text from '../Text/Text';

export const Wrapper = styled.div`
  max-width: 155px;
  min-width: 120px;
  width: 100%;
  min-height: 35px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  position: absolute;
  z-index: 1;
  text-align: left;
  border: 2px solid ${props => props.theme.colors.line.color21};
  box-shadow: ${props => props.theme.boxShadow[1]};
  background: ${props => props.theme.colors.colorWhite};

  @media (max-width: 768px) {
    top: 130%;
    right: 0;
    left: 0;
    margin: auto;
  }

  @media (min-width: 769px) {
    ${({ position }) => {
      switch (position) {
        case 'top': {
          return `
			top: 100%;
			right: 0;
			left: 0;
			margin: auto;`;
        }
        case 'right': {
          return `
			top: 50%;
			left: 100%;
			transform: translate(0,-50%);`;
        }
        case 'bottom': {
          return `
			bottom: 100%;
			right: 0;
			left: 0;
			margin: auto;`;
        }
        case 'left': {
          return `
			top: 50%;
			right: 100%;
			transform: translate(0,-50%);`;
        }
      }
    }};
  }
`;

export const OutsideTriangle = styled.div`
  position: absolute;
  left: -8px;
  z-index: 1;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 3.5px 6px 3.5px 0;
  border-color: transparent ${props => props.theme.colors.line.color21} transparent transparent;

  @media (min-width: 769px) {
    top: 50%;
    transform: translateY(-50%);
  }
  @media (max-width: 768px) {
    transform: rotate(90deg);
    top: -8px;
    left: 50%;
  }
`;

export const InsideTriangle = styled.div`
  position:absolute;  
  left: -5px;
  z-index: 2;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 3.5px 6px 3.5px 0;
  border-color: transparent ${props => props.theme.colors.colorWhite}; transparent transparent;
  
  @media (min-width: 769px) {
    top: 50%;
    transform: translateY(-50%);
  }
  
  @media (max-width: 768px) {
    transform: rotate(90deg);
    top: -5px;
    left: 50%;
  }
`;

export const Warning = styled(Text)`
  margin-bottom: 1px;
  font-size: ${props => props.theme.fontSizes[4]}px;
  line-height: ${props => props.theme.fontSizes[4]}px;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  color: ${props => props.theme.colors.line.color23};
`;

export const Success = styled(Text)`
  margin-bottom: 1px;
  font: 600 10px 'Roboto', sans-serif;
  line-height: 12px;
  color: ${props => props.theme.colors.line.color22};
`;

export const Message = styled(Text)`
  font-size: ${props => props.theme.fontSizes[4]}px;
  line-height: ${props => props.theme.fontSizes[4]}px;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.colors.fontColor.color18};
`;
