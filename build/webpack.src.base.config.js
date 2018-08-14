const path = require('path');
const webpack = require('webpack');
const packageJosn = require('../package.json');
const noDevelop = process.env.NODE_ENV !== 'develop';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
          outputPath: 'styles/',
          publicPath: noDevelop ? '/boss-ui/dist/' : '/dist/'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.join(__dirname, '../node_modules')]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${packageJosn.version}'`
    })
  ],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  }
};
