const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dotenv = require('dotenv');
const path = require('path');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const DEV_ENV = 'development';
const PROD_ENV = 'production';
const TEST_ENV = 'test';
const mode = process.env.NODE_ENV ?? PROD_ENV;
const isTest = mode === TEST_ENV;
const isDev = mode === DEV_ENV;
const isProd = !isTest && !isDev;

dotenv.config({ path: './.env' });
dotenv.config({ path: './.env.local' });
dotenv.config({ path: `./.env.${mode}` });
dotenv.config({ path: `./.env.${mode}.local` });

const envPluginParams = Object.keys(process.env)
  .filter((key) => key.startsWith('REACT_APP_') || key === 'PORT' || key === 'HOST' || key === 'NODE_ENV')
  .reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return acc;
  }, {});

const plugins = [
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
  new CopyPlugin({
    patterns: ['static/robots.txt'],
  }),
];

if (process.env.BUNDLE_ANALYZER) {
  plugins.push(new BundleAnalyzerPlugin());
}

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
  mode,
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
              modules: isProd
                ? true
                : {
                    localIdentContext: path.resolve(__dirname, 'src'),
                    localIdentName: '[path][name]__[local]',
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
  plugins,
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.paths.json',
      }),
    ],
  },
};
