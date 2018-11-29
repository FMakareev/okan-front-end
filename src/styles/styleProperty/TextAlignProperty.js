import { style } from 'styled-system';

export const TextAlignProperty = style({
  // React prop name
  prop: 'textAlign',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'text-align',
  // key for theme values
  key: 'textAlign',
  // convert number values to pixels
  numberToPx: false,
  // shorthand alias React prop name
  alias: 'ta',
});

export default TextAlignProperty;
