module.exports = {
  entry: './src/auto-complete.js',
  output: {
    path: __dirname + '/lib',
    filename: 'auto-complete.js',
    library: 'node-package-open-source-starter',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};