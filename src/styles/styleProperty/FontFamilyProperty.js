import { style } from 'styled-system';

/**
 * @params {string} fontFamily - string name of the font name property in the theme
 * @params {object} theme
 * */

export const FontFamilyProperty = style({
  // React prop name
  prop: 'fontFamily',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'font-family',
  // key for theme values
  key: 'fontFamily',
  // convert number values to pixels
  numberToPx: false,
  // shorthand alias React prop name
  alias: 'fontFamily',
});
export default FontFamilyProperty;
