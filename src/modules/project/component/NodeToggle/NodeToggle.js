import React from 'react';
import {SvgTriangle} from "@lib/ui/Icons/SvgTriangle";
import Box from "@lib/ui/Box/Box";
import PropTypes from 'prop-types';


export const NodeToggle = ({toggled, fill}) => {
  return (<Box
    style={{
      width: '20px',
      height: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: `rotate(${toggled ? '0deg' : '90deg'})`,
    }}>
    <SvgTriangle fill={fill}/>
  </Box>)
};

NodeToggle.propTypes = {
  toggle: PropTypes.bool,
};

NodeToggle.defaultProps = {
  toggle: false,
  fill: '#333333',
};

export default NodeToggle;
