import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/** Components */
import CheckIsBrowser from '../CheckIsBrowser/CheckIsBrowser';

export class Portal extends Component {

  static propTypes = {
    portalContainerId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.portalContainer = document.createElement('div');
    this.portalContainer.setAttribute('id', this.props.portalContainerId);
    this.portalList= document.getElementById('portal');
  }

  componentDidMount() {
    this.portalList.appendChild(this.portalContainer);
  }

  componentWillUnmount() {
    this.portalList.removeChild(this.portalContainer);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.portalContainer);
  }
}

Portal = CheckIsBrowser()(Portal);

export default Portal;

