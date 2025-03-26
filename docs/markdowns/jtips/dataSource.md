---
outline: deep
title: 数据逻辑
---

数据处理、页面处理等<Badge type="warning" text="beta" />

## session共享处理

sessionStorage的特点: 

- 新标签打开会复制**顶级会话的上下文**作为自己的上下文
- 相同`URL`维护的是各自的`sessionStorage`
- **复制页签会复制sessionStorage**

---

::: tip

  现在的情况是某一个界面下有多个`tab`页， 点击某一个时，**打开新标签带参数过去**并切换`tab`。

  **具体的处理如下:**
:::

::: code-group

```vue [parent.vue]
<template>
  <el-tabs v-model="currentCom" @tab-click="handleTabClick">
     <el-tab-pane label="User" name="first">
       <child :params="params" />
     </el-tab-pane>
     <el-tab-pane label="Config" name="second">
       <child :params="params" />
     </el-tab-pane>
  </el-tabs>
</template>

<script setup>
  const handleTabClick = () => {
    // 复制新页面携带参数
    let sessionTabs = sessionStorage.getItem('tabs')
    if (sessionTabs) {
        let tab = JSON.parse(sessionTabs).tab
        currentCom = tabsData[tab].name
        sessionStorage.removeItem('tabs')
    }
  }
</script>
```

```vue [child.vue]
<template>
  <el-button type="primary" @click="jumpLookRecords(params)">查看记录</el-button>
</template>

<script setup>
  const jumpLookRecords = (params) => {
    window.sessionStorage.setItem('tabs', JSON.stringify(params));
    let targetView = window.open(window.location.href, '_blank');
    targetView.onload = function () {
      // session共享数据，但删除不共享
      sessionStorage.removeItem('tabs')
    };
  }
</script>
```

:::
