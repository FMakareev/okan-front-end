import styled from 'styled-components';

const Wrapper = styled.header`
  width: 100%;
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
  width: 20px;
`;

const LogoWrapper = styled.img`
  width: 106px;
  height: 24px;
  margin-top: 6px;
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
  padding-left: 6px;
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

const ProfileButton = styled.button`
  width: 24px;
  height: 26px;
  margin-left: 17px;
  margin-top: auto;
  margin-bottom: auto;
  background-color: transparent;
  border: unset;

  :hover {
    cursor: pointer;
  }
`;

const ControlImg = styled.img`
  margin-top: auto;
  margin-bottom: auto;
`;

const BurgerMenuButton = styled(ProfileButton)`
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
  ProfileButton,
  ControlImg,
  BurgerMenuButton,
};
