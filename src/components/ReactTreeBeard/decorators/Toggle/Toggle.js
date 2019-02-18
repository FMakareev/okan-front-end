import React from 'react';
import { Base, Polygon, Wrapper } from '@lib/ui/ReactTreeBeard/decorators/Toggle/ToggleStyled';
import PropTypes from 'prop-types';

export const Toggle = () => {
  const midHeight = 14 * 0.5;
  const points = `0,0 0,${14} ${14},${midHeight}`;

  return (
    <Base>
      <Wrapper>
        <svg height={14} width={14}>
          <Polygon points={points} />
        </svg>
      </Wrapper>
    </Base>
  );
};

Toggle.propTypes = {};

export default Toggle;
