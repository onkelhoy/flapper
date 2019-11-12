const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  entry: './frontend/source/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.s?css/,
        use: ['style-loader', 'sass-loader', 'node-sass', 'css-loader']
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve('./frontend/bundle'),
    publicPath: '/bundle',
    filename: 'index.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: process.env.FRONTEND_SERVER_PORT,
    publicPath: `http://localhost:${process.env.FRONTEND_SERVER_PORT}/bundle`,
    hotOnly: true,
    proxy: {
      '/api': {
        target: `http://[::1]:8080`,
        changeOrigin: true,
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};