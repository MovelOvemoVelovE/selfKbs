:::tip

应用篇开始， 让api了然于心，遇到什么可视化报表都不怕

Echarts的可视化更像是一个**搭积木的游戏**, 通过将不同组件**组合**， 来达到预期的可视化效果

:::


# 一、电商销售情况可视化案例

Dashboard是 商业智能仪表盘的简称， 主要用来呈现数据的可视化效果。

用可视化方式为企业展现度量信息和关键业务指标。 如： 今日订单量、取消退单数、订单成功占比、订单分布情况。

![71Dashboard.png](/assets/echarts/71Dashboard.png)
## 实现Dashboard

### 1. 设置文字

上图中的文字如 今日订单总金额等， 需要固定位置显示

- 文字内容
- x/y轴偏移量
- 字体颜色、大小

```js
var title = [
    // 标题带数据
    {
      text: '今日订单总金额',
      x: 'center',
      y: '4.5%',
      textStyle: {
        fontSize: 20
      }
    },
    {text: '4509834', x: 'center', y: '9%', textStyle: {fontSize: 60}},
    
    {text: '今日成交订单数', x: '14.5%', y: '18%', textStyle: {fontSize: 20}},
    {text: 34220, x: '15.3%', y: '23%', textStyle: {fontSize: 40}},
    
    {text: '订单成功占比', x: 'center', y: '18%', textStyle: {fontSize: 20}},
    {text: '93.25%', x: 'center', y: '23%', textStyle: {fontSize: 40}},
    
    {text: '今日取消订单数', x: '74.5%', y: '18%', textStyle: {fontSize: 20}},
    {text: '2310', x: '76%', y: '23%', textStyle: {fontSize: 40}},
    // 这两个没有图表
    {text: '订单量Top10城市', x: '18%', y: '60%', textStyle: {fontSize: 20}},
    {text: '订单量分时段统计', x: '65%', y: '60%', textStyle: {fontSize: 20}},
]
```

### 2. 设置背景色及其他

设置整个dashboard的背景色， 鼠标悬浮

```js
// 设置鼠标悬浮提示
  var tooltip = {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
  }
  
  var backgroundColor = 'rgb(100,48,142,0.1)'
```

### 3. 设置x/y轴

接下来就是针对折线图设置x和y轴的数据。

```js
var xAxis = [
    {
      type: 'value', // x轴
      axisLabel: {
        formatter: '{value}件',
      },
      boundaryGap: [0, 0.02],
    },
    {
      gridIndex: 1,
      type: 'category',
      boundaryGap: false,
      data: [
        '0时', '1时', '2时', '3时', '4时', '5时',
        '6时', '7时', '8时', '9时', '10时', '11时',
        '12时', '13时', '14时', '15时', '16时', '17时',
        '18时', '19时', '20时', '21时', '22时', '23时',
      ],
    },
  ];

  var yAxis = [
    {
      type: 'category', // y轴
      data: [
        '北京', '上海', '广州', '深圳', '杭州',
        '成都', '重庆', '武汉', '西安', '南京',
      ],
      axisLabel: { interval: 0 },
    },
    {
      gridIndex: 1,
      type: 'value',
      axisLabel: { formatter: '{value}' },
    },
  ];
```

### 4. 设置数据

```js
var series = [
    {
      type: 'bar', // 条形图
      label: {
        normal: {
          show: true,
          position: 'right'
        }
      },
      data: [4320, 3529, 3105, 2304, 2094, 1790, 1565, 1120, 780, 409]
    },
    {
      type: 'pie', // 饼图
      center: ['20%', '45%'],
      radius: ['15%', '20%'],
      label: {
        normal: {
          formatter: '{b} \n{c} ({d}%)'
        }
      },
      data: [
        { value: 1032, name: 'Mac' },
        { value: 10096, name: 'iphone' },
        { value: 1240, name: 'ipad' },
        { value: 15680, name: 'Android' },
        { value: 4098, name: 'Windows' },
        { value: 2656, name: '其他' }
      ]
    },
    {
      type: 'pie', // 饼图
      center: ['50%', '45%'],
      radius: ['15%', '20%'],
      label: {
        normal: {
          formatter: '{b} \n{c} ({d}%)'
        }
      },
      data: [
        { value: 11045, name: '本月交易额' },
        { value: 2030, name: '本月退单' },
        { value: 29485, name: '大于40岁' }
      ]
    },
    {
      type: 'pie', // 饼图
      center: ['80%', '45%'],
      radius: ['15%', '20%'],
      label: {
        normal: {
          formatter: '{b} \n{c} ({d}%)'
        }
      },
      data: [
        { value: 1851, name: '东单' },
        { value: 10324, name: '某单' },
        { value: 14575, name: '某单' },
        { value: 7560, name: '某单' }
      ]
    },
    {
      xAxisIndex: 1,
      yAxisIndex: 1,
      type: 'line', // 折线图
      data: [
        416, 382, 318, 184, 215, 265, 557, 954, 1627, 1180, 2416, 2678,
        3021, 2590, 2100, 1809, 2300, 2539
      ],
      smooth: true,
      markPoint: {
        data: [
          { type: 'max', name: '最大值', symbolSize: 60 },
          { type: 'min', name: '最小值', symbolSize: 60 }
        ],
        itemStyle: {
          normal: { color: '#f36100' }
        }
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }]
      }
    }
  ];

var option = {
  title,
  tooltip,
  backgroundColor,
  grid,
  xAxis,
  yAxis,
  series
}
```

