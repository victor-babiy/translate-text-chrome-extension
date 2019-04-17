const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  // TODO: remove
  devtool: 'cheap-module-source-map',
  entry: {
    app: './src/app.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      { from: 'public', to: './' },
    ]),
  ],
};
