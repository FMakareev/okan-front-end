import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Relative } from 'rebass';
import styled from 'styled-components';

import { Wrapper, OutsideTriangle, InsideTriangle, Message } from './TooltipBaseStyled';

const RelativeStyled = styled(Relative)`
  width: 100%;
`;

/**
 * Компонент тултипа (Tooltip)
 * @example ./TooltipDefault.example.md
 */

export class TooltipDefault extends PureComponent {
  static propTypes = {
    /** message text */
    message: PropTypes.string,
    /** top position % */
    top: PropTypes.number,
    /** right position % */
    left: PropTypes.number,
    /** active or not */
    isActive: PropTypes.bool,
    /** the element whose tooltip is displayed */
    children: PropTypes.element,
  };

  static defaultProps = {
    message: 'Информация не доступна',
    left: 0,
    top: 175,
    isActive: false,
    children: <div>Test</div>,
  };

  render() {
    const { message, top, isActive, left, children } = this.props;
    return (
      <RelativeStyled>
        {isActive && (
          <Wrapper top={top} left={left}>
            <OutsideTriangle />
            <InsideTriangle />
            <Message>{message}</Message>
          </Wrapper>
        )}
        {children}
      </RelativeStyled>
    );
  }
}

export default TooltipDefault;
