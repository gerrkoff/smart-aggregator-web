const dotenv = require('dotenv');
const path = require('path');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const DEV_ENV = 'development';
const PROD_ENV = 'production';
const TEST_ENV = 'test';
const nodeEnv = process.env.NODE_ENV ?? DEV_ENV;
const isProd = nodeEnv === PROD_ENV;
const isTest = nodeEnv === TEST_ENV;
const isDev = !isProd && !isTest;

const env = {
  NODE_ENV: nodeEnv,
  ...process.env,
  ...dotenv.config({ path: './.env' }).parsed,
  ...dotenv.config({ path: './.env.local' }).parsed,
  ...dotenv.config({ path: `./.env.${nodeEnv}` }).parsed,
  ...dotenv.config({ path: `./.env.${nodeEnv}.local` }).parsed,
};

const envPluginParams = Object.keys(env)
  .filter((key) => key.startsWith('REACT_APP_') || key === 'PORT' || key === 'HOST' || key === 'NODE_ENV')
  .reduce((acc, key) => {
    acc[`process.env.${key}`] = `"${env[key]}"`;
    return acc;
  }, {});

module.exports = {
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: process.env.PORT || 3000,
    static: {
      directory: path.join(__dirname, 'build'),
    },
  },
  entry: './src/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.(s*)css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentContext: isDev ? path.resolve(__dirname, 'src') : undefined,
                localIdentName: isProd ? '[hash:base64:5]' : '[path][name]__[local]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        generator: {
          filename: 'assets/[name][ext]',
        },
        test: /\.(png|jpg|svg|webp|ico|xml|json)$/,
        type: 'asset/resource',
      },
      {
        generator: {
          filename: 'fonts/[name][ext]',
        },
        test: /\.(woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    filename: 'index.[hash:5].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash:5].css',
    }),
    new HtmlWebpackPlugin({
      favicon: './static/favicon.ico',
      inject: 'body',
      template: isProd ? './static/index.production.html' : './static/index.html',
      title: 'Smart Aggregator',
    }),
    new DefinePlugin(envPluginParams),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.paths.json',
      }),
    ],
  },
};
