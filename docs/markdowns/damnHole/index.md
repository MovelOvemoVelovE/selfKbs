---
  description: "elementplus、vant等组件库、js、框架等踩坑记录"
---

Damn！Tread Hole! <Badge type="danger" text="version 0.1" />

<script setup>

import Calendar from '@/vueComponents/Calendar.vue'
// import ElTreeSelect from '@/vueComponents/ElTreeSelect.vue'

</script>

# 组件库

## elementPlus

当给组件传递**对象**参数`data`，而组件内的顶级标签恰好为`el-table`时， 那么就会触发报错。

::: danger

由于传递是个对象，最顶级的`el-table`又接受了`attribute`，`elementPlus`底层用了`data.includes`方法会导致报错。

:::

::: code-group

```vue [parent.vue]
<template>
  <component is="Child" :data="rowData" >
</template>

<script setup>
import { ref } from 'vue'

const propData = ref({})

</script>
```

```vue{2} [child.vue]
<template>
  <el-table :data="tableData" > <!-- [!code error] -->
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="age" label="Age" />
  </el-table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([])
</script>
```

:::

:::details 解决方法
- **传递prop避开data属性命名的冲突**
- `vue`特性的`attribute`透传可通过`defineOptions().inheritAttrs = false`解决
:::

### el-tree-select组件

组件的控制折叠等操作，文档中可能没有说明如何控制。

可以`TemplateRef().value.getNode()`查看所有属性和方法，后灵活进行变通。

![el-tree-select](/assets/damnHole/el-tree-select.png)

:::tip 模拟需求

**现在要求筛选树形结构字段后，末级非叶子节点，默认是折叠的，然后点击可以展示没有被筛选到的数据。**

```vue
<template>
  <el-tree-select
    ref="treeSelectRef"
    :node-key="nodeKey"
    :filter-node-method="filterNodeMethod"
    @node-expand="handleNodeExpand"
  />
</template>


<script setup>
const filterNodeMethod = (value, data, node) => {
  if(!value) return true
  if( data.deptName.includes(value) ){
    nextTick(() => {
      // 如果当前节点的所有子节点都是隐藏状态，说明树形结构的筛选已经到头了
      if(node.childNodes.length && node.childNodes.every(item => !item.visible)){
        // 将当前节点变为折叠态
        treeSelectRef.value.getNode(data.deptId).expanded = false
        // 设置一个变量，可以让他点击后展开， 否则根节点点击后筛选功能会丢失
        data.isLastFilterNode = true
      }
    })
    return true
  }
  return false
}

const handleNodeExpand = (data, node) => {
  expandedKeys.value.push(data.deptId)
  // 在展开时间中，判断当前节点是否是最后一个筛选节点
  if(data.isLastFilterNode){
    node.childNodes.forEach( item => {
      // 设置子节点的显示状态
      item.visible = true
      // 设置子节点属性为 最后一级筛选节点的下级节点，继续可以展开
      item.data.isLastFilterNode = true
    })
  }
}
</script>
```

:::

<!-- <ElTreeSelect /> -->

## vant

### `Calendar`

::: danger

日历组件内的日期， 直接渲染成了**字符**， 想要重置修改样式！发现做不到！

![日历组件渲染](../../public/rili.png)

:::

**通过提供的`formatter: (date) => date`来生成div标签， 代码如下：**

```vue v-pre
<Calendar :formatter="calendarFormatter"/>

<script setup>
const calendarFormatter = (day) => {
  day.text = h('div', {
    class: 'custom_day',
  }, day.text)
  return day
}
</script>

<style lang="scss" scoped>
::v-deep {
  .custom_day {
    
  }
}
</style>
```

## 日历组件

::: danger

市面的日历组件未能满足需求， 需要自己封装一个完整版功能的日历组件

1. elementplus的日历组件：
   - 无法设置头部的周日排序在后面
   - 初始样式化太丑
   - border线很丑
<!-- 2. vant：
   -  -->
:::

<Calendar />


# vue

## 封装$dialog

::: warning

在封装$dialog时， 控制台警告: 

`Non-function value encountered for default slot. Prefer function slots for better performance.`

由于vue3中插槽内容要为函数

:::

```js [dialogPlugin.js]

() => h(ElDialog, {
    modelValue: visible.value,
  },
  {
    default: options.content, // [!code --]
    default: () => options.content, // [!code ++]
    footer: () => options.showFooter ? h('div', 
      { class: ['dialog-footer', options.footerClass ] },
      [
        options.showCancelBtn && h(ElButton, { onClick: close, type: options.cancelType }, options.cancelText ), // [!code --]
        options.showCancelBtn && h(ElButton, { onClick: close, type: options.cancelType }, () => options.cancelText ), // [!code ++]
        //.....
      ]
    ) : null,
  });

```

## `<component />`常识

在**setup组合api中**， 使用`<component />`标签，传递一个组件实例过去。

::: warning

假设定义了一个对象，其中有个属性名为`component`, 那么也会触发警告: 

**Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.**

:::

::: details 解决方法

```js
obj = reactive({
  component: markRaw(component)
})
```

::: 
