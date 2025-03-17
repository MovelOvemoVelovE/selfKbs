---
theme: vuepress
---
# loader
loader是对源码进行转换预处理的工具。如ts转换js、js内引入css等。

## 执行顺序

loader顺序分类有四种：

- pre：前置
- normal: 默认
- inline： 内联
- post： 后置

> 通过设置`Rule.enforce`设置级别   
> 同级别loader遵从从右到左、从下到上执行   
> 不同顺序分类执行为 `pre => normal => inline => post`

```js
// 执行顺序为 loader1 => loader2
module: {
    rules: [
        {
            enforce: 'post',
            test: /\.js$/,
            loader: 'loader2'
        },
        {
            enforce: 'pre',
            test: /\.js$/,
            loader: loader1
        }
    ]
}
```

### inline loader
内联loader是引入资源时规定loader的使用。如：
```js
// 普通引入资源
import myStyle from '.style.css'
// 使用内联loader
import style from 'style-loader!css-loader!modules!../styles/file.css'
// 使用前缀
import style from '!style-loader!css-loader!modules!../styles/file.css'
import style from '-!style-loader!css-loader!modules!../styles/file.css'
import style from '!!style-loader!css-loader!modules!../styles/file.css'
```
以上内联：
- 使用`sytle-loader`和`css-loader`对资源`file.css`进行处理
- 使用`!`串联loader以及 将loader和资源分割开
- 使用前缀选择**跳过**哪些loader
    - `!` 跳过normal
    - `-!` 跳过normal 和pre
    - `!!` 跳过pre、normal、post

## 第一个loader

loader是一个**模块默认导出的函数**，如果配置在Rule内，那么就会调用这个函数。   
文件需要设置默认导出(module.exports), 函数接受三个参数且必须返回内容
```js
module.exports = function(fileContext, sourceMap, meta){
  console.log('welcome to my first loader', fileContext, sourceMap, meta)
  return fileContext
}
```

## 分类

根据loader文件内处理的方式、**同异步**、**返回的数据格式**、**前置守卫**不同分为四类：
- sync-loader
- async-loader
- raw-loader
- pitching-loader

### syncLoader
同步loader有两种写法。callback写法是为了给下个loader传递参数、sourcemap等
```js
//  asyncLoader
module.exports = function(fileContext, sourceMap, meta){
  /** ....someHandle  */
  // 第一种写法，操作完成后直接转换
  return fileContext
  // 第二种写法，传递参数给下一个
  // 第一个参数为是否有错误
  this.callback(null, fileContext, sourceMap, meta)
}
```
### asyncLoader
> `const callback = this.async()`   

异步loader调用callback来返回。   
所有涉及异步操作的loader必须使用这个方法。否则不等待这个loader执行完成而直接调用下一个loader，会导致报错。
```js
module.exports = function(fileContext,sourceMap,meta){
  // 获取异步操作的回调函数
  const callback = this.async()
  // 只有调用callback方法才回执行下一项
  setTimeout(() => {
    callback(null, fileContext, sourceMap, meta)
  }, 1000)
}
```
### rawLoader
rawLoader就是在module.exports导出后，需要设置一个属性raw为true。    
使传递过去的数据为**buffer数据**。
```js
module.exports.raw = true
```
### pitchingLoader

pitchingLoader就是需要给module.exports设置一个pitch方法。

> **这个方法在Rule的所有loader数组中，查找并依次执行。 且在loader执行之前执行**   
> 也就是说`use: [loader1, loader2]`中会先执行`loader1`的`pitch`然后`loader2`的`pitch`，所有`pitch`执行完成后，执行`loader2`，执行`loader1`   
> **pitch方法return，后面pitch不会执行，熔断执行**

## loader api

更多api：[webpack Loader api](https://webpack.docschina.org/api/loaders/#example-for-the-loader-context)


| 方法 | 描述 |
| --- | --- |
| this.async() | 异步回调函数 |
| this.getOptions(schema) | 获取loader配置的option |
| this.emitFile(name, context, sourcemap) | 产生一个文件 |
| this.utils.contextify(context, request) | 返回一个相对路径 |
| this.utils.absolutify(context, request) | 返回一个绝对路径 |

## 手写clean-log-loader
实现简单babel
> 新建loader的js文件，configJs内使用loader。
```js
// loaders/clean-log-loader.js
module.exports = function(fileContext){
  let res = fileContext.replace(/console\.log\(.*\);?/g, '')
  return res
}
//  webpack.config.js
{
    test: /\.js$/,
    // loader: path.resolve(__dirname, 'loaders/test-loader.js')
    loader: './loaders/clean-log-loader.js'
  }
```
## babel-loader
实现简单babel：
> 第一步 新建`babel-loader`文件夹，内有`babel-loader.js`   
> 第二步 在`config.js`内设置`loader`,并传入`options`   
> 第三步 想要获取配置`options`需要传入`json`的`schema`校验规则，编写`schema.json`代码   
> 第四步 编写loader代码

```js
// config.js
{
    test: /\.js$/,
    loader: './loaders/babel-loader/babel-loader.js',
    // 负责传递的参数，需要满足JSON schema规则
    options: {
      presets: ['@babel/preset-env']
    }
}
// json获取options的规则
// schema.json
{
  "type": "object",
  "properties": {
    "presets":{
      "type": "array"
    }
  },
  "additionalProperties": true
}
// 编写loader
// babel-loader.js
const babel = require('@babel-core')
const schema = require('./schema.json')

module.exports = function(context){
  const callback = this.async()
  const options = this.getOptions(schema)

  babel.tranform(context, options, function(err, result){
    if(err)callback(err)
    else callback(null, result.code)
  })
}

```
> 期待手写一个loader, 有用的loader....

