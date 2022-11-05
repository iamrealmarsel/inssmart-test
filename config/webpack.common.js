const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
  entry: [paths.src + '/index.ts'],

  plugins: [
    new HtmlWebpackPlugin({
      template: paths.src + '/pages/index.njk',
      filename: 'index.html',
      favicon: paths.public + '/img/favicon.png',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.njk$/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {
              searchPaths: paths.src + '/components',
              assetsPaths: paths.public,
            },
          },
        ],
      },

      { test: /\.ts?$/, use: 'ts-loader', exclude: /node_modules/ },

      { test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i, type: 'asset/resource' },
    ],
  },

  resolve: {
    extensions: ['.ts', '...'],
  },
};
