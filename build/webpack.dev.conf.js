const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack')

module.exports = merge(baseConfig, {
  // 你需要设置开发模式(development mode)，来确保 bundle 是压缩过的(minified)
  mode: 'development',
  // source-map,将编译后的代码映射到原代码，便于报错后定位错误
  devtool: 'inline-source-map',
  // webpack-dev-server配置，相当于webpack的watch模块加了个浏览器刷新功能，更改后自动编译并刷新浏览器
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    // 自动打开浏览器访问
    open: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});