module.exports = {
  // 我们要用的postcss插件在这儿配置
  plugins: [
    // 可以指定兼容程度
    require('autoprefixer')({
      // 中文博客：https://segmentfault.com/a/1190000008030425
      // browser参数/数据：https://browserl.ist/
      // browserslist：https://github.com/browserslist/browserslist
      "browsers": [
        "defaults",
        "not ie < 9",
        "last 2 versions",
        "> 1%",
        "iOS 7",
        "last 3 iOS versions"
      ]
    })
  ]
}