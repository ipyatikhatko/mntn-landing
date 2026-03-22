const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const path = require('path');
const steps = require('./src/data.json');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    // Hero PNGs (CSS url()) and copied step images are multi‑MB; default 244 KiB is unrealistic here.
    performance: isProduction
      ? {
          hints: 'warning',
          maxAssetSize: 3 * 1024 * 1024,
          maxEntrypointSize: 512 * 1024,
        }
      : false,
    optimization: isProduction
      ? {
          minimizer: [
            '...',
            new ImageMinimizerPlugin({
              minimizer: [
                {
                  implementation: ImageMinimizerPlugin.sharpMinify,
                  options: {
                    encodeOptions: {
                      jpeg: { quality: 85, mozjpeg: true },
                      png: {
                        compressionLevel: 9,
                        effort: 10,
                      },
                    },
                  },
                },
                {
                  implementation: ImageMinimizerPlugin.svgoMinify,
                  options: {
                    encodeOptions: {
                      multipass: true,
                      plugins: ['preset-default'],
                    },
                  },
                },
              ],
            }),
          ],
        }
      : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
          options: {
            partialDirs: [
              path.join(__dirname, 'src', 'partials')
            ],
            helperDirs: [
              path.join(__dirname, 'src', 'helpers')
            ],
            knownHelpers: {
              json: true
            },
            knownHelpersOnly: false
          }
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/templates/main.hbs',
        filename: 'index.html',
        templateParameters: {
          steps: steps
        }
      }),
      new CopyWebpackPlugin({
        patterns: [
            { from: 'src/assets', to: 'assets' },
        ],
    }),
      ...(isProduction
        ? [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })]
        : []),
    ],
    devServer: {
      static: path.join(__dirname, 'dist'),
      watchFiles: {
        paths: ['src/**/*.*'],
        options: {
          usePolling: true,
        },
      },
    },
    stats: 'errors-only',
  };
};
