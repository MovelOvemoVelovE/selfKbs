const os = require('os');
const path = require('path');
// 兼容性处理
// 全部引入
// import 'core-js'
// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css提取
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// js压缩
const TerserPlugin = require('terser-webpack-plugin');
// preload
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

const threads = os.cpus().length // cpu核数

// 设置样式加载函数
function setStyleLoader(pre){
  return [ 
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
            ],
          ],
        },
      },
    },
    pre
  ].filter(Boolean)
}

module.exports = {
  // 入口
  entry: {
    app: './src/main.js'
  },
  // 输出
  output: {
    path: path.resolve(__dirname, '../dist'),
    //入口文件打包的目录/文件名
    filename: 'static/js/[name].js',
    // 打包输出的其他文件命名
    // chunkFileName: 'static/js/[name].chunk.js',
    //静态资源目录
    // assetModuleFilename: 'static/imgs/[name].[hash:6][ext][query]'
    // 清空path中上次打包结果
    clean: true,
  },
  // loader
  module: {
    rules: [
      {
        test: /\.css$/i, // 只检测.css文件
        use: setStyleLoader()
      },
      {
        test: /\.less$/,
        use: setStyleLoader('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: setStyleLoader('sass-loader')
      },
      {
        test: /\.(png|jpg?e|gif|svg|jpeg|webp)$/,
        type: 'asset', //会转化成base64
        parser: {
          dataUrlCondition: {
            // 10kb以下的图片，直接转base64
            // 优点：减少http请求次数 缺点：体积会变大
            maxSize: 10 * 1024, // 10kb
          }
        },
        // 生成图片的路径
        generator: {
          // [hash:10] 10位的hash值 [ext] 后缀名 [query] query参数
          filename: 'static/imgs/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?|eot|map3|mp4|avi)$/,
        type: 'asset/resource', //资源类型,不转换base64
        generator: {
          filename: 'static/media/[hash:10][ext][query]'
        }
      },
      {
        test: /\.js$/,
        // exclude: /node_modules/, // 排除node_modules目录下的文件
        include: path.resolve(__dirname, '../src'), // 匹配src目录下的文件
        // loader: 'babel-loader',
        // babel-loader的配置 在babel.config.js中配置
        // options: {
        //   // presets: ['@babel/preset-env'],
        //   cacheDirectory: true, //  缓存编译结果
        //   cacheCompression: false, // 不压缩
        // },
        use: [
          {
            loader: 'thread-loader', // 多线程编译
            options: {
              workers: threads, // cpu核数
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, //  缓存编译结果
              cacheCompression: false, // 不压缩
              plugins: ['@babel/plugin-transform-runtime'] // 减少babel代码体积
            }
          }
        ],
      }
    ]
  },
  // 优化配置项
  optimization:{
    // 代码分割
    splitChunks: {
      chunks: 'all', // 代码分割 有all、initial、async
      /**以下都为可配置的默认值： */
      // minSize: 20000, // 代码分割的最小体积
      // minRemainingSize: 0, // 类似minSize的配置，当分割后的代码体积小于minRemainingSize时，不进行分割。
      // minChunks: 1, // 至少被引用的次数
      // maxAsyncRequests: 30, // 最大异步请求文件数不超过30kb
      // maxInitialRequests: 30, // 最大初始请求文件数不超过30kb
      // enforceSizeThreshold: 50000, // 超过50kb的模块，强行会被拆分。(忽略 minRemainingSize maxAsyncRequests maxInitialRequests)
      // cacheGroups: {  // 哪些模块打包到哪些组的配置
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10, // 权重
      //     reuseExistingChunk: true,
      //   },
      //   default: { // 默认组
      //     minChunks: 2, // 当前组配置覆盖上面的minChunks
      //     priority: -20, // 权重
      //     reuseExistingChunk: true, // 复用已有的chunk
      //   },
      // },
      cacheGroups: {
        // 覆盖默认值
        default:  {
          minSize: 0, // 所有文件都代码分割
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    },
    minimizer:[
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserPlugin({
        parallel: threads, // 并行压缩
      })
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 模板基础模板
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      // 插入到body标签中
      inject: true,
      // 插入到body标签中的位置
      // body: 'end'
    }),
    new MiniCssExtractPlugin(
      {
        // 文件名
        filename: 'static/css/[name].[contenthash:8].css',
        // 分块文件名
        chunkFilename: 'static/css/[name].[contenthash:8].css'
      }
    ),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script'
    }),
    // 压缩操作放在 optimization中
    // new CssMinimizerPlugin()
    // new TerserPlugin({
    //   parallel: threads, // 并行压缩
    //   sourceMap: true, // 压缩后生成map文件
    //   terserOptions: {
    //     compress: {
    //       // 压缩选项
    //       drop_console: true, // 去掉console
    //       drop_debugger: true, // 去掉debugger
    //     },
    //   },
    // })
  ],
  // 模式
  mode: 'production',
  // 生产模式安全性可不打包
  devtool: 'source-map'
}