import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Relative } from 'rebass';
import styled from 'styled-components';

/** Css value */
import { Wrapper, OutsideTriangle, InsideTriangle, Warning } from './TooltipBaseStyled';

const RelativeStyled = styled(Relative)`
  width: 100%;
`;

/**
 * Компонент тултипа (Tooltip)
 * @example ./TooltipBase.example.md
 */

export class TooltipBase extends Component {
  static propTypes = {
    /** message text */
    warning: PropTypes.string,
    /** tooltip position */
    position: PropTypes.string,
    /** top position % */
    top: PropTypes.any,
    /** right position % */
    left: PropTypes.any,
    /** active or not */
    isActive: PropTypes.bool,
    /** the element whose tooltip is displayed */
    children: PropTypes.element,
  };

  static defaultProps = {
    warning: 'Информация не доступна',
    position: 'bottom',
    isActive: false,
  };


  render() {
    const { warning, position, isActive, children } = this.props;
    return (
      <RelativeStyled>
        {isActive && (
          <Wrapper position={position}>
            <OutsideTriangle position={position} />
            <InsideTriangle position={position} />
            <Warning>{warning}</Warning>
          </Wrapper>
        )}
        {children}
      </RelativeStyled>
    );
  }
}

export default TooltipBase;
