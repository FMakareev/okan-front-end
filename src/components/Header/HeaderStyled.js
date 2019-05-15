import styled from 'styled-components';
import { color } from 'styled-system';
import { NavLink } from 'react-router-dom';
import { Absolute } from 'rebass';

/** View */
import Box from '../Box/Box';
import ButtonBase from '../ButtonBase/ButtonBase';

/** Styles property */
import BackgroundColorProperty from '../../styles/styleProperty/BackgroundColorProperty';
import BorderColorProperty from '../../styles/styleProperty/BorderColorProperty';
import { FillSvgProperty } from '../../styles/styleProperty/FillSvgProperty';
import { BoxShadowProperty } from '../../styles/styleProperty/BoxShadowProperty';
import BorderRadiusProperty from '../../styles/styleProperty/BorderRadiusProperty';
import FontSizeProperty from '../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../styles/styleProperty/LineHeightProperty';

const Wrapper = styled.header`
  width: 100%;
  min-width: 1024px;
  height: 40px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  z-index: 999;
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color5' })};
  ${props => BoxShadowProperty({ ...props, boxShadow: 2 })};
`;

const LineWrapper = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    width: inherit;
    border-bottom: 1px solid;
    ${props => BorderColorProperty({ ...props, borderColor: 'color0' })};
    position: absolute;
    z-index: 1;
    top: 20px;
  }
`;

const LeftLineWrapper = styled(LineWrapper)`
  width: 28px;
`;

const LogoWrapper = styled.img`
  margin-top: 6px;
  height: 24px;
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color5' })};
`;

const ControlsWrapper = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
`;

const Title = styled.div`
  width: max-content;
  position: relative;
  padding-top: 2px;
  padding-bottom: 1px;
  padding-left: 7px;
  padding-right: 10px;
  font-family: 'Circe Bold';
  ${props => FontSizeProperty({ ...props, fontSize: 6 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 8 })};
  ${props => color({ ...props, color: 'color0' })};
  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color0' })};
  border-radius: 5px;
  margin-right: 17px;

  &:before {
    content: '';
    width: 6px;
    height: 6px;
    top: 10px;
    left: -4px;
    position: absolute;
    z-index: 1;
    border: 1px solid;
    border-radius: 2px;
    ${props => BorderColorProperty({ ...props, borderColor: 'color0' })};
    ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color5' })};
  }
`;

const ProfileLink = styled(NavLink)`
  margin-top: auto;
  margin-bottom: auto;
  text-decoration: none;

  & > svg {
    ${props => FillSvgProperty({ ...props, color: 'color0' })}
  }

  &.active > svg {
    ${props => FillSvgProperty({ ...props, color: 'color10' })}
  }
`;

const ProjectListLink = styled(ProfileLink)`
  margin-top: 6px;
  margin-left: 13px;
  margin-right: 32px;
`;

const AbsoluteStyled = styled(Absolute)`
  z-index: 11;
  border: 1px solid;
  background-color: #fff;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
`;

const BoxTop = styled(Box)`
  ${props => FontSizeProperty({ ...props, fontSize: 6 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 7 })};
  ${props => color({ ...props, color: 'color11' })};
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color0' })};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  text-align: center;
  cursor: pointer;
  min-width: 150px;
  padding: 5px 0;

  :hover {
    background-color: #007faf21;
  }
`;

const BoxBottom = styled(BoxTop)`
  border-top: 1px solid;
  border-radius: 0 0 5px 5px;
`;

const ButtonBaseStyled = styled(ButtonBase)`
  fill: #fff;
  background-color: #007faf;

  & :active {
    fill: #00649c;
  }
`;

export {
  Wrapper,
  LineWrapper,
  LeftLineWrapper,
  LogoWrapper,
  ControlsWrapper,
  Title,
  ProfileLink,
  ProjectListLink,
  AbsoluteStyled,
  BoxTop,
  BoxBottom,
  ButtonBaseStyled,
};
