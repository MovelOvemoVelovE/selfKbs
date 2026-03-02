<template>
  <div class="demo-container">
    <!-- 上半部分：组件展示 -->
    <div class="demo-preview el-card">
      <slot name="source"></slot>
    </div>

    <!-- 右下角功能按钮 -->
    <div class="demo-actions">
      <el-tooltip content="查看源码" placement="top">
        <Icon 
          icon="fluent-color:code-24"
          width="24"
          height="24"
          @click="toggleSource"
        />
      </el-tooltip>
      <el-tooltip content="复制源码" placement="top">
        <Icon 
          icon="flat-color-icons:copyright"
          width="24"
          height="24"
          @click="copySource"
        />
      </el-tooltip>
    </div>

    <!-- 下半部分：源码展示 -->
    <div v-if="showSource" class="demo-source">
      <pre><code class="language-vue" v-html="highlightedSource"></code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElTooltip } from 'element-plus';
import { Icon } from "@iconify/vue";
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

// 引入 VitePress 的高亮工具
import { useData } from 'vitepress';
const { theme } = useData();
const Prism = theme.value?.prism || window.Prism;

const showSource = ref(false);

const decodedSource = computed(() => decodeURIComponent(props.source));

const toggleSource = () => {
  showSource.value = !showSource.value;
};

// 高亮处理
const highlightedSource = computed(() => {
  if (Prism && Prism.highlight) {
    return Prism.highlight(decodedSource.value, Prism.languages.markdown, 'markdown');
  }
  // fallback
  return decodedSource.value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
});

const copySource = () => {
  navigator.clipboard.writeText(decodedSource.value).then(() => {
    alert('源码已复制到剪贴板！');
  });
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
  bottom: 16px;
  right: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.demo-actions:hover {
  cursor: pointer;
}

.demo-source {
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 16px;
}
</style>