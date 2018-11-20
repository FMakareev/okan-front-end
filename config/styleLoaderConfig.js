export const styleLoaderConfig = {
  test: /\.(css|less|styl|scss|sass|sss)$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
};

export default styleLoaderConfig;
