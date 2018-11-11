const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      // use里的loader执行顺序为从下到上，loader的顺序要注意
      // {
      //   test: /\.css$/,
      //   use: [
      //     {loader: 'style-loader'},
      //     {loader: 'css-loader'},
      //     {loader: 'postcss-loader'}
      //   ]
      // },
      // 这里检测到less文件后需要将后续处理loader都写在此use里，不能说先用less-loader转
      // 成css，然后让它走/\.css/里的use
      {
        test: /\.l?(c|e)ss$/,
        use: [
          // {loader: 'style-loader'},
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'less-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      // es6 polyfill 具体配置在根目录 .babelrc文件里，配置是babel-preset-env在处理，；也可以不配置，用它的默认配置，这样用它就没啥意义了
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // 拓展：http://www.cnblogs.com/ghost-xyx/p/5812902.html
      // 处理图片
      // 需要安装（-D）file-loader，url-loader依赖file-loader
      {
        test: /\.(png|jpg|jfif|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 低于这个limit就直接转成base64插入到style里，不然以name的方式命名存放
              // 这里的单位时bit
              limit: 8192,
              name: 'static/images/[hash:8].[name].[ext]'
            }
          }
        ]
      },
      // 字体图标啥的，跟图片分处理方式一样
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      // 以单文件组件 (SFCs)的格式撰写 Vue 组件通过它解析
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 对js和vue文件使用eslint-loader进行处理，并排除了/node_modules/目录中的文件，并利用enforce字段指明，
      // 该loader是进行预处理的loader，先对指定文件进行eslint后才会执行babel编译。
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        // 预处理
        enforce: 'pre',
        include: [path.join(__dirname, '..', 'src')]
      }
    ]
  },
  plugins: [
    // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
    // 例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
    new VueLoaderPlugin(),
    // 生成一个新的index.html,将打包生成的js,css自动引入
    new HtmlWebpackPlugin({
      // 默认true
      // When passing true or 'body' all javascript resources will be placed at the bottom of the body element.
      // 'head' will place the scripts in the head element
      // will inject the main bundle to index.html
      inject: true,
      // 作为title插入新生成的 .html中
      title: 'HtmlWebpackPlugin 生成的',
      // 模板路径
      template: path.resolve(__dirname, 'index.html'),
      // 默认index.html
      filename: 'index.html'
    }),
    // 将一些不太可能改动的第三方库单独打包，会通过缓存极大提升打包速度
    new AutoDllPlugin({
      // will inject the DLL bundle to index.html
      // default false
      inject: true,
      debug: false,
      filename: '[name]_[hash].js',
      path: 'static',
      entry: {
        // [name] = vue, 在这里会将entry里的每个item(vue,jquery)都打包成一个js
        vue: [
          'vue',
          'vue-router'
        ]
        // [name] = jquery
        // jquery: [
        //   'jquery',
        //   'jquery-from'
        // ]
      }
    }),
    // 提取共同js代码，与AutoDllPlugin功能几乎一样，但是这项是针对我们自己写的一些公共js，在分thunk时会很有用
    new webpack.optimize.SplitChunksPlugin(),
    // 将css提取到一个文件
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[name].[hash].css'
    })
  ],
  resolve: {
    alias: {
      // 配置别名'vue$'，不然import 'vue'时，webpack找不到
      'vue$': 'vue/dist/vue.esm.js',
      // 这个为src配置别名，非必需，为方便而已
      '@': path.resolve(__dirname, '../src')
    },
    // 在import这些拓展名的文件时，可以省略拓展名
    extensions: ['*', '.js', '.json', '.vue']
  }
}
