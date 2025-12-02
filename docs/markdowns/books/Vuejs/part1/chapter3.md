# Vuejs设计思路

框架设计存在一条**核心思路**，并围绕着核心展开。 

本章是从全局角度了解设计思路、工作机制及重要组成， 看看独立功能模块如何配合、运作。

## 声明式描述UI

开发前端页面，有书写html的UI内容，js的交互及css的样式。 那么声明式的前端框架，你自己想做一套框架， 你会怎么做？

如vue3中是这样:

```vue
<script setup>
  const handleClick = () => {
    alert('Clicked!')
  }
  const message = 'Hello, Vue 3!'
</script>
<template>
  <div @click="handleClick">
    <span>{{ message }}</span>
  </div>
</template>
```

也可以使用虚拟DOM的方式或者是react的jsx方式

## 初识渲染器

渲染器是将虚拟DOM渲染成真实DOM的模块， 负责将数据状态映射到UI界面上。

渲染器其实很简单，都是使用一些我们很熟悉的DOM操作API完成渲染工作。

```js
// 渲染器
function renderer(vnode, container) {
  // 使用虚拟节点的tag创建真实元素 作为标签名
  const el = document.createElement(vnode.tag)
  // 将props的属性、方法添加到DOM元素上
  for(const key in vnode.props) {
    if(/^on/.test(key)) {
      // 事件监听
      el.addEventListener(key.slice(2).toLowerCase(), vnode.props[key])
    } else {
      // 普通属性
      el.setAttribute(key, vnode.props[key])
    }
  }
  // 递归处理children
  if(typeof vnode.children === 'string'){
   el.appendChild(document.createTextNode(vnode.children)) 
  }else if (Array.isArray(vnode.children)){
    vnode.children.forEach(childVnode => {
      renderer(childVnode, el) // 递归渲染子节点
    })
  }
  // 元素添加到挂载点container上
    container.appendChild(el)
}

// 使用渲染器
const vnode = {
  tag: 'div',
  props: { id: 'app', onClick: () => alert('Clicked!') },
  children: [
    { tag: 'span', props: {}, children: 'Hello, Vue 3!' }
  ]
}
const container = document.getElementById('root')
renderer(vnode, container)
```

> 虽然这里是最简单的创建内容，而不是重点的更新变更内容，但是渲染器也不是很复杂的东西。

## 组件本质

:::tip
组件就是一组DOM元素的封装, 返回值也是virtual DOM节点对象。
:::

### 定义函数组件

```js
const MyComponent = () => {
    return {
        tag: 'div',
        props: { class: 'my-component', onClick: () => alert('Component clicked!') },
        children: 'This is my component'
    }
}

// 虚拟DOM可以用tag属性存储组件函数
const vnode = {
    tag: MyComponent,
}
```

那么渲染器也需要对应的进行修改兼容：

:::code-group

```js[修改后的渲染器.js]
function renderer(vnode, container){
    if(typeof vnode.tag === 'function'){
        // 处理函数组件
        mountComponent(vnode, container)
    }else if(typeof vnode.tag === 'string'){
        mountElement(vnode, container)
    }
}
```

```js[普通标签.js]
function mountElement(vnode, container){
    const el = document.createElement(vnode.tag)
    for(const key in vnode.props){
        if(/^on/.test(key)){
            el.addEventListener(key.slice(2).toLowerCase(), vnode.props[key])
        }else{
            el.setAttribute(key, vnode.props[key])
        }
    }
    if(typeof vnode.children ==='string'){
        el.appendChild(document.createTextNode(vnode.children))
    }else if(Array.isArray(vnode.children)){
        vnode.children.forEach(childVnode => {
            renderer(childVnode, el)
        })
    }
    container.appendChild(el)
}
```

```js[组件渲染.js]
function mountComponent(vnode, container){
    // 调用组件函数获取虚拟DOM
    const componentVnode = vnode.tag()
    // 使用渲染器渲染组件返回的虚拟DOM
    renderer(componentVnode, container)
}
```

:::

### 对象组件

```js
const MyComponent = {
    setup() {
        const message = 'Hello from Object Component!'
        return { message }
    },
    render() {
        return {
            tag: 'div',
            props: { class: 'my-object-component' },
            children: this.message
        }
    }
}
```

::: details 举一反三

:::code-group
```js[加载函数方法.js]
function mountComponent(vnode, container){
  const subtree = vnode.tag.setup ? vnode.tag.setup() : {}
  const componentVnode = vnode.tag.render.call(subtree)
  renderer(componentVnode, container)
}
```

```js[渲染器修改.js]
function renderer(vnode, container){
    if(typeof vnode.tag === 'object'){
        mountComponent(vnode, container)
    }else if(typeof vnode.tag === 'string'){
        mountElement(vnode, container)
    }
}
```

:::

## 模板工作原理



