const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: []
  },
  plugins: [
    // 每次build的时间清掉旧的dist文件夹
    new CleanWebpackPlugin(['dist/'], {
      // Absolute path to your webpack root folder (paths appended to this)
      // Default: root of your package
      root: path.resolve(__dirname, '../'),
      // 打印到控制台（默认就是true）
      verbose: true,
    })
  ]
});