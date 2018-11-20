import React, { Component } from 'react';
import { style } from 'styled-system';

export const LineHeightProperty = style({
  // React prop name
  prop: 'lineHeight',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'line-height',
  // key for theme values
  key: 'lineHeight',
  // convert number values to pixels
  numberToPx: true,
  // shorthand alias React prop name
  alias: 'lh',
});

export default LineHeightProperty;
