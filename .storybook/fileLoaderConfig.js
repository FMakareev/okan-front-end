export const fileLoaderConfig = {
  test: /\.(jpg|png|gif|pdf|ico)$/,
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        emitFile: true,
        useRelativePath: false,
        name: 'assets/media/[name].[ext]',
        // outputPath: '/assets',
        // publicPath: '/assets',
      },
    },
  ],
};

export default fileLoaderConfig;
