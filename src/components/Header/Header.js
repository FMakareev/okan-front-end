import React, { Component, Fragment } from 'react';
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

export class Header extends Component {
  static propTypes = {
    /** route name */
    name: PropTypes.string /** window (Modal) */,
    isOpen: PropTypes.bool /** function for managments window(Modal) */,
    handleClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  get openMenu() {
    return (
      <AbsoluteStyled top={'33px'} right={'-15px'} onMouseLeave={this.handleMouseOut}>
        <ProfileLink to="/app/profile" activeClassName="active">
          <BoxTop>Профиль</BoxTop>
        </ProfileLink>
        <ProfileLink to="/logout" activeClassName="active">
          <BoxBottom>Выйти</BoxBottom>
        </ProfileLink>
      </AbsoluteStyled>
    );
  }

  get initialState() {
    return { isOpen: false };
  }

  handleMouseEnter() {
    this.setState(({ isOpen }) => {
      return { isOpen: true };
    });
  }

  handleMouseOut() {
    this.setState(({ isOpen }) => {
      return { isOpen: false };
    });
  }

  render() {
    const { name } = this.props;
    const { isOpen } = this.state;

    return (
      <Wrapper>
        <LeftLineWrapper />
        <LogoWrapper src={Logo} alt="logo" />
        <LineWrapper />
        <ControlsWrapper>
          <Title>{name}</Title>

          <ButtonBaseStyled
            variant={'empty'}
            position={'relative'}
            onMouseEnter={this.handleMouseEnter}>
            <ProfileLogo />
            {isOpen && <Fragment>{this.openMenu}</Fragment>}
          </ButtonBaseStyled>

          <ProjectListLink to="/app/project-list" activeClassName="active">
            <ProjectListLogo />
          </ProjectListLink>
        </ControlsWrapper>
      </Wrapper>
    );
  }
}

// export default RenderOpenWindow(Header);
export default Header;
