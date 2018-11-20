import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink, Toolbar } from 'rebass';
import { Link } from 'react-router-dom';

import { ConfigRouter } from '../../routes/index';

const LinkStyled = styled(Link)`
  color: inherit;
  background-color: transparent;
  font-size: 14px;
  font-weight: 700;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  align-self: stretch;
  white-space: nowrap;
  cursor: pointer;
  padding: 8px;
  text-decoration: none;
`;


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

  /**
   * @param {array} userResolvers - массив резолверов текущего авторизованного пользователя
   * @param {array} componentResolvers - массив резолверо в компонента
   * @return {bool} - возвращает true - доступ есть, false - доступа нет
   * @desc метод получает на вход два массива иищет совпадения второго массива в первом
   * */
  comparingArrays(userResolvers, componentResolvers) {
    const accessList = [];
    if (!componentResolvers.length) {
      return true;
    }
    componentResolvers.forEach(compResolver => {
      userResolvers.forEach(userResolver => {
        if (compResolver === userResolver) {
          accessList.push(userResolver);
        }
      });
    });
    return accessList.length;
  }

  sortingRoutes = routes =>
    routes.sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });

  createNavigationAfterSortingRoutes = ConfigRouter =>
    this.sortingRoutes(this.createNavigation(ConfigRouter));

  /**
   * @description generate menu list
   * @param {*} ConfigRouter
   * @returns list of object that contains param `hiden:false`
   * @memberof Navigation
   */
  createNavigation(routes) {
    try {
      if (has.call(routes[0], 'routes')) {
        return routes[0].routes.filter(route => {
          try {
            if (
              !route.hidden
              // this.props.user &&
              // this.comparingArrays(this.props.user.resolvers, route.resolvers)
            ) {
              return {
                name: route.name,
                path: route.path,
              };
            }
            return false;
          } catch (err) {
            console.error('Error: missing hidden property: ', err);
            return route;
          }
        });
      }
      return [];
    } catch (err) {
      console.error('Error: missing ConfigRouter: ', err);
      return [];
    }
  }

  render() {
    return (
      <Toolbar>
        <NavLink>
          CompAero CRA
        </NavLink>
        <NavLink ml="auto" />

        {this.createNavigationAfterSortingRoutes(ConfigRouter).map((item, index) => (
          <LinkStyled key={`LinkStyled-${index}`} to={item.path}>
            {item.name}
          </LinkStyled>
        ))}
      </Toolbar>
    );
  }
}

Header = connect(state => ({
  user: state.user,
}))(Header);

export default Header;
