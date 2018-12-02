import React, { PureComponent } from 'react';
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

export class TooltipBase extends PureComponent {
  static propTypes = {
    /** message text */
    warning: PropTypes.string,
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
    warning: 'Информация не доступна',
    left: 0,
    top: 175,
    isActive: false,
    children: <div>Test</div>,
  };

  render() {
    const { warning, top, isActive, left, children } = this.props;
    return (
      <RelativeStyled>
        {isActive && (
          <Wrapper top={top} left={left}>
            <OutsideTriangle />
            <InsideTriangle />
            <Warning>{warning}</Warning>
          </Wrapper>
        )}
        {children}
      </RelativeStyled>
    );
  }
}

export default TooltipBase;
