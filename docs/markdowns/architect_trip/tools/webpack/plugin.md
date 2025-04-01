---
theme: vuepress
---
# plugin原理

开发plugin就是在webpack编译过程中，会触发`Tapable`钩子。 插件则是在对应钩子上注册事件，从而在对应的生命周期插入自己的逻辑，达到某些操作

# Tapable

Tapable为webpack是webpack核心功能库。 Tapable统一暴露3个方法给插件使用，用于注入不同的自定义行为：
- `tap`： 注册同异步钩子
- `tapAsync`： callback的方式注册异步钩子
- `tapPromise`： promise的方式注册异步钩子

# plugin构建对象
自定义plugin最重要的两个对象：
> webpack构建过程流水线是由compiler对象来贯穿，大概可以分为以下几个步骤依次执行：   
> 1. webpack开始构建，首先创建`compiler`对象，然后调用`compiler.hooks.environment()`钩子函数(在编译器准备环境时调用，时机就在配置文件中初始化插件之后)
> 2. `compiler`钩子开始依次执行
> 3. 执行到`compiler.hooks.compile()`创建`compilation`对象
> 4. 而后执行到`compiler.hooks.make()`(会在compilation执行结束之前执行)，这时会开始执行`compilation`的一整套流程
> 5. `compilation.hooks.buildModule()`开始执行
> 6. `compilation.hooks.seal()`执行结束
> 7. `compiler`对象继续执行自己的剩余生命周期钩子直到`shundown()`执行完毕，构建过程结束。
## compiler

1. compiler对象有webpack完整的配置，每次启动都会创建且只会创建一次compiler对象。   
2. 在compiler对象上可以访问webpack的主环境配置，比如loader、plugin等。
3. 有以下的主要属性
    - `compiler.options`: 本次启动webpack的所有配置文件
    - `compiler.inputFileSystem`和`outputFileSystem`进行文件操作
    - `compiler.hooks`注册`tapable`的hook，在生命周期植入逻辑
> [compiler 钩子 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/api/compiler-hooks/)
## compilation

1. compilation对象代表**一次**资源的构建，例如多入口等则会有多个compilation对象
2. compilation对象对构建依赖图中的所有模块访问、编译。编译期间资源会被加载(load)、封存(seal)、优化(optimize)、分割(chunk)、哈希(hash)、重新创建(restore)
3. compilation有以下主要属性：
    - `compilation.modules`： 访问所有模块
    - `compilation.chunks`：多个modules组成的代码块
    - `compilation.assets`：本次打包生成所有文件的结果
    - `compilation.hooks`： 注册Tapable钩子

>[compilation 钩子 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/api/compilation-hooks/)

# 创建plugin
> 一个插件模版包含：
> -   一个 JavaScript 命名函数或 JavaScript 类。
> -   在插件函数的 prototype 上定义一个 `apply` 方法。
> -   处理 webpack 内部实例的特定数据。
> -   功能完成后调用 webpack 提供的回调。

```js
/**
 * 1. 配置好webpack.config.js中的插件 通过new TestPlugin()
 * 2. 编译时执行construcor
 * 3. 遍历所有插件并调用apply方法
 * 当执行npx webpack时候 则会依次打印
 */
class TestPlugin {
  constructor(){
    console.log('testPlugin constructor')
  }
  apply(compiler){
    console.log('apply')
  }
}
module.exports = TestPlugin
```
---
**配置`webpack.config.js`:**

```js
const TestPlugin = require('./plugins/test-plugin')
plugins: [
    new TestPlugin()
],
```
# 注册hooks

> 根据官方文档的钩子名下方的hook分类，来选择不同注册方式。
> 如：
> - `compiler.hooks.run()`为AsyncSeriesHook，则三种注册方式都可以
> - `compilation.hooks.seal()`为SyncHook，则只能用`compilation.hooks.seal.tap()`注册

```js
apply(compiler){
    console.log('apply')
    compiler.hooks.emit.tap('TestPlugin', (compilation) => {
      console.log('emit')
      compilation.hooks.seal.tap('TestPlugin', () => {
        console.log('seal')
      })
    })
    compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
      console.log('emitAsync')
      callback()
    })
    compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
      console.log('emitPromise')
      return new Promise((resolve, reject) => {
        resolve()
      })
    })
}
```
