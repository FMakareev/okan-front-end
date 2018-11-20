const has = Object.prototype.hasOwnProperty;

export const LineHeightRemProperty = ({ theme, ...rest }) => {
  if (has.call(rest, 'lineHeight') || has.call(rest, 'lh')) {
    if ((rest.lineHeight || rest.lh) === 'inherit') {
      return `line-height: inherit;`;
    }
    return `line-height: ${theme.lineHeight[rest.lineHeight || rest.lh]}px;
		line-height: ${theme.fontSizes[rest.lh || rest.lineHeight] / theme.baseFontSize}rem;`;
  }
};

export default LineHeightRemProperty;
