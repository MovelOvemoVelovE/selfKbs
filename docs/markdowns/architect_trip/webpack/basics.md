---
theme: vuepress
---
> webpack是静态资源打包工具。
> 
> 打包工具可以编译框架、ES6、less等语法，可以压缩代码、兼容处理、性能优化。
> 
> docs: 
> - [webpack 中文文档](https://www.webpackjs.com/guides/getting-started)   
> - [深入浅出 Webpack](https://webpack.wuhaolin.cn/)
# 搭建环境

```bash
npm init -y
npm i webpack webpack-cli -D
# 直接打包查看效果
npx webpack ./src/main.js --mode=development
# 配置webpack.config.js后调用
npx webpack
```

---

# 核心概念

> ```js
> const path = require('path');
> module.exports = {
>   // 入口
>   entry: {
>     app: './src/main.js'
>   },
>   // 输出
>   output: {
>     path: path.resolve(__dirname, 'dist'),
>     filename: 'bundle.js'
>   },
>   // loader
>   module: {
>     rules: []
>   },
>   // 插件
>   plugins: [],
>   // 模式
>   mode: 'development'
> }
> ```

# 开发模式

> 开发模式侧重点: 编译代码、检查代码、定位错误、代码规范

## 输出

---

### 样式资源

```shell
npm i --save-D css-loader style-loader less less-loader sass-loader sass
import './styles/a.css'
```

```js
module: {
    rules: [
      {
        test: /\.css$/i, // 只检测.css文件
        use: [ 
          // 执行顺序从右到左
          'style-loader', //js中css创建并使用style标签
          'css-loader'  // 把css转换为js(commonjs)
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader', // 编译less文件
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader', // 编译scss文件
        ],
      },
    ]
  },
```

---

### 图片资源

> webpack5内置`file-loader`、`url-loader`

```js
{
  test: /\.(png|jpg?e|gif|svg|jpeg|webp)$/,
  type: 'asset', // 可转换base64
  parser: {
    dataUrlCondition: {
    // 10kb以下的图片，直接转base64
    // 优点：减少http请求次数 缺点：体积会变大
    maxSize: 10 * 1024, // 10kb
    }
  }
}
```

### 输出目录

> 修改资源输出目录有两种方式：
> 
> - `output.assetModuleFilename`
> 
> - `Rule.generator.filename`

```js
//静态资源目录
output: {
  assetModuleFilename: 'imgs/[name].[hash:6][ext]'
}
// 各个文件单独设置
rules: [
    {
        // 生成图片的路径
        generator: {
          // [hash:10] 10位的hash值 [ext] 后缀名 [query] query参数
          filename: 'static/imgs/[hash:10][ext][query]'
        }
    }
]
```

### 清空打包内容

> `output.clean = true` 清空path中上次打包结果

### 字体资源

```js
[
  {
    test: /\.(ttf|woff2?|eot)$/,
    type: 'asset/resource', //资源类型，不转化base64
    generator: {
      filename: 'static/media/[hash:10][ext][query]'
    }
  }
]
```

### 其他资源

> 在字体Rule内加入正则即可

```js
test: /\.(ttf|woff2?|eot|map3|mp4|avi)$/
```

### ES

> 代码规范及风格处理
> 
> 配置文件: `.eslint.config.js|mjs|cjs`

<mark>TODO: 学习ESlint</mark>

### babel

> js代码编译器
> 
> 配置文件：`babel.config.js|json` `.babelrc|.js|.json`

```shell
npm install -D babel-loader @babel/core @babel/preset-env
```

```js
{
   test: /\.js$/,
   exclude: /node_modules/, // 排除node_modules目录下的文件
   loader: 'babel-loader',
   // babel-loader的配置 在babel.config.js中配置
   // options: {
   //   presets: ['@babel/preset-env'],
   //   plugins: ['@babel/plugin-transform-runtime']
   // }
}
```

### html资源

打包后html自动引入js、css等文件。

> ```bash
> npm install --save-dev html-webpack-plugin
> ```

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
new HtmlWebpackPlugin({
    // 模板基础模板
   template: path.resolve(__dirname, 'public/index.html'),
   filename: 'index.html',
   // 插入到body标签中
   inject: true,
   // 插入到body标签中的位置
   // body: 'end'
}),
```

### 热加载

> ```bash
> npm i --save webpack-dev-server
> ```

```js
// 开发服务器不会打包
  devServer: {
    // 开发服务器配置
    host: 'localhost', // 开发服务器的域名
    port: 3000, // 开发服务器的端口
    hot: true, // 开启热加载
    open: true, // 开启浏览器自动打开
  },
// package.json {scripts.dev}
"dev": "webpack server --config ./config/webpack.dev.js",
```

# 生产模式

> 侧重点：提升运行性能、压缩体积

根目录下新增config文件，内有webpack.dev.js和webpack.prod.js两种模式。

这两个文件需要根据需求配置，需要注意的是由于创建了**根目录下文件**，所以所有的输出文件及插件路径都需要将**绝对路径变为`../`**

## css提取成单独文件

> 打包与js文件合并，动态创建style标签来处理css。
> 
> ```bash
> npm install --save-dev mini-css-extract-plugin
> ```

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
{
   test: /\.css$/i, // 只检测.css文件
   use: [ 
     // 'style-loader',
     // 使用插件loader替换掉style-loader
     MiniCssExtractPlugin.loader, // 把css提取到单独的css文件中
     'css-loader'  // 把css转换为js(commonjs)
   ]
}
plugins: [
   new MiniCssExtractPlugin(
      {
        // 文件名
        filename: 'static/css/[name].[contenthash:8].css',
        // 分块文件名
        chunkFilename: 'static/css/[name].[contenthash:8].css'
      }
    ) 
]
```

## css兼容性处理

> ```bash
> npm install --save-dev postcss-loader postcss
> ```

```js
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


rules: [
      {
        test: /\.css$/i, // 只检测.css文件
        use: setStyleLoader()
      },
      {
        test: /\.less$/,
        use: setStyleLoader('less-loader')
      }
]
```

```json
# package.json
 "browserslist": [
    "last 2 versions",
    "> 1%",
    "not dead"
  ]
```

---

## css压缩

> ```bash
> npm install css-minimizer-webpack-plugin --save-dev
> ```

```js
plugins: [
    new CssMinimizerPlugin()
  ],
```

# 高级配置

> 开发体验、打包构建速度、代码体积、性能优化配置

## SourceMap

> 报错信息行和列映射。 在打包后js映射为.js.map文件。

```js
// 开发模式
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', 
// 生产尽量不使用映射
  mode: 'production',
  devtool: 'source-map'
```

# 构建编译速度

### HotModuleReplacement

> 默认css的style-loader实现了hot，但是js没有默认开启，需要设置
> 
> vue、react-loader已经替我们实现了js的HMR

```js
// 开发服务器不会打包
  devServer: {
    hot: true, // 开启热加载(默认值)
  }
```

---

> js的HMR

```js
if(module.hot){
  module.hot.accept('./utils/init')
  module.hot.accept('./utils/math')
}
```

### oneOf

> `rules[0].oneOf:[]` 给Rules外层套一个属性即可。
> 
> 让一个loader匹配到后，就直接return掉。

### include和exclude

> js优化：编译不处理/只处理哪些文件

```js
{
  test: /\.js$/,
  // exclude: /node_modules/, // 排除node_modules目录下的文件
  include: path.resolve(__dirname, '../src'), // 匹配src目录下的文件
  loader: 'babel-loader',
  // babel-loader的配置 在babel.config.js中配置
  // options: {
  //   presets: ['@babel/preset-env'],
  //   plugins: ['@babel/plugin-transform-runtime']
  // }
}
```

### cache

> js优化：缓存Eslint、babel编译结果

```js
{
 test: /\.js$/,
 // exclude: /node_modules/, // 排除node_modules目录下的文件
 include: path.resolve(__dirname, '../src'), // 匹配src目录下的文件
 loader: 'babel-loader',
 // babel-loader的配置 在babel.config.js中配置
 options: {
     // presets: ['@babel/preset-env'],
     cacheDirectory: true, //  缓存编译结果
     cacheCompression: false, // 不压缩
 }
}
```

### Thead

> 多线程打包。
> 
> ```bash
> npm i -D thread-loader
> ```
> 
> - 在babel-loader(耗时最长loader)前配置loader。
> 
> - 配置`terser-webpack-plugin`parallel的配置

```js
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
   }
  }
],
```

```js
 optimization: {
    minimizer: [
      // 压缩js
      new TerserPlugin({
        parallel: threads, // 并行压缩
      })
    ]
  }
```
# 减少代码体积
## tree shaking
默认开启。
## babel
babel编译**每个文件**都提供**辅助函数**等，而是将辅助函数作为独立模块，每个文件去引用。
> 使用插件：   
> `npm i -D @babel/plugin-transform-runtime`

```js
{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true, //  缓存编译结果
      cacheCompression: false, // 不压缩,
      // 减少babel代码体积
      plugins: ['@babel/plugin-transform-runtime'] 
    }
}
```
## image minimizer
静态图片压缩[ImageMinimizerWebpackPlugin](https://webpack.docschina.org/plugins/image-minimizer-webpack-plugin/)

# 优化代码运行
## 代码分割(splitChunks)
> - 设置多入口文件
> - **多入口文件**有**复用**的公共模块。把**使用的模块分割**为单独模块后复用。
> - 单文件直接设置`module.exports.optimization.splitChunks.chunks = all `即可

`module.exports.optimization.splitChunks`内配置:
```js
optimization: {
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
  }
```
### 动态导入
事件或其他触发器内使用动态导入。   
`import('./module.js').then().catch()`    
### preload、prefetch
代码分割及动态导入可能造成卡顿情况，这时需要处理:   
- preload: 立即加载
- prefetch: 浏览器空闲时加载
> `npm i -S-D @vue/preload-webpack-plugin` 
```js
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

module.exports = {
    plugins: [
        new PreloadWebpackPlugin({
          rel: 'preload', // prefetch
          as: 'script' // rel=prefetch时无此属性。
        }),
}
```

## Network Cache
当a模块被b模块引入，a模块发生变化，b模块的bundle文件也会重新打包。**我们应该希望的是只有a模块被重新打包**
```js
// network cache
optimization.runtimeChunk: {
  name: true,
  filename: entryFile => `runtime_${entryFile.name}.js`,
},
```
## Core-js
corejs专门做ES6以上兼容性转化的`polyfill`。
> `npm i core-js`

```js
// 兼容性处理
// 全部加载
import 'core-js'
// 按需引入需要配置babel.cofig.js通过@babel/preset-env实现
module.exports = {
  presets: [
    [
      ['@babel/preset-env',{
        useBuiltIns: true, // 按需引入
        coreJs: '3.6.5',
      }],
    ],
  ]
}
```
## PWA 
渐进网络应用程序：提供**离线体验**
> `npm install workbox-webpack-plugin --save-dev`

```js
// PWA
const WorkboxPlugin = require('workbox-webpack-plugin');
plugins: [
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true, 
      skipWaiting: true, 
    }),
]
/* main.js入口等文件 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/dist/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
```
# 魔法命名

```js
import(/* webpackChunkName: 'md' */ './module.js').then().catch()
```
# config文件合并
开发环境、uat环境、生产环境配置等公共配置提取出来，通过merge注入进去即可。
> `npm install --save-dev webpack-merge`

```js
// webpack.common.js
module.exports = {
 // ...xxx
}
// webpack.dev.js | webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    // ...xxx
})
```

# 配置文件
## dev
```js
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
// PWA
const WorkboxPlugin = require('workbox-webpack-plugin');

const threads = os.cpus().length // cpu核数
module.exports = {
  // 入口
  entry: {
    app: './src/main.js'
  },
  // 输出
  output: {
    path: undefined,
    //入口文件打包的目录/文件名
    filename: 'static/js/[name].js',
    // 打包输出的其他文件命名
    // chunkFileName: 'static/js/[name].chunk.js',
    //静态资源目录
    // assetModuleFilename: 'static/imgs/[name].[hash:6][ext][query]'
    // 清空path中上次打包结果
    // clean: true,
  },
  // loader
  module: {
    rules: [
      {
        // 匹配规则
        oneOf: [
          {
            test: /\.css$/i, // 只检测.css文件
            use: [
              // 执行顺序从右到左
              'style-loader', //js中css创建并使用style标签
              'css-loader'  // 把css转换为js(commonjs)
            ]
          },
          {
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',
              'less-loader', // 编译less文件
            ],
          },
          {
            test: /\.s[ac]ss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader', // 编译scss文件
            ],
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
                  cacheCompression: false, // 不压缩,
                  plugins: ['@babel/plugin-transform-runtime'] // 减少babel代码体积
                }
              }
            ],
          }
        ]
      }
    ]
  },
  // 优化、压缩配置项
  optimization: {
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
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserPlugin({
        parallel: threads, // 并行压缩
      })
    ],
    // network cache
    runtimeChunk: {
      name: true,
      filename: entryFile => `runtime_${entryFile.name}.js`,
    },
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
      rel: 'preload', // prefetch
      as: 'script' // rel=prefetch时无此属性。
    }),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true, 
      skipWaiting: true, 
    }),
    // 压缩操作放在 optimization中
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
  // 开发服务器不会打包
  devServer: {
    // 开发服务器配置
    host: 'localhost', // 开发服务器的域名
    port: 3000, // 开发服务器的端口
    hot: true, // 开启热加载
    open: true, // 开启浏览器自动打开
  },
  // 模式
  mode: 'development',
  devtool: 'cheap-module-source-map',
}
```
## prod
```js
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
```
# 开发插件、loader



