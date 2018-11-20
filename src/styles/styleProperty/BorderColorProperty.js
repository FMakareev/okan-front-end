import React, { Component } from 'react';

import styled from 'styled-components';
import { style, fontSize } from 'styled-system';

export const BorderColorProperty = style({
  // React prop name
  prop: 'borderColor',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'border-color',
  // key for theme values
  key: 'colors',
  // convert number values to pixels
  numberToPx: false,
  // shorthand alias React prop name
  alias: 'bc',
});

export default BorderColorProperty;
