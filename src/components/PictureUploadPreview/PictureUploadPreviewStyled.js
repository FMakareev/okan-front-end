import DropZoneDefault from 'react-dropzone';
import Icon from 'react-icons-kit';
import styled from 'styled-components';
import { space, color } from 'styled-system';

/** Styles */
import BorderRadiusProperty from '../../styles/styleProperty/BorderRadiusProperty';
import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';
import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';

export const DropZoneStyled = styled.div`
  ${space};
  ${BorderRadiusProperty};
  position: relative;
  cursor: pointer;
  overflow: hidden;
  height: 58px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid;
  ${props => color({ ...props, color: 'color4' })};
  background-image: ${({bg})=>`url('${bg}')`};
`;

export const DropZoneIconWrapper = styled.div`
  position: relative;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  overflow: hidden;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  ${props => BackgroundColorProperty({ ...props, color: 'color0' })};
  ${props => FontFamilyProperty({ ...props, fontFamily: 'secondary' })} !important;
  ${({ disabled }) => (disabled ? 'opacity: 0.25;' : '')};
`;

export const Img = styled.img`
  cursor: pointer;
  max-width: 400px;
  max-height: 58px;
  margin: 0 auto;
  display: block;
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
