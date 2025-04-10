<template>
  <div class="echarts_containe" ref="echartsContainer"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue'

var options = {
  baseOption: {
    timeline: {
      data: ["2027", "2028", "2029"],
    },
    title: {
      subtext: "",
      left: "center",
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
}
let echartsContainer = ref(null)
let chartsInstance = null

onMounted(() => {
  chartsInstance = echarts.init(echartsContainer.value, null, { renderer: 'svg' })

  chartsInstance.setOption(options)
})
</script>

<style scoped lang="less">
.echarts_containe{
  width: 600px;
  height: 400px;
}
</style>