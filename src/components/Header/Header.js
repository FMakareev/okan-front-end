import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink, Toolbar } from 'rebass';
import { Link } from 'react-router-dom';


const has = Object.prototype.hasOwnProperty;

export class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.createNavigation = this.createNavigation.bind(this);
  }

  get initialState() {
    return {};
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

Header = connect(state => ({
  user: state.user,
}))(Header);

export default Header;
