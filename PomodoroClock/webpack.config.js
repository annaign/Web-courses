'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');

const pathName = 'build';

const extractCSS = new ExtractTextPlugin({
  filename: '[name].[hash].css'
});

module.exports = (env, options) => {
  const inDevelopment = options.mode === 'development';

  return {
    context: path.resolve(__dirname, 'src'),

    entry: {
      index: ['./index.jsx']
    },

    output: {
      path: path.resolve(__dirname, pathName),
      filename: '[name].[chunkhash].js'
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },

    devtool: inDevelopment ? 'source-map' : false,

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },

        {
          test: /\.(css)$/,
          exclude: [/node_modules/],
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: !inDevelopment,
                  sourceMap: inDevelopment
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    stylelint,
                    autoprefixer({
                      browsers: ['ie 11', 'last 2 version'],
                      cascade: false
                    })
                  ],
                  sourceMap: inDevelopment
                }
              }
            ]
          })
        },

        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[hash].[ext]'
              }
            }
          ]
        },

        {
          test: /\.(mp3|ogg|aac|wav|wma)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'audio/[name]-[hash].[ext]'
              }
            }
          ]
        },

        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[path][name].[ext]'
            }
          }
        }
      ]
    },

    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new CleanWebpackPlugin([pathName], {
        root: __dirname,
        verbose: true,
        dry: false
      }),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'index.html',
        minify: { collapseWhitespace: !inDevelopment }
      }),
      extractCSS
    ],

    devServer: {
      host: 'localhost',
      port: 3000,
      open: false
    }
  };
};
