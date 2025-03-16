# 简介

1. `.vitepress/config.js`可以配置站点的各个方面
2. 基于**文件**的**路由**
3. 两个重要的概念：**项目根目录**和**源目录**。
4. 根目录是`.vitepress`所在的目录，如果`docs/.vitepress`，那`docs`就根目录。
5. 源目录是 Markdown 源文件所在的位置
6. 默认解析为`.html`结尾的URL，不想要的话开启`cleanUrls: true`

## 动态路由

单个md和动态数据可以生成多个页面

1. 创建`packages/[pkg].md`
2. 创建`packages/[pkg].paths.js`
3. 通过`$params`获取当前页面参数
4. 也通过`useData()`hooks获取

```js
export default {
  // 多参数
  paths: () => [
    { params: { pkg: 'foo', version: '1.0.0' }},
    { params: { pkg: 'foo', version: '2.0.0' }},
    { params: { pkg: 'bar', version: '1.0.0' }},
    { params: { pkg: 'bar', version: '2.0.0' }}
  ]
}
// 文件动态生成
import fs from 'fs'
export default {
  paths() {
    return fs
      .readdirSync('packages')
      .map((pkg) => {
        return { params: { pkg }}
      })
  }
}
```

# 部署

1. 站点存在于子服务`xxx.com/docs/`, 配置`base`为`/docs/`
2. 运行`npm run docs:build`
3. 

# 写作

## markdown

#### 链接

```md
**内部链接**
[Home](/) <!-- 将用户导航至根目录下的 index.html -->
[foo heading](./#heading) <!-- 将用户锚定到目录 foo 下的index文件中的一个标题上 -->
[bar - three](../bar/three) <!-- 可以省略扩展名 -->
[bar - three](../bar/three.md) <!-- 可以添加 .md -->
[bar - four](../bar/four.html) <!-- 或者可以添加 .html -->
**外部链接**
[baidu](www.baidu.com){target="_blank", rel="noreferrer"}
```

#### formatter

```md
---
title: Blogging Like a Hacker
lang: en-US
---
```

#### Emoji

```md
:rocket:
```

#### 自定义容器

```md
::: info tip warning danger details
This is an info box.
:::
```
#### github风格容器

```md
> [!NOTE] [!TIP] [!WARNING] [!IMPORTANT] [!CAUTION]
> 强调重要信息、 建议、风险、至关重要、负面影响
```

#### 行高亮

````
```js{3}
export default {
  data() {
    return {}
  }
}
```
````


#### 行聚焦/颜色差异

````
```js{3}
export default {
  data() { // [!code focus]
    msg: 'Removed' // [!code --]
    msg: 'Added' // [!code ++]
    msg: 'warning' // [!code warning]
    msg: 'error' // [!code error]
  } 
}
```
````

#### 导入代码块

````
```md
<<< @/snippets/snippet.js{2}
```
````

#### 代码tab标签页

````
```md
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}
export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'
const config: UserConfig = {
  // ...
}
export default config
```

:::
```
````

#### 内嵌md文件

````
````md
# Docs

## Basics

<!--@include: ./parts/basics.md{3,}-->
```
````

## 资源处理

#### 引用静态资源

```md
![VitePress](/images/vitepress.png)
```

# 配置

```js
export default defineConfig({
  // 配置markdown扩展
  markdown: {
    image: {
      lazyLoading: true
    },
    // 显示行号
    lineNumbers: true,
    // 配置容器
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
})
```

# 边界

### 查看icon列表

目录：`\node_modules\@iconify-json\simple-icons\icons.json`
