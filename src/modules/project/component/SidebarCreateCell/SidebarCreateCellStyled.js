import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';
import FontSizeProperty from '../../../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../../../styles/styleProperty/LineHeightProperty';
import Box from "@lib/ui/Box/Box";

import {Absolute} from 'rebass';
import styled from 'styled-components';
import {color} from 'styled-system';

export const AbsoluteStyled = styled(Absolute)`
  z-index: 2;
  border: 1px solid;
  background-color: #ffffff;
  width: 120px;
  ${props => BorderColorProperty({...props, borderColor: 'color4'})};
  ${props => BorderRadiusProperty({...props, borderRadius: '5px'})};
`;

export const BoxStyled = styled(Box)`
  ${props => FontSizeProperty({...props, fontSize: 5})};
  ${props => LineHeightProperty({...props, lineHeight: 7})};
  ${props => color({...props, color: 'color11'})};
  padding: 0 3px;
  text-align: center;
  cursor: pointer;

  :hover {
    background-color: #007faf21;
  }
`;
