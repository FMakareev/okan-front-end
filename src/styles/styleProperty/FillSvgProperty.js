import { style } from 'styled-system';

export const FillSvgProperty = style({
  // React prop name
  prop: 'fill',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'fill',
  // key for theme values
  key: 'colors',
  // convert number values to pixels
  numberToPx: false,
  // shorthand alias React prop name
  alias: 'fill',
});

export default FillSvgProperty;
