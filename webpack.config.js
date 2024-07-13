const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const steps = require('./src/data.json');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
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
          'style-loader',
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
