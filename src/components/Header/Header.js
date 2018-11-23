import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  LineWrapper,
  LeftLineWrapper,
  LogoWrapper,
  ControlsWrapper,
  Title,
  ProfileLink,
  ControlImg,
  ProjectListLink,
} from './HeaderStyled';

import Logo from '../../assets/icons/monocolor/headerLogo.monocolor.svg';
import ProfileLogo from '../../assets/icons/monocolor/headerProfile.monocolor.svg';
import ProjectListLogo from '../../assets/icons/monocolor/headerProjectList.monocolor.svg';

export class Header extends Component {
  static propTypes = {
    /** route name */
    name: PropTypes.string,
  };

  static defaultProps = {
    name: 'Title not found',
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    const { name } = this.props;
    return (
      <Wrapper>
        <LeftLineWrapper />
        <LogoWrapper src={Logo} alt="logo" />
        <LineWrapper />
        <ControlsWrapper>
          <Title>{name}</Title>
          <ProfileLink to="/app">
            <ControlImg src={ProfileLogo} alt="profile" />
          </ProfileLink>
          <ProjectListLink to="/app">
            <ControlImg src={ProjectListLogo} alt="profile" />
          </ProjectListLink>
        </ControlsWrapper>
      </Wrapper>
    );
  }
}

export default Header;
