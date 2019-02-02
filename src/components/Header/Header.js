import React, { Component } from 'react';
import PropTypes from 'prop-types';


/** Css value */
import {
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
} from './HeaderStyled';

/** Image */
import Logo from '../../assets/image/Logo.png';
import { ProfileLogo, ProjectListLogo } from './Logos';

/** HOC */
import RenderOpenWindow from '../../utils/helpers/RenderOpenWindow';

const OpenMenu = (
  <AbsoluteStyled top={'33px'} right={0}>
    <ProfileLink to="/app/profile" activeClassName="active">
      <BoxTop>Профиль</BoxTop>
    </ProfileLink>
    <ProfileLink to="/logout" activeClassName="active">
      <BoxBottom>Выйти</BoxBottom>
    </ProfileLink>
  </AbsoluteStyled>
);

export class Header extends Component {
  static propTypes = {
    /** route name */
    name: PropTypes.string /** window (Modal) */,
    isOpen: PropTypes.bool /** function for managments window(Modal) */,
    handleClick: PropTypes.func,
  };

  static defaultProps = { name: 'Title not found', isOpen: false, handleClick: () => {} };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    const { name, isOpen, handleClick } = this.props;

    return (
      <Wrapper>
        <LeftLineWrapper />
        <LogoWrapper src={Logo} alt="logo" />
        <LineWrapper />
        <ControlsWrapper>
          <Title>{name}</Title>

          <ButtonBaseStyled variant={'empty'} onClick={handleClick} position={'relative'}>
            <ProfileLogo />

            {isOpen && OpenMenu}
          </ButtonBaseStyled>

          <ProjectListLink to="/app/project-list" activeClassName="active">
            <ProjectListLogo />
          </ProjectListLink>
        </ControlsWrapper>
      </Wrapper>
    );
  }
}

export default RenderOpenWindow(Header);
