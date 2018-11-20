// WordBreakProperty
import React, { Component } from 'react';
import { style } from 'styled-system';

export const BoxShadowProperty = style({
  // React prop name
  prop: 'boxShadow',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'box-shadow',
  // key for theme values
  key: 'boxShadow',
  // convert number values to pixels
  numberToPx: true,
  // shorthand alias React prop name
  alias: 'bs',
});

export default BoxShadowProperty;
