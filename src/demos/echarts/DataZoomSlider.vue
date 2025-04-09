<template>
  <div class="echarts_containe" ref="echartsContainer"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue'

var options = {
  dataZoom: [
    {
      id: 'dataZoomX',
      type: 'slider',
      xAxisIndex: [0],
      filterMode: 'filter'
    },
    {
      id: 'dataZoomY',
      type: 'slider',
      yAxisIndex: [0],
      filterMode: 'empty'
    }
  ],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  series: {
    type: 'bar',
    data: [
      [10, 30],
      [20, 40],
      [30, 50],
      [40, 60],
      [50, 70],
      [60, 80],
      [70, 90],
      [80, 100],
      [90, 110],
      [100, 120]
    ]
  }
}
let echartsContainer = ref(null)
let chartsInstance = null

onMounted(() => {
  chartsInstance = echarts.init(echartsContainer.value)

  chartsInstance.setOption(options)
})
</script>

<style scoped lang="less">
.echarts_containe{
  width: 600px;
  height: 400px;
}
</style>