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
  }
}
```

:::tip

以上是这本书介绍的组件，而官网的**术语速查中**还有**刷选、标注、标线、标域、视觉映射、自定义图形**等。

:::

## 11. 刷选

刷选 brush是区域选择，可以选择数据的某个区域进行查看并统计结果等。

```js
var options = {
  brush: {
    // toolbox的选中状态 rect矩形选择、polygon多边形选择、lineX/lineY横纵向选择、clear清除l选中状态
    toolbox: ["lineX", "clear"],
    // 哪些数据可以被刷选: all、[]列表、number：0那一条seriesIndex
    seriesIndex: 'all'
  }
}
```

## 12. 标注、标线、标域

标注MarkPoint、标线MarkLine、标域MarkArea是对数据的标注。

TODO

## 13. 视觉映射

visualMap 是对数据的视觉映射， 通过颜色、大小等来区分数据。

TODO

## 14. 自定义图形

Graphic 是原生图形元素组件。

TODO

---

# 可视化图

在 Echarts**术语速查手册**中， 可以看到可视化图表的分类。 官网目前是**22 种**， 其中最后一种是**自定义图**

:::info

图的类型，通过 `series.type`来指定。（会在对应章节的第一个单词声明他的type）

由于图配置和数据配置等代码过长，官网的示例中也是有着较为详细且容易调试的代码。 

这里只是对api进行注释并记录， 全面了解可以投入生产后，继续深挖。

:::

## 1. 折线图

`line`折线图是常用的时间序列基础图标。

```js
var options = {
  // x轴配置
  xAxis: {
    // 较为松散的类别类型
    type: 'category',
    // x轴分组数据
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  // 配置y轴
  yAxis: {
    // 数值类型
    type: 'value',
  },
  series: {
    // 折线图
    type: 'line',
    // 真实数据
    data: [120, 200, 150, 80, 70, 110, 130],
  }
}
```



