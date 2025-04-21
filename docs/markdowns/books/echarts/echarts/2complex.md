# 一、色彩搭配

一份可视化作品，通过合适的色彩搭配更能满足可视化需求。 也就有**喜庆红、科技蓝**。

## 1. 色彩主题

官网下载，选择主题下载跳转到主题下载页面。

Echarts 提供了很多可选的主题，包括了: `vintage`、`macarons`、`infographic`、`shine`、`dark`、`light`、`roma`、`walden`、`pictorial`、`essos`、`westeros`。

:::tip

多引入**主题 js**, 那么就可以使用主题。

```html
<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.2/dist/theme/macarons.js"></script>
```

:::

## 2. 自定义主题

官网提供了自定义主题的设置工具页面， 通过改变颜色、字体、边框等属性， 生成主题的 json 文件并且**下载即可**

[自定义主题设置工具](https://echarts.apache.org/examples/zh/editor.html?c=doc-example/theme-custom)

# 二、带有时间轴的复杂动态可视化案例

本章是介绍 echarts 优势之一的 **带有时间轴**的复杂**动态**可视化。

一个图表对于数据的可视化，最重要的是要**动态**，也就是**时间轴**。

随着时间推移，数据的变化，图表也会随之变化。

我们做一个随着时间价格不断递增来不断变化的图表.

## 1. 准备数据

数据的准备是可视化的第一步， 也是需要构建的一步。

```js
var rankData = [
  {
    date: "2023-03-14",
    category: "2023-03-14",
    data: [
      { name: "剑姬", value: 4823 },
      { name: "诺手", value: 3765 },
      { name: "鳄鱼", value: 2948 },
      { name: "青钢影", value: 1832 },
      { name: "武器大师", value: 927 },
    ],
  },
  {
    date: "2023-03-13",
    category: "2023-03-13",
    data: [
      { name: "剑姬", value: 4210 },
      { name: "诺手", value: 3128 },
      { name: "鳄鱼", value: 2457 },
      { name: "青钢影", value: 1345 },
      { name: "武器大师", value: 789 },
    ],
  },
  {
    date: "2023-03-12",
    category: "2023-03-12",
    data: [
      { name: "剑姬", value: 3654 },
      { name: "诺手", value: 2789 },
      { name: "鳄鱼", value: 1987 },
      { name: "青钢影", value: 1023 },
      { name: "武器大师", value: 543 },
    ],
  },
  {
    date: "2023-03-11",
    category: "2023-03-11",
    data: [
      { name: "剑姬", value: 2987 },
      { name: "诺手", value: 1987 },
      { name: "鳄鱼", value: 1234 },
      { name: "青钢影", value: 765 },
      { name: "武器大师", value: 432 },
    ],
  },
  {
    date: "2023-03-10",
    category: "2023-03-10",
    data: [
      { name: "剑姬", value: 1876 },
      { name: "诺手", value: 1345 },
      { name: "鳄鱼", value: 876 },
      { name: "青钢影", value: 543 },
      { name: "武器大师", value: 321 },
    ],
  },
];
```
