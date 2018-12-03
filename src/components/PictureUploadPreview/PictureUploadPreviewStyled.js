import DropZoneDefault from 'react-dropzone';
import Icon from 'react-icons-kit';
import styled from 'styled-components';
import { space } from 'styled-system';

import BorderRadiusProperty from '../../styles/styleProperty/BorderRadiusProperty';

export const DropZoneStyled = styled(DropZoneDefault)`
  ${space};
  ${BorderRadiusProperty};
  cursor: pointer;
  overflow: hidden;
  height: 58px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const DropZoneIconWrapper = styled.div`
  font-family: ${props => props.theme.fontFamily.secondary} !important;
  position: relative;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  overflow: hidden;
  color: #848484;
  border: 1px solid;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #fff;
  ${({ disabled }) => (disabled ? 'opacity: 0.25;' : '')};
`;

export const Img = styled.img`
  position: absolute;
  left: 0;
  cursor: pointer;
`;

export const IconStyled = styled(Icon)`
  left: 70%;
  top: 75%;
  z-index: 2;
  position: absolute;
  color: #fff;
  background-color: #37b770;
  border-radius: 50%;
  width: 16px;
  height: 16px;

  @media (min-width: 576px) {
    width: 25px;
    height: 25px;
    left: 72%;
    top: 78%;
  }
`;
