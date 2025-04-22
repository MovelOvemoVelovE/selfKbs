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

## 2. 定义静态配置

定义了数据，现在定义一些不会随着时间变化的静态配置。

主要包括了动画效果设置、时间轴设置、标题设置、网格设置、x 轴/y 轴设置、数据设置

```js
var option = {
  baseOption: {
    // 动画变化时间
    animationDurationUpdate: playInterval * 1.5,
    // 动画的缓动效果
    animationEasingUpdate: "quinticInOut",
    // 时间轴的相关参数
    timeline: {
      show: false, // 隐藏时间轴
      axisType: "category", // 类别型的类型
      orient: "vertical", // 垂直方向
      autoPlay: true, // 自动播放
      playInterval: playInterval, // 播放间隔时间
      // 组件距离容器左右上下侧的距离
      left: null,
      right: 30,
      top: 330,
      bottom: 100,
      // 时间轴的文字
      label: {
        normal: {
          show: true,
          color: "#ccc",
        },
      },
      checkpointStyle: {
        symbol: "none",
        color: "#bbb",
        borderColor: "#777",
        borderWidth: 1,
        show: false,
      },
      controlStyle: {
        showNextBtn: false,
        showPrevBtn: false,
        normal: {
          color: "#666",
          show: false,
          borderColor: "#666",
        },
        emphasis: {
          color: "#aaa",
          borderColor: "#aaa",
        },
      },
      data: rankData.map((ele) => {
        return ele.date;
      }),
    },
    title: [
      {
        left: "center",
        top: "3%",
        textStyle: {
          fontSize: 25,
          color: "rgba(121, 121, 121, 0.9)",
        },
      },
      {
        left: "center",
        top: "5%",
      },
    ],
    grid: [
      {
        left: "20%",
        right: "20%",
        top: "12%",
        bottom: "25%",
        height: "auto",
      },
    ],
    xAxis: [{}],
    yAxis: [{}],
    series: [
      {
        id: "bar",
        type: "bar",
        barWidth: "30",
        tooltip: { show: false },
        label: {
          normal: {
            show: true,
            position: "right",
          },
        },
        data: [],
      },
    ],
  },
  options: [],
};
```

## 3. 定义动态配置

配置`rankData`的数据项，也定义一些`title`和随着时间而变化的颜色， 属于自定义的半动态配置

```js
var title = "商品累计销量情况"; // 标题
var playInterval = 1000; // 播放间隔时间
var colorListS1 = [];
var colors = [];
for (let i = 0; i < rankData.length; i++) {
  var colorListF1 = {};
  for (let n = 0; n < rankData[i].data.length; n++) {
    var name = rankData[i].data[n].name;
    colorListF1[name] = colors[n];
  }
  colorListS1[i] = colorListF1;
}
```

## 4. 动态 push 数据到 option 数组

现在只需要将数据通过循环的方式来将数据加入到可视化模板代码中。

```js
var xMaxInterval = 5;
for (let i = rankData.length - 1; i > 0; i--) {
  var xMax = 20;
  if (rankData[i].data[0].value > 20) {
    xMax = "dataMax";
  }
  if (rankData[i].data[0].value / xMaxInterval >= 10) {
    xMaxInterval = rankData[i].data[0].value / 5;
  }
  option.options.push({
    backgroundColor: new echarts.graphic.LinearGradient(0.3, 0.3, 0.8, [
      {
        offset: 0,
        color: "#f7f8fa",
      },
      {
        offset: 1,
        color: "#cdd0d5",
      },
    ]),
    title: {
      text: title + " " + rankData[i].category,
      color: "#bfbfbf",
    },
    xAxis: [
      {
        show: true,
        type: "value",
        interval: xMaxInterval,
        max: xMax,
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "rgba(121, 121, 121, 0.9)",
          textStyle: {
            color: "rgba(121, 121, 121, 0.9)",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "rgba(121, 121, 121, 0.9)",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["rgba(121, 121, 121, 0.3)", "rgba(121, 121, 121, 0)"],
          },
        },
      },
    ],
    yAxis: [
      {
        show: true,
        type: "category",
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "rgba(121, 121, 121, 0.3)",
          },
        },
        data: rankData[i].data.map((ele) => {
          return ele.name;
        }),
      },
    ],
    series: [
      {
        id: "bar",
        itemStyle: {
          normal: {
            color: function (params) {
              var colorListr = [
                "#ff7f50",
                "#87cefa",
                "#da70d6",
                "#32cd32",
                "#6495ed",
                "#ff69b4",
                "#ba55d3",
                "#cd5c5c",
                "#ffa500",
                "#40e0d0",
              ];
              return colorListr[params.dataIndex];
            },
            label: {
              show: true,
              fontSize: 18,
              position: "top",
              formatter: "{c}%",
            },
            shadowBlur: 20,
            shadowColor: "rgba(40, 40, 40, 0.5)",
          },
        },
        label: {
          normal: {
            show: true,
            position: "right",
            formatter: (p) => {
              return p.name + " " + p.value;
            },
          },
        },
        data: rankData[i].data
          .map((ele) => {
            return ele.value;
          })
          .sort((a, b) => {
            return a > b;
          }),
      },
    ],
  });
}
```

逐步将全部代码复制，即可得到一个简易粗糙的动态可视化图表。
