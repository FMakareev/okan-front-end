import React from 'react';
import PropTypes from 'prop-types';

/** Image */
import { SvgTriangle } from '@lib/ui/Icons/SvgTriangle';

/** View */
import Box from '@lib/ui/Box/Box';

export const NodeToggle = ({ toggled, fill }) => {
  return (
    <Box
      style={{
        width: '20px',
        height: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `rotate(${toggled ? '90deg' : '0deg'})`,
      }}>
      <SvgTriangle fill={fill} />
    </Box>
  );
};

NodeToggle.propTypes = {
  toggle: PropTypes.bool.isRequired,
  fill: PropTypes.string,
};

NodeToggle.defaultProps = {
  toggle: false,
  fill: '#333333',
};

export default NodeToggle;
