---
next:
  text: '快速开始'
  link: '/markdowns/architect_trip/nodejs/quickstart/Buffer.md'
---

作为一名前端，不管是**工程化**、**构建工具**、**浏览器引擎**、**工作脚本**等等都离不开nodejs, 可以说前端进入全栈的第一步。

最简单的例子：

这次文档，由于设置`sidebar`需要手动配置很多路径，就可以使用`nodejs`读取文件列表映射到`sidebar`路径。

又或者项目实行`i18n`国际化，`nodejs`可以批量替换文件内容，可以快速实现多语言。

又或者工作中需要写的**日报**、**周报**、**月报**、**年报**，我们可以根据`git`提交记录信息，来迅速生成，最后通过`AI`工具润色完成。

还有就是作为服务端语言！

::: tip node特性

- **nodejs是开源的、跨平台的js运行环境**
- 由于nodejs和浏览器没有关系，是不具备BOM和DOM的api的。   
- nodejs的顶级对象为`global`, 由于ES2020定义了新的全局对象`globalThis`(推荐使用`globalThis`)
- nodejs内可以使用`console`和`定时器`

:::

那么就[快速开始](./quickStart/Buffer.md)吧