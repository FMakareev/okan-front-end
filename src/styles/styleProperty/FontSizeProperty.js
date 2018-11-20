import { style } from 'styled-system';

export const FontSizeProperty = style({
  // React prop name
  prop: 'fontSize',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'font-size',
  // key for theme values
  key: 'fontSizes',
  // convert number values to pixels
  numberToPx: true,
  // shorthand alias React prop name
  alias: 'fz',
});

export default FontSizeProperty;
