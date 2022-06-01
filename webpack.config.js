const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.[hash:5].js',
  },
  resolve: {
    extensions: ['.html', '.js', '.css', '.scss'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 5000,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash:5].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Chats Demo',
      template: './static/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve('src', 'assets'),
          to: path.resolve('build', 'assets')
        }
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.(s*)css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
    ],
  },
};
