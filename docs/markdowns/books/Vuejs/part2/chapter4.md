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


:::code-group

```js[proxy.js]
let activeEffect = null;
let butcket = new WeakMap();
const data = { name: "Alice", age: 30 }
const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
    trigger(target, key)
    return true
  }
})
```

```js[track.js]
function track(target, key){
  console.log(`Tracking access to property "${key}" with value: ${target[key]}`);
  if(!activeEffect)return
  let depsMap = butcket.get(target);
  if(!depsMap){
    depsMap = new Map();
    butcket.set(target,depsMap)
  }
  let deps = depsMap.get(key);
  if(!deps){
    deps = new Set();
    depsMap.set(key,deps)
  }
  deps.add(activeEffect)
}
```

```js[trigger.js]
function trigger(target, key){
  const depsMap = butcket.get(target);
  if(!depsMap)return
  const deps = depsMap.get(key);
  if(!deps)return
  deps.forEach(effect=>{
    effect()
  })
}
```

:::

## 分支切换与cleanup

分支切换指的是： effect函数中有三元表达式，根据对象不同值变化不同的逻辑： 

```js
effect(
    function(){
      console.log("Effect run");
      document.body.innerText = obj.age > 18 ? obj.name : "Minor";
    }
)
setTimeout(() => {
  obj.age = 1
}, 1000)

setTimeout(() => {
  obj.name = 'Police'
}, 3000)
```

初始化`isOk`为`true`，那么第一次执行`effect`函数， 会与`isOk`和`name`都建立联系， 以后无论怎么处理`isOk`， 只要`name`变化， 都会触发`effect`函数执行， 这是不合理的。

:::tip

思路： 在重新开始一轮的track、trigger之前，刷新一遍依赖关系， 这时候`isOk`为`false`， 那么就不会再与`name`建立联系了。

:::

:::code-group

```js[proxy.js]
const cleanup = (effectFn) => { //[!code ++]
  // 操作依赖集合， 清空 //[!code ++]
  for (let i = 0; i < effectFn.deps.length; i++) { //[!code ++]
    const deps = effectFn.deps[i]; //[!code ++]
    deps.delete(effectFn); //[!code ++]
  } //[!code ++]
  effectFn.deps.length = 0; //[!code ++]
} //[!code ++]

const effect = (fn) => {
  const effectFn = () => {
    cleanup(effectFn) // 新增 //[!code ++]
    activeEffect = effectFn;
    // 执行副作用函数
    fn();
  }
  effectFn.deps = [] //[!code ++]
  effectFn() //[!code ++]
}
```

```js[track.js]
// 增加函数到 依赖集合
  deps.add(activeEffect)
// 增加 依赖集合到 函数deps属性内
    activeEffect.deps.push(deps) //[!code ++]
```

```js[trigger.js]
function trigger(target, key){
  const depsMap = butcket.get(target);
  if(!depsMap)return
  const effects = depsMap.get(key);
  if(!effects)return
  const effectToRun = new Set(effects) //[!code ++]
  effectToRun.forEach(fn=>{ //[!code ++]
    /**
     * fn执行 //[!code ++]
     * 1. 会执行cleanup， cleanUp内进行了依赖集合的清空 //[!code ++]
     * 2. 之后会执行fn本身， fn内会重新进行依赖收集 //[!code ++]
     * 3. 这样会导致死循环 //[!code ++]
     */ //[!code ++]
    fn() //[!code ++]
  }) //[!code ++]
}
```

:::

## 嵌套的effect与effect栈

effect函数是会发生嵌套的， 例如组件可以嵌套， 组件传递props去渲染子组件，这时候就是嵌套的effect函数。

```js
effect(
    () => {
      Foo.render()
      effect(
          () => {
            Bar.render()
          }
      )
    }
)
```

由于目前是顶层单变量去设置`activeEffect`， 那么内层effect执行时， 会覆盖掉外层effect， 这样当内层effect执行完毕后， 外层effect就找不到了。

当修改`foo`时， 只会触发内层effect执行， 外层effect不会执行。


