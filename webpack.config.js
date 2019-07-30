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
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ],
          publicPath: '../'
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
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          publicPath: '../'
        }),
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/swiper')]
        // exclude: /node_modules\/(?!(swiper)\/).*/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-withimg-loader'
          }
        ]
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
    new ExtractTextPlugin({
      filename: getPath => {
        return getPath('css/[name].[hash].css').replace('css/app', 'css/app')
      },
      allChunks: true
    })
  ],
  devServer: {
    contentBase: './dist',
    port: '8091'
  }
}
