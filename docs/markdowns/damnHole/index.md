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