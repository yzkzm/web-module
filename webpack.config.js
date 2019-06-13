const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const entry = require('webpack-glob-entry')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
module.exports = {
  entry: entry('./src/assets/css/*.scss', './src/assets/css/*.css', './src/app.js', './src/assets/js/*.js'),
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: []
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FixStyleOnlyEntriesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      filename: 'yinli.html',
      template: path.resolve(__dirname, 'src/yinli.html')
    }),
    new ExtractTextPlugin({
      filename: getPath => {
        console.log(getPath('css/[name].css'))
        return getPath('css/[name].[hash].css').replace('css/app', 'css/app')
      },
      allChunks: true
    })
  ],
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0'
  }
}
