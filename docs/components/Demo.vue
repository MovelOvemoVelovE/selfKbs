<template>
  <div class="demo-container">
    <!-- 上半部分：组件展示 -->
    <div class="demo-preview el-card">
      <slot name="source"></slot>
    </div>

    <!-- 右下角功能按钮 -->
    <div class="demo-actions">
      <el-tooltip content="查看源码" placement="top">
        <el-button
          circle
          size="small"
          @click="toggleSource"
        ></el-button>
      </el-tooltip>
      <el-tooltip content="复制源码" placement="top">
        <el-button
          circle
          size="small"
          @click="copySource"
        ></el-button>
      </el-tooltip>
      <el-tooltip content="在 Playground 中编辑" placement="top">
        <el-button
          circle
          size="small"
          @click="openPlayground"
        ></el-button>
      </el-tooltip>
    </div>

    <!-- 下半部分：源码展示 -->
    <div v-if="showSource" class="demo-source">
      <pre><code class="language-html" v-text="decodedSource"></code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElButton, ElTooltip } from 'element-plus';
import 'element-plus/dist/index.css';

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const showSource = ref(false);

const decodedSource = computed(() => decodeURIComponent(props.source));

const toggleSource = () => {
  showSource.value = !showSource.value;
};

const copySource = () => {
  navigator.clipboard.writeText(decodedSource.value).then(() => {
    alert('源码已复制到剪贴板！');
  });
};

const openPlayground = () => {
  alert('在 Playground 中编辑功能尚未实现！');
};
</script>

<style scoped>
.demo-container {
  border: 1px solid #ebebeb;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f9f9f9;
  position: relative;
}

.demo-preview {
  padding: 16px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  margin-bottom: 16px;
}

.demo-actions {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
}

.demo-source {
  background-color: #282c34;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 16px;
}
</style>