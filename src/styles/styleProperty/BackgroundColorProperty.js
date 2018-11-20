import { style } from 'styled-system';

export const BackgroundColorProperty = style({
  // React prop name
  prop: 'backgroundColor',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'background-color',
  // key for theme values
  key: 'colors',
  // convert number values to pixels
  numberToPx: false,
  // shorthand alias React prop name
  alias: 'bgc',
});

export default BackgroundColorProperty;
