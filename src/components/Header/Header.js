import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  LineWrapper,
  LeftLineWrapper,
  LogoWrapper,
  ControlsWrapper,
  Title,
  ProfileButton,
  ControlImg,
  BurgerMenuButton,
} from './HeaderStyled';

import Logo from '../../assets/icons/monocolor/headerLogo.monocolor.svg';
import Play from '../../assets/icons/monocolor/play.monocolor.svg';

export class Header extends Component {
  static propTypes = {
    /** route name */
    name: PropTypes.string,
    /** open menu function */
    onOpenMenu: PropTypes.func,
  };

  static defaultProps = {
    name: 'Title not found',
    onOpenMenu: null,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    const { name, onOpenMenu } = this.props;
    return (
      <Wrapper>
        <LeftLineWrapper />
        <LogoWrapper src={Logo} alt="logo" />
        <LineWrapper />
        <ControlsWrapper>
          <Title>{name}</Title>
          <ProfileButton>
            <ControlImg src={Play} alt="profile" />
          </ProfileButton>
          <BurgerMenuButton onClick={onOpenMenu}>
            <ControlImg src={Play} alt="profile" />
          </BurgerMenuButton>
        </ControlsWrapper>
      </Wrapper>
    );
  }
}

export default Header;
