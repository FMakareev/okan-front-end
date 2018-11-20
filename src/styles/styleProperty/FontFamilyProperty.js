/**
 * @params {string} fontFamily - string name of the font name property in the theme
 * @params {object} theme
 * */
export const FontFamilyProperty = ({ fontFamily, theme }) => {
  try {
    if (fontFamily && theme.fontFamily) {
      return `font-family: '${theme.fontFamily[fontFamily]}';`;
    }
  } catch (e) {
    console.error(e);
  }
};
export default FontFamilyProperty;
