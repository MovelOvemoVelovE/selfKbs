# 权衡的艺术

> “框架设计里到处都体现了权衡的艺术。”

## 命令式和声明式

视图层框架通常分为命令式和声明式各有优缺点。 作为框架设计者，应该对两种范式都有足够的认知，这样才能做出正确的选择.

命令式是关注**过程**，js一步步实现目标。 而声明式则是关注**结果**, 更加的”语义化、简单化“ 具体差距如下:

```jsx
// 命令式：获取DOM => 修改内容 => 绑定事件
$('.app').text('hello world').on('click', function() {
  alert('hello world')
})
// 声明式：描述结果
<div class="app" @click="alert('hello world')">hello world</div>
```

:::tip 结论
vuejs内部一定是命令式的，而使用者一定是声明式的。
:::

## 权衡利弊

> 命令式代码是上限， 声明式代码的性能是绝对不优于命令式代码的。

声明式代码比命令式代码对于框架而言，一定是隐藏、封装了命令式的过程，才能达到代码的效果， 那么如果封装的这个过程、**寻找差异并更新的消耗**为0，才能与命令式的性能相同， 所以绝对是不优于命令式的。

## virtual DOM性能到底如何

> 前文得知： **声明式代码更新性能 = 找出差异的性能 + 直接修改的性能 **
> 当找出差异趋于0，那么就性能消耗最小化， 虚拟DOM就是为此而来。

虚拟DOM与原生js操作DOM肯定是没法比，但是使用innerHTML等方式更新DOM时，我们可以做一些比较。

首先是纯js操作比DOM操作快得多得多， 如果通过`innerHTML`更新是 **HTML字符串拼接计算量 + 销毁所有DOM元素（更新时） + innerHTML的DOM计算量。**

而virtual DOM则是 **创建Javascript对象的计算量 + 计算更新差异的计算量（更新时） + 创建真实DOM的计算量**

## 运行时和编译时

设计一个框架有三种选择: **运行时、编译时、运行时+编译时。**

#### 纯运行时

设计了一个render函数，传入一个树形结构的对象，可以解析为数据为DOM元素， 渲染到页面则可以达到预期

::: details 
```js
const obj = {
  tag: 'div',
  attrs: { class: 'app' },
  children: [
    {
      tag: 'h1',
      attrs: {},
      children: ['hello world']
    }
  ]
}

function Render(obj) {
  const el = document.createElement(obj.tag)
  for (let key in obj.attrs) {
    el.setAttribute(key, obj.attrs[key])
  }
  obj.children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child))
    } else {
      el.appendChild(Render(child))
    }
  })
  return el
}
document.body.appendChild(Render(obj))
```
:::

### 编译时

但是这时候会想了，或者是目前用 `h`函数去创建vnode的时候能感受到，非常麻烦，非常不直观， 作为框架的用户来说体感巨差。

我们现在需要`Compiler`程序， 作用是将html转换为树形结构对象，作为编译器








