import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/** Components */
import CheckIsBrowser from '../CheckIsBrowser/CheckIsBrowser';

export class Portal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.portal = document.getElementById('portal');
  }

  componentDidMount() {
    this.portal.appendChild(this.el);
  }

  componentWillUnmount() {
    this.portal.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

Portal = CheckIsBrowser()(Portal);

export default Portal;
