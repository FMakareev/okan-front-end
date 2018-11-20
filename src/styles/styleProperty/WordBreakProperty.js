// WordBreakProperty
import React, { Component } from 'react';
import { style } from 'styled-system';

export const WordBreakProperty = style({
  // React prop name
  prop: 'wordBreak',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'word-break',
  // key for theme values
  key: 'wordBreak',
  // convert number values to pixels
  numberToPx: true,
  // shorthand alias React prop name
  alias: 'wb',
});

export default WordBreakProperty;
