import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.header`
  width: 100%;
  min-width: 1024px;
  height: 40px;
  display: flex;
  background-color: ${props => props.theme.colors.color5};
  box-shadow: ${props => props.theme.boxShadow[2]};
`;

const LineWrapper = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    width: inherit;
    border-bottom: 1px solid ${props => props.theme.colors.color0};
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
  background-color: ${props => props.theme.colors.color5};
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
  font-size: ${props => props.theme.fontSizes[6]}px;
  line-height: ${props => props.theme.fontSizes[9]}px;
  color: ${props => props.theme.colors.color0};
  border: 1px solid ${props => props.theme.colors.color0};
  border-radius: 5px;

  &:before {
    content: '';
    width: 6px;
    height: 6px;
    top: 12px;
    left: -4px;
    position: absolute;
    z-index: 1;
    border: 1px solid ${props => props.theme.colors.color0};
    border-radius: 2px;
    background-color: ${props => props.theme.colors.color5};
  }
`;

const ProfileLink = styled(NavLink)`
  margin-left: 17px;
  margin-top: auto;
  margin-bottom: auto;

  & > svg {
    fill: ${props => props.theme.colors.color0};
  }

  &.active > svg {
    fill: ${props => props.theme.colors.color10};
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
