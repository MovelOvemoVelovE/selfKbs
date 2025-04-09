<template>
  <div class="echarts_containe" ref="echartsContainer"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    default: () => ({})
  }
})

let echartsContainer = ref(null)
let chartsInstance = null

onMounted(() => {
  chartsInstance = echarts.init(echartsContainer.value)

  chartsInstance.setOption(props.options)
})
</script>

<style scoped lang="less">
.echarts_containe{
  width: 600px;
  height: 400px;
}
</style>