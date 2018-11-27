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
  ProjectListLink,
} from './HeaderStyled';

import Logo from '../../assets/icons/monocolor/headerLogo.monocolor.svg';
import { ProfileLogo, ProjectListLogo } from './Logos';

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
          <ProfileLink to="/app/profile" activeClassName="active">
            <ProfileLogo />
          </ProfileLink>
          <ProjectListLink to="/app/project-list" activeClassName="active">
            <ProjectListLogo />
          </ProjectListLink>
        </ControlsWrapper>
      </Wrapper>
    );
  }
}

export default Header;
