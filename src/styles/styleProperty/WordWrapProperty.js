// WordBreakProperty
import React, { Component } from 'react';
import { style } from 'styled-system';

export const WordWrapProperty = style({
  // React prop name
  prop: 'wordWrap',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'word-wrap',
  // key for theme values
  key: 'wordWrap',
  // convert number values to pixels
  numberToPx: true,
  // shorthand alias React prop name
  alias: 'ww',
});

export default WordWrapProperty;
