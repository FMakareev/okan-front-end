import { style } from 'styled-system';

export const BorderRadiusProperty = style({
  // React prop name
  prop: 'borderRadius',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'border-radius',
  // key for theme values
  key: 'borderRadius',
  // convert number values to pixels
  numberToPx: true,
  // shorthand alias React prop name
  alias: 'br',
});

export default BorderRadiusProperty;
