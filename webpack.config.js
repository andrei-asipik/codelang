import { join, resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';
import 'dotenv/config';
import webpack from 'webpack';

import { merge } from 'webpack-merge';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env = {}) => {
  const mode = env.mode || 'development';
  const isDev = mode !== 'production';
  const stylesHandler = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;

  const PORT = isDev ? process.env.DEV_PORT : 8080;

  const baseConfig = {
    mode,
    entry: join(__dirname, 'src', 'index.tsx'),
    resolve: {
      modules: ['node_modules'],
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@molecules': path.resolve(__dirname, 'src/components/molecules/'),
        '@organisms': path.resolve(__dirname, 'src/components/organisms/'),
        '@pages': path.resolve(__dirname, 'src/components/pages/'),
        '@templates': path.resolve(__dirname, 'src/components/templates/'),
        '@icons': path.resolve(__dirname, 'src/assets/icons/'),
        '@services': path.resolve(__dirname, 'src/services/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
      },
    },
    plugins: [
      new Dotenv(),
      new webpack.DefinePlugin({
        'process.env.CODELANG_API_URL': JSON.stringify(process.env.CODELANG_API_URL),
      }),
      new HtmlWebpackPlugin({
        template: join(__dirname, 'src', 'index.html'),
        filename: 'index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: join(__dirname, 'public'),
            globOptions: { ignore: ['*.DS_Store'] },
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.((c|sa|sc)ss)$/i,
          use: [
            stylesHandler,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                esModule: false,
                modules: {
                  localIdentName: isDev ? '[name]-[local]-[hash:base64:8]' : '[hash:base64]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: { postcssOptions: { plugins: [['postcss-preset-env']] } },
            },
            'sass-loader',
          ],
          include: /\.module\.(css|scss)$/,
        },
        {
          test: /\.((c|sa|sc)ss)$/i,
          use: [
            stylesHandler,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: { postcssOptions: { plugins: [['postcss-preset-env']] } },
            },
            'sass-loader',
          ],
          exclude: /\.module\.(css|scss)$/,
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(png|jpg|jpeg|webp|gif)$/i,
          type: 'asset/resource',
          generator: { filename: 'images/[hash][ext][query]' },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: { filename: 'fonts/[hash][ext][query]' },
        },
      ],
    },
    node: { __filename: true, __dirname: true },
  };

  const devConfig = {
    devServer: {
      port: PORT,
      hot: true,
      compress: true,
      client: {
        progress: true,
      },
      open: true,
      static: { directory: join(__dirname, 'dist') },
      historyApiFallback: true,
      proxy: [
        {
          context: ['/api'],
          target: process.env.CODELANG_API_URL,
          changeOrigin: true,
          secure: false,
          logLevel: 'debug',
          onProxyReq: (proxyReq) => {
            console.log('Proxying request to:', proxyReq.getHeader('host') + proxyReq.path);
          },
        },
      ],
    },
    target: 'web',
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    ],
    output: {
      filename: '[name].[contenthash].js',
      clean: true,
    },
  };

  const prodConfig = {
    target: 'browserslist',
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles/[contenthash].css',
      }),
    ],
    devtool: false,
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'js/[contenthash].js',
      publicPath: '/',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      usedExports: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: true,
            ecma: 6,
            mangle: true,
            output: {
              beautify: false,
              comments: false,
            },
          },
        }),
      ],
    },
  };

  return merge(baseConfig, isDev ? devConfig : prodConfig);
};
