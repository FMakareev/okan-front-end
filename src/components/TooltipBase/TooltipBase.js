import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Relative } from 'rebass';
import styled from 'styled-components';

import {
  Wrapper,
  OutsideTriangle,
  InsideTriangle,
  Warning,
  Success,
  Message,
} from './TooltipBaseStyled';

const RelativeStyled = styled(Relative)`
  width: 100%;
`;

/**
 * Компонент тултипа (Tooltip)
 * @example ./TooltipDefault.example.md
 */

export class TooltipDefault extends PureComponent {
  static propTypes = {
    /** warning message label */
    warning: PropTypes.string,
    /** success message label */
    success: PropTypes.string,
    /** message text */
    message: PropTypes.string,
    /** top position px */
    top: PropTypes.number,
    /** right position px */
    right: PropTypes.number,
    /** tooltip'arrow centered */
    arrowCentered: PropTypes.bool,
    /** active or not */
    isActive: PropTypes.bool,
    /** the element whose tooltip is displayed */
    children: PropTypes.element,
    /** the location of the tooltip relative to the element for which it is applied */
    position: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
  };

  static defaultProps = {
    position: 'right',
  };

  render() {
    const {
      warning,
      success,
      message,
      top,
      isActive,
      right,
      arrowCentered,
      children,
      position,
    } = this.props;
    return (
      <RelativeStyled>
        {isActive && (
          <Wrapper position={position} top={top} right={right}>
            <OutsideTriangle arrowCentered={arrowCentered} />
            <InsideTriangle arrowCentered={arrowCentered} />
            {warning ? <Warning>{warning}</Warning> : null}
            {success ? <Success>{success}</Success> : null}
            {message ? <Message>{message}</Message> : null}
          </Wrapper>
        )}

        {children}
      </RelativeStyled>
    );
  }
}

export default TooltipDefault;
