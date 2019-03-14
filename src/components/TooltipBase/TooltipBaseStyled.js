import styled from 'styled-components';
import {color, fontWeight} from 'styled-system';

/** view */
import Text from '../Text/Text';

/** Styles property */
import {BorderColorProperty} from '../../styles/styleProperty/BorderColorProperty';
import {BackgroundColorProperty} from '../../styles/styleProperty/BackgroundColorProperty';
import {FontSizeProperty} from '../../styles/styleProperty/FontSizeProperty';
import {LineHeightProperty} from '../../styles/styleProperty/LineHeightProperty';

export const Wrapper = styled.div`
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  max-width: 240px;
  min-width: 100px;
  padding-top: 13px;
  padding-right: 10px;
  padding-bottom: 14px;
  padding-left: 10px;
  position: absolute;
  right: 0;

  ${({position}) => {
  switch (position) {
    case 'bottom': {
      return `
          left: 14px;
          top: calc(100% + 10px);
        `;
    }
    case 'top': {
      return `
          left: 14px;
          bottom: calc(100% + 10px);
        `;
    }
    default: {
      return `
          left: 14px;
          top: calc(100% + 10px);
        `;
    }
  }
}}

  z-index: 1;
  text-align: left;
  border: 1px solid;
  ${props => BorderColorProperty({...props, borderColor: 'color12'})}
  ${props =>
  BackgroundColorProperty({
    ...props,
    backgroundColor: 'color0',
  })}
  border-radius: 3px;
`;

export const OutsideTriangle = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  z-index: 1;
  border-style: solid;
  border-width: 10.5px 18px 10.5px 0;
  border-color: transparent #df4624 transparent transparent;
  ${props => BorderColorProperty({...props, borderTopColor: 'color12'})}

  ${({position}) => {
    switch (position) {
      case 'bottom': {
        return `
            transform: rotate(90deg);
            top: -20px;
            left: 15%;
          `;
      }
      case 'top': {
        return `
          transform: rotate(-90deg);
          bottom: -20px;
          left: 15%;
        `;
      }
      default: {
        return `
          -webkit-transform: rotate(90deg);
          -ms-transform: rotate(90deg);
          transform: rotate(90deg);
          top: -20px;
          left: 15%;
        `;
      }
    }
  }}
`;

export const InsideTriangle = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  z-index: 2;
  border-style: solid;
  border-width: 10.5px 18px 10.5px 0;
  border-color: transparent #fff transparent transparent;
  ${props => BorderColorProperty({...props, borderTopColor: 'color12'})}

  ${({position}) => {
    switch (position) {
      case 'bottom': {
        return `
          transform: rotate(90deg);
          top: -18px;
          left: 15%;
        `;
      }
      case 'top': {
        return `
          transform: rotate(-90deg);
          bottom: -18px;
          left: 15%;
        `;
      }
      default: {
        return `
          transform: rotate(90deg);
          top: -18px;
          left: 15%;
        `;
      }
    }
  }}  
  
  
`;

export const Warning = styled(Text)`
  font-family: 'Museo Sans 300', sans-serif;
  ${props => FontSizeProperty({...props, fontSize: 5})}
  ${props => fontWeight({...props, fontWeight: 0})}
  ${props => LineHeightProperty({...props, lineHeight: 7})}
  ${props => color({...props, color: 'color12'})}
`;
