const has = Object.prototype.hasOwnProperty;

export const FontSizeRemProperty = ({ theme, ...rest }) => {
  if (has.call(rest, 'fontSize') || has.call(rest, 'fz')) {
    if (Array.isArray(rest.fontSize) || Array.isArray(rest.fz)) {
      let style = ``;
      let fontSizeArray = rest.fontSize || rest.fz;
      fontSizeArray.forEach((item, index) => {
        style += `@media(min-width: ${theme.breakpoints[index]}){
		      font-size: ${theme.fontSizes[item]}px;
					font-size: ${theme.fontSizes[item] / theme.baseFontSize}rem;
		    }`;
      });
      return style;
    }

    if (typeof rest.fz === 'string' && rest.fz.indexOf('px')) {
      return `font-size: ${rest.fontSize || rest.fz};`;
    }
    return `font-size: ${theme.fontSizes[rest.fontSize || rest.fz]}px;
		font-size: ${theme.fontSizes[rest.fontSize || rest.fz] / theme.baseFontSize}rem;`;
  }
};

export default FontSizeRemProperty;
