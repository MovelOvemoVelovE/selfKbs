---
title: Echarts基础
---

<script setup>

import Timeline from '@/demos/echarts/Timeline.vue'
import DataZoomSlider from '@/demos/echarts/DataZoomSlider.vue'

</script>

Echarts 是百度捐献给 Apache 的一个开源项目， 由 javascript 编写。

底层依赖轻量级的`ZRender`， 该库是一个轻量级的 canvas 渲染引擎。

Echarts 有哪些特性呢？

## 特性

### 1. 类型丰富

Echarts 除了折线图、柱状图、饼图等常见的图表外

支持自定义系列，扩展不同的图表。

### 2. 多种数据类型

4.0 以上版本除了二维表格数据外， 还支持键值对等

### 3. 大数据前端流畅

对千万级数据仍然可以流畅交互， 如缩放、平移。

对流加载的支持，可以使数据分块加载和渲染，用户体验更佳。

### 4. 动态数据动画

数据变化内部的动画变化来展现 新数据的可视化。

### 5. 提供 GL 三维

### 6. 跨平台

SVG 的渲染可以使 移动端无需担心内存， canvas 的 pc 可以展现大数据。 且适配小程序等。

### 7. 数据探索

提供图例、视觉映射等交互组件，让用户可以从总览到深度探索

### 8. 支持无障碍访问

## HighCharts

HighCharts 是一个商业化的图表库， 由 javascript 编写。

两者经常拿来对比，那么区别有什么？

- 图表种类些许区别
- HighCharts 是商业化的
- Highcharts 不持续 canvas 渲染， 只支持 SVG 渲染

# 安装&尝试

[echarts 安装](https://echarts.apache.org/handbook/zh/basics/import).

通过 npm 和 cdn 引入都是可以的。

新建一个 html 文件， body 替换为如下代码。

```html
<body>
  <div id="main" style="width: 600px; height: 400px"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.6.0/echarts.min.js"></script>
  <script src="main.js"></script>
  <script>
    var myCharts = echarts.init(document.getElementById("main"));
    var option = {
      title: {
        text: "ECharts Entry Example",
      },
      tooltip: {},
      legend: {
        data: ["各产品销量情况"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "牛仔裤", "皮衣", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20, 30],
        },
      ],
    };
    myCharts.setOption(option);
  </script>
</body>
```

## 官方文档

学习技术时，官网文档永远是第一选项。

在[echarts 官网](https://echarts.apache.org/zh/index.html)中。

顶部的文档`dropdown`中配置项手册里面有普通配置项、api、GL 配置。api 则是相当于字典。

顶部的资源`dropdown`的**术语速查手册**，可以鼠标悬停就看到是相关的哪些配置。 还有**表格工具**和**主题构建工具**帮助构建扩展等。

---

# 组件详解

在绘制数据可视化图表之前， 学习 Echarts 的相关组件和内容，为深入学习打好基础。

在官网的**术语速查手册**中，可以看到组件文档速查为**12 个组件**。 下面一个个了解并掌握这些基础知识。

:::tip

组件的配置项 attribute 很多，下面只是列出基础，作为了解。

在使用中，想要配置个性化，可以查询官网配置 api**作为字典**来查询使用。

:::

## 1. 标题

标题一般包括了主标题和副标题。

```js
var options = {
  title: {
    // 主标题 支持`\n`换行
    text: '我是主标题'，
    // 副标题 支持`\n`换行
    subtext: '我是副标题',
    // 距离左侧的距离： 像素值10； 百分比值10%； 还有left左对齐、center、right
    left: 'center', // 水平位置
  }
}
```

## 2. 提示框

tooltip 是鼠标悬停时的提示框， 合适时机向用户提供信息。

```js
var options = {
  tooltip: {
    // 提示框的触发方式： item(图形触发)、axis(坐标轴触发)、none
    trigger: "item",
    // 是否显示
    show: true,
    // 坐标轴指示器的配置项
    axisPointer: {
      // 坐标轴指示器的类型： line(直线)、cross(十字线)、shadow(阴影)
      type: "line",
    },
    // 提示框的格式化函数： function(params) { return params.name + ': ' + params.value; }
    formatter: function (params) {
      return params.name + ": " + params.value;
    },
    // 格式化不止可以是函数还可以使用模板字符串
  },
};
```

## 3. 工具栏

工具栏成为 toolbox，提供一些工具：下载到本地，查看可视化底层数据等。

```js
var options = {
  toolbox: {
    // 工具栏的显示状态
    show: true,
    // 工具栏配置项
    feature: {
      // 还原按钮 title是悬停时的提示
      restore: {
        show: true,
        title: "还原",
      },
      // 保存为图片 title是悬停时的提示
      saveAsImage: {
        show: true,
        title: "保存为图片",
      },
      // 原数据视图
      dataView: {
        show: true,
        title: "源数据",
      },
      // 转换为另一种可视化
      magicType: {
        show: true,
        // 点击后弹出转换为另一种可视化的回调函数
        type: ["line", "bar"],
        title: {
          line: "折线图",
          bar: "柱状图",
        },
      },
    },
  },
};
```

![工具栏](/assets/echarts/3-2toolbox.png)

## 4. 图例

图例组件为 legend， 用于区分不同数据的表示

```js
var options = {
  legend: {
    // 图例的显示状态
    show: true,
    // 图例的布局方式： horizontal(横向)、vertical(纵向)
    orient: "horizontal",
    // 图例的水平位置： 像素、百分比、left、right、center
    left: "left",
    // 图例的垂直位置： 像素、百分比、top、middle、bottom
    top: "top",
    // 图例数据数组。 与数据展示的系列一一对应
    data: ["销量", "库存"],
  },
};
```

## 5. 时间轴

时间轴 timeline 与之前略有差异。 使用 timeline 后 `chartsInstance.setOption`参数的 option 内的数据结构就需要改变了。

option 需要分为 baseOption 和 options。

只要用到 timeline 的就称为**原子 option**， 也就是**baseOption**。 baseOption 是基础配置项， options 是时间轴的每个时间点的配置项。

```js
var myCharts = echarts.init(document.getElementById("main"));
var option = {
  baseOption: {
    timeline: {
      data: ["2027", "2028", "2029"],
    },
    title: {
      subtext: "",
    },
    xAxis: [
      {
        type: "category",
        data: ["A公司", "B公司", "C公司"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        type: "bar",
      },
    ],
  },
  options: [
    {
      title: {
        text: "2027年销售情况",
      },
      series: [
        {
          data: [120, 200, 150],
        },
      ],
    },
    {
      title: {
        text: "2028年销售情况",
      },
      series: [
        {
          data: [220, 182, 191],
        },
      ],
    },
    {
      title: {
        text: "2029年销售情况",
      },
      series: [
        {
          data: [150, 232, 201],
        },
      ],
    },
  ],
};
myCharts.setOption(option);
```

![时间轴图片](/assets/echarts/3-5timeline.png)

## 6. 数据区域缩放

数据区域缩放为 dataZoom， 为用户提供区域缩放的功能。

组件有很多种：

- slider： 滑动条缩放， 适合时间轴等数据
- inside： 内置缩放
- select： 框选行缩放

### 6.1 slider

```js
var options = {
  // 数组结构的缩放
  dataZoom: [
    {
      id: "dataZoomX",
      type: "slider",
      // 指定控制缩放的x轴是哪个
      xAxisIndex: [0],
      // 过滤模式： filter(过滤窗口外的数据)、empty(不会影响其他轴的数据)、weakFilter(影响其他轴的数据，只有所有维度都在窗口外才会被过滤)、none(不过滤)
      filterMode: "filter",
    },
    {
      id: "dataZoomY",
      type: "slider",
      // 指定控制缩放的y轴
      yAxisIndex: [0],
      filterMode: "empty",
    },
  ],
};
```

![slider缩放](/assets/echarts/3-61datazoom.png)

### 6.2 inside

inside 是内置与坐标系内的， 将`type`修改为`inside`！

然后可以滚动鼠标滚轮来缩放放大查看。

```js
var options = {
  // 数组结构的缩放
  dataZoom: [
    {
      id: "dataZoomX",
      type: "inside",
      // 指定控制缩放的x轴是哪个
      xAxisIndex: [0],
      // 过滤模式： filter(过滤窗口外的数据)、empty(不会影响其他轴的数据)、weakFilter(影响其他轴的数据，只有所有维度都在窗口外才会被过滤)、none(不过滤)
      filterMode: "filter",
    },
    // .....
  ],
};
```

### 6.3 select

这种缩放不同于以上两种， 是存在于[`toolbox`工具栏](#_3-工具栏)组件中的

:::tip

是在工具栏中添加了`toolbox.feature.dataZoom`的功能。

:::

```js
var options = {
  toolbox: {
    feature: {
      dataZoom: { show: true },
    },
  },
};
```

![工具栏数据缩放](/assets/echarts/3-63dataZoom.png)

## 7. 网格

网格 grid 控制网格大小， 平时都是默认， 可以通过 width、height 设置。

```js
var options = {
  grid: {
    // 网格的宽度： 像素值10； 百分比值10%； 还有left左对齐、center、right
    width: "80%",
    // 网格的高度： 像素值10； 百分比值10%； 还有top上对齐、middle、bottom
    height: "80%",
    // 网格的边距： 上、右、下、左
    top: "10%",
    right: "10%",
    bottom: "10%",
    left: "10%",
  },
};
```

## 8. 坐标轴

坐标轴 Axis，最常用的是二维直角坐标轴， 也就是 xAxis 和 yAxis。

属性如下:

```js
var options = {
  xAxis: {
    // top 和 bottom坐标轴的位置
    position: "bottom",
    // 针对不同数据 轴的表现不同： value、catagory(类别类型)、time(时间类型)、log(对数)
    type: "value",
    // 坐标轴的名称
    name: "X轴",
    // 坐标轴的名称位置 start、middle/center、end
    nameLocation: "middle",
  },
};
```

## 9. 数据系列

数据系列 series 是数据的表现形式， 每一种图标的数据结构是不同的。

下方是一个饼状图的示例。

```js
var options = {
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "50%",
      center: ["50%", "50%"],
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 1000, name: "视频广告" },
        { value: 1548, name: "搜索引擎" },
      ],
      roseType: "radius",
      label: {
        show: true,
      },
      itemStyle: {
        color: "#c23531",
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay: function (idx) {
        return Math.random() * 1000;
      },
    },
  ],
};
```

## 10. 全局字体样式

文字样式 textStyle 针对图标的整体主题文字颜色进行设置。

```js
var options = {
  textStyle: {
    // 字体的颜色
    color: "#000",
    // 字体的风格： normal、italic、oblique
    fontStyle: "normal",
    // 字体的粗细： normal、bold、bolder、lighter、数值等
    fontWeight: "normal",
    // 字体的大小
    fontSize: 12,
    // 字体的系列： sans-serif、serif、monospace、Arial、Counrier New、Microsoft Yahei等
    fontFamily: "sans-serif",
  },
};
```

:::tip

以上是这本书介绍的组件，而官网的**术语速查中**还有**刷选、标注、标线、标域、视觉映射、自定义图形**等。

:::

## 11. 刷选

刷选 brush 是区域选择，可以选择数据的某个区域进行查看并统计结果等。

```js
var options = {
  brush: {
    // toolbox的选中状态 rect矩形选择、polygon多边形选择、lineX/lineY横纵向选择、clear清除l选中状态
    toolbox: ["lineX", "clear"],
    // 哪些数据可以被刷选: all、[]列表、number：0那一条seriesIndex
    seriesIndex: "all",
  },
};
```

## 12. 标注、标线、标域

标注 MarkPoint、标线 MarkLine、标域 MarkArea 是对数据的标注。

TODO

## 13. 视觉映射

visualMap 是对数据的视觉映射， 通过颜色、大小等来区分数据。

TODO

## 14. 自定义图形

Graphic 是原生图形元素组件。

TODO

---

# 可视化图

:::danger 提示

在学习图表前，组件内容必须熟读。 至少每个组件的 key 值和作用要记住。

在图表中组件就是随手就拿来用的。记住最基础的其它的就交给 copilot 了。

:::

在 Echarts**术语速查手册**中， 可以看到可视化图表的分类。 官网目前是**22 种**， 其中最后一种是**自定义图**

:::info

图的类型，通过 `series.type`来指定。（会在对应章节的第一个单词声明他的 type）

由于图配置和数据配置等代码过长，官网的示例中也是有着较为详细且容易调试的代码。

这里只是对 api 进行注释并记录， 全面了解可以投入生产后，继续深挖。

:::

## 1. 折线图

`line`折线图是常用的时间序列基础图标。

```js
var options = {
  series: {
    // 折线图
    type: "line", // [!code focus]
    // 是否需要光滑的曲线
    smooth: true,
    // 真实数据
    data: [120, 200, 150, 80, 70, 110, 130],
  },
};
```

### 1.1 堆叠态折线图

折线图通常是需要**多条折线**以及**堆叠态**来表明复杂情况下。

且复杂图表是需要多个组件配合来做到数据的全面化

```js
var options = {
  // 增加图例筛选对应数据  // [!code ++]
  legend: {
    // [!code ++]
    // 图例位置  // [!code ++]
    left: "right", // [!code ++]
    // 图例数据  // [!code ++]
    data: ["A产品销量", "B产品销量", "C产品销量"], // [!code ++]
  }, // [!code ++]
  // 设置数据项为 Array<simpleSeriesOption> // [!code ++]
  series: [
    // [!code highlight]
    {
      name: "A产品销量",
      // 折线图
      type: "line",
      // 是否需要光滑的曲线
      smooth: true,
      // 真实数据
      data: [120, 200, 150, 80, 70, 110, 130],
      stack: "总量", // [!code ++]
      areaStyle: {
        // [!code ++]
        // 设置堆叠态的下方区域 // [!code ++]
        color: "rgba(255, 0, 0, 0.5)", // [!code ++]
      }, // [!code ++]
    },
    {
      name: "B产品销量",
      // 折线图
      type: "line",
      // 是否需要光滑的曲线
      smooth: true,
      // 真实数据
      data: [220, 182, 191, 234, 290, 330, 310],
      stack: "总量",
      areaStyle: {},
    },
    {
      name: "C产品销量",
      // 折线图
      type: "line",
      // 是否需要光滑的曲线
      smooth: true,
      // 真实数据
      data: [150, 232, 201, 154, 190, 330, 410],
      stack: "总量",
      areaStyle: {},
      label: {
        normal: {
          show: true,
          position: "top",
        },
      },
    },
  ],
};
```

![折线图](/assets/echarts/4-11line.png)

## 2. 柱状图

bar 柱状图是常用的离散数据的频数。

```js
var options = {
  series: {
    // 柱状图
    type: "bar", // [!code focus]
  },
};
```

### 2.1 进阶柱状图

聚合的图都 需要 `legend` 图例来辅助显示， 并将`series`设置为`Array<simpleSeriesOption>`。

```js
var options = {
  // 调换x轴和y轴数据, 成为水平聚合图
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: ["衬衫", "羊毛衫", "雪纺衫", "牛仔裤", "皮衣", "高跟鞋", "袜子"],
  },
  // 数组结构聚合柱状图
  series: [
    {
      name: "A产品销量",
      // 柱状图
      type: "bar", // [!code focus]
      // 真实数据
      data: [120, 200, 150, 80, 70, 110, 130],
      // 堆叠态
      // stack: "总量",
      // areaStyle: {
      //   color: "rgba(255, 0, 0, 0.5)",
      // },
      // 调换后label的位置也需要换成right
      label: {
        show: true,
        position: "right",
      },
    },
    // ....
  ],
};
```

![水平柱状图](/assets/echarts/4-21bar.png)

## 3. 饼图

`pie`饼图是展示数据占比的常用图表。

```js
var options = {
  series: {
    type: "pie", // [!code focus]
    //  数组为环状图 // [!code ++]
    // radius: ["50%", "70%"], // [!code ++]
    // 普通饼状图
    redius: "50%",
    data: [
      { value: 335, name: "直接访问" },
      { value: 310, name: "邮件营销" },
      { value: 234, name: "联盟广告" },
      { value: 1000, name: "视频广告" },
      { value: 1548, name: "搜索引擎" },
    ],
  },
};
```

## 4. 散点图

`scatter` 散点图

```js
var options = {
  xAxis: { type: "value" }, // [!code ++]
  yAxis: { type: "value" }, // [!code ++]
  legend: { data: ["类别1", "类别2"] }, // [!code ++]
  series: [
    {
      name: "类别1",
      type: "scatter", // [!code focus]
      data: [
        [10, 20], // [!code highlight]
        [30, 40], // [!code highlight]
        [50, 60], // [!code highlight]
        [70, 80], // [!code highlight]
        [90, 100], // [!code highlight]
      ],
    },
    {
      name: "类别2",
      type: "scatter",
      data: [
        [15, 25],
        [35, 45],
        [55, 65],
        [75, 85],
        [95, 105],
      ],
    },
  ],
};
```

## 5. 气泡图

`scatter` 也是气泡图，唯一与散点图不同的是， 在散点图的两个维度的 data 格式外，需要第三个维度的**气泡大小**信息。

再通过`symbolSize: (data: typeof series.data) => number`来设置气泡的大小

```js
var options = {
  series: [
    {
      name: "气泡图",
      type: "scatter", // [!code focus]
      data: [
        [10, 20, 5], // [!code ++]
        [30, 40, 10], // [!code ++]
        [50, 60, 15], // [!code ++]
        [70, 80, 20], // [!code ++]
        [90, 100, 25], // [!code ++]
      ], // [!code ++]
      symbolSize: function (data) {
        // [!code ++]
        return data[2] * 2; // [!code ++]
      }, // [!code ++]
    },
    {
      name: "散点图",
      type: "scatter",
      data: [
        [15, 25],
        [35, 45],
        [55, 65],
        [75, 85],
        [95, 105],
      ],
    },
  ],
};
```

## 6. 雷达图

`radar` 雷达图是展示多个单位在多个不同项目上的差异。

如: 兵乓球运动员马龙的**六边形战士图**

```js
var options = {
  // 雷达图的坐标系
  radar: {
    // [!code ++]
    // 雷达图的指示器
    indicator: [
      // [!code ++]
      { name: "速度", max: 100 },
      { name: "力量", max: 100 },
      { name: "灵活性", max: 100 },
      { name: "耐力", max: 100 },
      { name: "技术", max: 100 },
      { name: "战术", max: 100 },
    ], // [!code ++]
  }, // [!code ++]
  series: [
    // [!code ++]
    {
      // [!code ++]
      type: "radar", // [!code ++][!code focus]
      data: [
        // [!code ++]
        {
          value: [90, 80, 70, 60, 50, 40],
          name: "马龙",
        },
        {
          value: [80, 70, 60, 50, 40, 30],
          name: "平均值",
        },
      ],
    }, // [!code ++]
  ], // [!code ++]
};
```

## 7. 漏斗图

`funnel` 漏斗图是转化率分析的图。

```js
var options = {
  series: [
    {
      name: "转换率漏斗图",
      type: "funnel", // [!code ++][!code focus]
      min: 0,
      max: 100,
      minSize: "0%",
      maxSize: "100%",
      // 数据的升降序 可选 ascending
      sort: "descending", // [!code ++]
      gap: 2, // [!code ++]
      label: {
        show: true,
        position: "inside",
      },
      // 鼠标悬停，突出显示文字
      emphasis: {
        // [!code ++]
        label: {
          // [!code ++]
          fontSize: 20, // [!code ++]
        }, // [!code ++]
      }, // [!code ++]
      data: [
        { value: 60, name: "注册" },
        { value: 40, name: "登录" },
        { value: 20, name: "访问" },
        { value: 10, name: "浏览" },
        { value: 5, name: "购买" },
      ],
    },
  ],
};
```

## 8. 仪表盘

`gauge` 仪表盘

```js
var options = {
  series: [
    {
      type: "gauge", // [!code focus]
      detail: { formatter: "{value}%" },
      data: [{ value: 50, name: "注册" }],
    },
  ],
};
```

## 9. 箱线图

`boxplot` 箱线图是连续性数据分部情况的可视化图。

echarts提供了预处理函数来处理数据。 `echarts.dataTool.prepareBoxplotData()`

```js
var data = echarts.dataTool.prepareBoxplotData([
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 6],
  [3, 4, 5, 6, 7],
]);
var options = {
  series: [
    {
      type: "boxplot", // [!code focus]
      data: data.boxData // [!code ++]
      tooltip: {
        formatter: function (params) {
          return (
            params.name +
            "<br/>" +
            "上四分位数: " +
            params.data[3] +
            "<br/>" +
            "下四分位数: " +
            params.data[1] +
            "<br/>" +
            "中位数: " +
            params.data[2] +
            "<br/>" +
            "最大值: " +
            params.data[4] +
            "<br/>" +
            "最小值: " +
            params.data[0]
          );
        },
      }
    }
  ]
}
```

## 10. 热力图

`heatmap` 热力图 是一种密度图。 使用不同颜色和颜色不同深浅来表示数据量。 

比如有：github 提交量。

:::info

1. 流程是先定义 x y轴的数据
2. 而后定义的data是三个维度的数组， 其中前两个维度是 x y轴的坐标， 第三个维度是数据量。
3. 设置type为 `heatmap`

:::

```js

```



## 11. 旭日图

`sunburst` 旭日图是饼图的进化版本。



## 12. 桑基图

## 13. 词云图

## 14. 树图

## 15. 矩形树图

## 16. 关系图
