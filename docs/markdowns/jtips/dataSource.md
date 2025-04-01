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
      <child :params="params"/>
    </el-tab-pane>
    <el-tab-pane label="Config" name="second">
      <child :params="params"/>
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

## `dayjs`替换`moment`

`elementPlus`内置使用了`dayjs`插件， 所以使用`elementplus`组件库时，可以不需要再安装`dayjs`。

`dayjs`与`momentjs`区别在于，体积更小，因为基于是**插件**机制， 将一些额外的功能放入插件系统，需要使用引入。

通过`dayjs.extend(plugin)`来使用对应功能。

下面总结一下常用api差异后， 使用`nodejs`脚本来批量处理项目中的替换方案

::: tip

`elementplus`组件库内已经对`dayjs`插件进行了引用，所以在用之前可以 `log`下是否已经存在插件。

:::

### 实例

`dayjs`对象是不可变的，操作后或转换后都是不变，返回一个新的对象

而 `momentjs`是可变。

差别就是一个进行了**深克隆**, 原对象是不会变得。

### 解析

#### 传入字符串+格式~~

```js
dayjs.extend(customParseFormat)
dayjs(date, format)
```

#### 对象、数组、UTC

都是需要对应的插件才可以正确解析: 

- `ObjectSuppor`
- `ArraySupport`
- `UTC`

### 操作

#### 增减

都是实例上的方法，唯一不同的是第二个参数的单位。

`dayjs`中支持复数`months`、单数，但是**缩写的大小写是敏感的**，

而`momentjs`中缩写对于大小写没有限制。

#### 

### 显示

#### 格式

`dayjs`的格式中`YYYY`如果替换为小写则会显示不出来。

`momentjs`不会这样。

### 替换脚本

```js
import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process';

// 替换目录
const targetDir = './src';
const needManualCheck = []

// 替换函数
function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 替换 import 语句
  let updatedContent = content.replace(
    /import\s+moment\s+from\s+['"]moment['"]/g,
    "import dayjs from 'dayjs'"
  );

  // 替换 moment(xxx) 为 dayjs(xxx)
  updatedContent = updatedContent.replace(/moment\((.*?)\)/g, 'dayjs($1)');
  
  // 如果内容有变化，则写回文件
  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`已更新文件: ${filePath}`);
  }
}

// 遍历目录
function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 如果是目录，递归遍历
      traverseDirectory(filePath);
    } else if (stat.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.vue'))) {
      // 如果是 JS 文件，执行替换
      replaceInFile(filePath);
    }
  });
}

// 执行替换
console.log('开始替换...');
traverseDirectory(targetDir);
console.log('替换完成！'); 
console.log(`
  1. 检查有没有moment()用同一个内存地址操作的， dayjs是新的实例
  2. 检查插件
  3. 检查moment(    
      wqeewq
  )换行的情况
`)

// 卸载 moment
// console.log('正在卸载 moment...');
// exec('npm uninstall moment', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`卸载 moment 失败: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`卸载 moment 警告: ${stderr}`);
//   }
//   console.log(`卸载 moment 成功: ${stdout}`);
// });
```



