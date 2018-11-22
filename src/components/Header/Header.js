import React, { Component } from 'react';
// import PropTypes from 'prop-types';



export class Header extends Component {
  static propTypes = { };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    return (
      <div>
        Header
      </div>
    );
  }
}

export default Header;
