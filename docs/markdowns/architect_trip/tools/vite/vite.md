---
theme: vuepress
highlight: vs2015
---

> vite官网: [Vite 官方中文文档 (vitejs.cn)](https://vitejs.cn/vite3-cn/guide/)    
>
> 了解下就得了 

# 了解

Vite是使用ESbuild预构建依赖、ESM原生提供源码、Rollup打包构建。

# 搭建环境

```bash
# 安装
npm create vite@latest
# 进入目录
cd projectDir
# 安装依赖
npm i
# 运行项目
npm run dev
```
---

**值得注意的是：**   

- **index.html** 在根目录下, Vite将其视为源码和模块图的一部分 
    - 不需要`%PUBLIC_URL%`占位符

- vite有 **根目录** 的概念，源码的绝对路径都是根据 **root目录**作为基础来解析

- `vite server some/dir/html` 替换掉当前根目录

# 功能篇

基础应用在vite和静态文件服务器没有区别，但是vite对ESM原生导入提供了增强了 用于打包的功能。

## npm依赖

可以裸模块导入(这是原生ES不支持的)

```js
import { deepClone } from 'lodash'
```

> 1. vite用**esbuild 预构建依赖**： 加快了冷启动时间    
> 1. 导入路径重写为合法URL:`/node_modules/lodash`    


## HMR

vite在初始化预先配置HMR功能

## ts

推荐**仅含类型的导入、导出**语法避免潜在**仅含类型导入打包不正确**的问题

## 其他支持

JSX、vue、css、JSON、静态资源等都默认可以使用具名引入等功能的支持。


## Glob导入

> Glob导入是vite特有功能， 使用的是[fast-glob库](https://github.com/mrmlnc/fast-glob)实现。    
> `import.meta.glob`参数必须都为字符串字面量， 不可以是变量、表达式

`import.meta.glob` 都支持以字符串形式导入文件。

```js
const modules = import.meta.glob('./dir/*.js')
for (const path in modules) { 
    // 默认导入文件是懒加载
    modules[path]()
    .then((mod) => { console.log(path, mod) }) 
}
```

默认导入文件是动态导入，懒加载。如果想取消可以设置第二个参数：

```js
const modules = import.meta.glob('./dir/*.js', { eager: true })
```

第一个参数可以是数组，多个匹配模式来导入文件。

## 自带优化

vite自带了cssChunk、预加载指令(`<link rel="modulepreload" />`)、异步chunk加载优化(异步chunk使用共享chunk**同步加载**)

# 插件

```js
$ npm add -D @vitejs/plugin-legacy

export default defineConfig({
  plugins: [
    vue(),
    {
      ...legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      // 同webpack-loader设置 排序插件
      enforce: 'post',
      // Conditional load
      apply: 'build', // build or serve
    }
  ],
})
```

# 依赖预构建

> 预构建旨在加速开发环境的冷启动。

vite会将预构建的依赖缓存在 **文件系统**和 **浏览器缓存**。

## 文件系统

将依赖缓存到`node_modules/.vite`文件夹。

当 **package.json的dependencies依赖发生变化**、**修改vite.config.js** 需要 **重启服务**

如果强制重新构建则删除掉缓存文件夹。

## 浏览器

解析后的缓存以HTTP头进行强缓存`max-age=31536000,immutable`   

本地调试依赖可以通过: **浏览器的network禁用缓存、 重启服务添加`--force`、重新载入页面**来**更新**构建依赖

# 静态资源处理

导入预期外的其他静态资源比如：[Houdini.how](https://houdini.how/usage/),可以加`?url`后缀

```js
import workletURL from 'extra-scalloped-border/worklet.js?url'
CSS.paintWorklet.addModule(workletURL)
```

---

**其他后缀**

| 后缀 | 作用 |
| --- | --- |
| `?row` | 作为字符串引入 |
| `?worker`或`?shareworker` | 导入为web worker |

## URL()

使用`new URL()`和 `import.meta.url`(当前模块的url)的ESM原生api.

```js
const imgUrl = new URL('./cat.png', import.meta.url).href
<img :src="imgUrl">
// 这样也可以
function getImageUrl(name) { 
    return new URL(`./dir/${name}.png`, import.meta.url).href 
}
```

> nodejs、ssr不可以这样，环境不同`.meta`意义也不同

# 环境变量

内置变量:

| 变量 | 意义 |
| --- | --- |
| `import.meta.env.MODE: string` | 当前模式 |
| `import.meta.env.BASE_URL: string` | 基本URL |
| `import.meta.env.PROD: boolean` | 是否为生产 |
| `import.meta.env.DEV: boolean` | 是否为dev |
| `import.meta.env.SSR: boolean` | 是否为ssr |

> 默认`VITE_`前缀才会暴露, 也可以配置`envPrefix： string[] | string`
>
> 环境变量过多需要可能需要ts类型提示，`vite-env.d.ts`中可以设置
> ```js
> interface ImportMetaEnv { 
>    readonly VITE_APP_TITLE: string
>     //...
> }
> interface ImportMeta { 
>    readonly env: ImportMetaEnv 
> }
> ``` 

# 常用配置

> [共享配置 | Vite 官方中文文档 (vitejs.cn)](https://vitejs.cn/vite3-cn/config/shared-options.html#define)

常用配置文件在[vite.config.ts](../../../configJs/#vite-config-ts)中