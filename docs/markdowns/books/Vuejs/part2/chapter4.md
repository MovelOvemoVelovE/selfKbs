# 响应系统的作用与实现

作为vuejs重要组成部分， 我们尝试实现一个相对完善的响应系统，会遇到很多问题： 如何避免无限递归、为什么需要嵌套的副作用函数以及各种细节问题。

## 响应式数据与副作用函数

会产生副作用的函数， 称为**副作用函数（effect function）**。 副作用函数会直接或间接影响其他函数的执行， 如： 修改了一个全局的变量。

响应式数据则是，当一个对象的属性被读取被副作用函数**读取**， 当该属性**被修改**时， 会执行相关联的**副作用函数**， 那么这个对象就是**响应式数据** 

## 响应式数据的基本实现

以上的响应式数据关键是：

- 属性被读取： 追踪副作用函数
- 属性被修改： 触发副作用函数

> 那么得出思路： 将副作用函数在属性读取时放进桶中，当属性被修改时， 从桶中取出相关副作用函数并执行即可。

在ES6中，用`proxy`可以很方便地实现对对象属性的读取和修改进行拦截， 以实现上述功能。

:::tip
下述代码是极简的响应式！了解透彻后才可以继续。 

也就是读取的时候加副作用函数， 修改对象就去触发副作用函数。
:::

```js
const bucket = new Set()
const data = { text: 'hello world' }
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数加入桶中
    bucket.add(effectFn)
    // 返回属性值 正常访问属性
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal
    // 执行桶中的副作用函数
    bucket.forEach(fn => fn())
    // 返回true表示设置成功
    return true
  }
})
const effectFn = () => {
  console.log('副作用函数执行了', obj.text)
}
effectFn() // 手动执行一次副作用函数
obj.text = 'hello vue3' // 修改属性，触发副作用函数
```

## 完善的响应系统

:::tip
一个简单的响应式及核心流程看起来很简单： 读取 => 设置， 但是细节非常多， 下面我们来完善这个响应系统。
:::

### 硬解码的副作用函数

极简系统中，副作用是写死的硬编码`effectFn`， 需要变成可配置的。

:::tip
提供一个注册函数， 和全局变量辅助存储注册， 
:::

:::code-group

```js[effect.js]
let activeEffect = null
function effect(fn){
  activeEffect = fn
  fn() // 先执行一次
}
```

```js[proxy.js]
const obj = new Proxy(data, {
  get(target, key) {
    // 将副作用函数加入桶中
    if(activeEffect){
      bucket.add(activeEffect)
    }
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    // 执行桶中的副作用函数
    bucket.forEach(fn => fn())
    return true
  }
})
```

:::

### 副作用函数触发滥用

```js
effect(() => {
  console.log('effect run') // 每次属性被修改， effect都会执行
  document.body.innerText = obj.text
})
setTimeout(() => {
  // 副作用没有读取到这个值
  obj.notExist = 'hello vue3'
}, 1000)
```

上面代码中， `obj.notExist`属性没有被读取， 但是被修改了， 这时也会触发副作用函数执行， 这是不合理的。

我们需要将`target`对象的每一个`key`和对应的`effectFunction`进行关联， 这样只有当被读取的属性被修改时， 才会触发对应的副作用函数。

```js
// 桶 变为大的 Weak Map 结构
const bucket = new WeakMap()
// 修改proxy.js
const obj = new Proxy(data, {
  get(target, key){
    if(!activeEffect) return target[key]
    // 根据 target 从桶中取得 depsMap, 它也是一个 Map 类型： key --> effects
    let depsMap = bucket.get(target)
    // 如果不存在 depsMap, 则新建一个 Map 并与 target 关联
    if(!depsMap) {
      depsMap = new Set()
      bucket.set(target, depsMap)
    }
    // 根据key取得对应的 effects 集合
    let deps = depsMap.get(key)
    // 如果不存在 deps, 则新建一个 Set 并与 key 关联
    if(!deps){
      deps = new Set()
      depsMap.set(key, deps)
    }
    // 将当前副作用函数添加到依赖集合中
    deps.add(activeEffect)
    return target[key]
  },
  set(target, key, newVal){
    target[key] = newVal
    // 根据 target 从桶中取得 depsMap, 它也是一个 Map 类型： key
    const depsMap = bucket.get(target)
    if(!depsMap) return true
    // 根据 key 取得对应的 effects 集合
    const deps = depsMap.get(key)
    // 执行副作用函数
    deps && deps.forEach(fn => fn())
    return true
  }
})
```

:::details 底层设计数据结构

```js
const bucket = new WeakMap()
// bucket结构
// WeakMap {
//   target1: Map {
//     key1: Set [effectFn1, effectFn2],
//     key2: Set [effectFn3]
//   },
//   target2: Map {
//     key1: Set [effectFn4]
//   }
// }
```

:::

:::tip 为什么使用 WeakMap

将WeakMap作为桶的顶层数据结构， 可以避免内存泄漏问题， 因为WeakMap的键是弱引用， 当**目标对象**没有任何引用了，那么就应该回收他立刻。

:::

为了符合vue3，读取收集时的动作放在`track`**追踪函数**中， 修改触发时的动作放在`trigger`**触发函数**中。

