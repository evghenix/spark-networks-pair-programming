module.exports = {
  devServer: {
    port: 9000,
    compress: false,
    progress: true,
    contentBase: 'public',
    watchContentBase: true,
  },
  watch: true,
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/App.js'],
  output: {
    filename: './public/build.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
