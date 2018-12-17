import styled from 'styled-components';
import { color } from 'styled-system';
import { NavLink } from 'react-router-dom';

/** Styles property */
import BackgroundColorProperty from '../../styles/styleProperty/BackgroundColorProperty';
import BorderColorProperty from '../../styles/styleProperty/BorderColorProperty';
import { FillSvgProperty } from '../../styles/styleProperty/FillSvgProperty';
import { LineHeightProperty } from '../../styles/styleProperty/LineHeightProperty';
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';
import { BoxShadowProperty } from '../../styles/styleProperty/BoxShadowProperty';

const Wrapper = styled.header`
  width: 100%;
  min-width: 1024px;
  height: 40px;
  display: flex;
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
  margin-bottom: 5px;
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color5' })};
`;

const ControlsWrapper = styled.div`
  margin-top: auto;
  margin-bottom: auto;
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
  ${props => FontSizeProperty({ ...props, fontSize: 9 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 9 })};
  ${props => color({ ...props, color: 'color0' })};
  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color0' })};
  border-radius: 5px;

  &:before {
    content: '';
    width: 6px;
    height: 6px;
    top: 12px;
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
  margin-left: 17px;
  margin-top: auto;
  margin-bottom: auto;

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

export {
  Wrapper,
  LineWrapper,
  LeftLineWrapper,
  LogoWrapper,
  ControlsWrapper,
  Title,
  ProfileLink,
  ProjectListLink,
};
