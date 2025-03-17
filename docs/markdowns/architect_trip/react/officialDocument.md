---
highlight: vs2015
theme: vuepress
---

> react官网文档速通， 很简单，过的细点，然后掌握的扎实点!
> [react官方文档](https://zh-hans.react.dev/learn)

# 描述UI

## 组件

React组件特点：

1. 是扩展标签、返回标签的js函数
2. 将标签、css、js组合而成
3. 组件首字母必须大写
4. 不同行必须括号包裹，否则return掉
5. props过多使用展开语法，大部分表示应该拆分组件
6. props是只读的时间快照

## JSX

JSX特点:

1. 返回一个根元素
2. 必须闭合标签
3. 属性驼峰
4. `{}`代替`''`使用js表达式
5. 使用if判断return最终的jsx表达式
6. 部分jsx可以赋值变量后嵌入
7. `{isTure && <div>true</div>}`为假值

## 循环渲染

1. key值兄弟节点必须唯一
2. key值不能改变，渲染时生成，否则失去key值的意义

## 组件纯粹

1. 纯函数: 
   - 只负责自己的任务， 不更改函数调用前的变量
   - 输入相同则**输出相同**
2. react严格模式通过重复组件函数，有助于找到违反规则的组件
3. `<React.StrictMode>`包裹根组件(一些框架默认包裹)
4. 组件改变了 预先存在的 变量的值称为**mutation**
5. 函数式编程很大程度依赖于**纯函数**，但是某些事物是不得不发生改变包括(屏幕更新、数据更改)，他们被称作为副作用。
6. React中**副作用通常属于事件处理程序**
7. 如果实在没有办法，**最后的手段是**使用`useEffect`在渲染结束后执行
8. **react为何侧重于纯函数**
   - 组件在不同环境下运行，如服务器
   - 输入未更改的组件来**跳过渲染**，安全的提高性能， 因为总是返回相同的结果
   - 渲染深层组件树，某些数据发生变化，React可以安全的停止计算并重新渲染。

## UI树

1. 渲染树表示单次渲染React组件之间的嵌套关系
2. 依赖树表示React app中的模块依赖关系
3. 渲染树识别顶级组件和叶子组件。
4. 顶级组件影响下层组件的渲染性能
5. 叶子组件会频繁渲染更新，识别他们有助于理解和调试渲染性能问题

# 添加交互

## 事件处理

1. 通常在组件内部定义
2. `handler`开头命名
3. 传递给事件处理的函数是一个函数，而不是**调用**
4. 确保为事件处理程序使用适当html标签，比如是`button`而不是`div`
5. 事件捕获可以使用`onClickCapture`, 添加Capture 后缀
6. 

## state

1. React中变化且有记忆的数据称为**state**
2. React内部为组件创建数组，有state的对，维护state的索引
3. hooks必须组件顶层调用，或hooks顶层

## 渲染

1. React渲染为: 触发渲染 => 渲染组件 => 提交到dom
2. 触发渲染有 **初次渲染**和**状态更新**
3. 初次渲染会调用根组件
4. 后续渲染调用内部状态更新触发组件，递归到无嵌套组件
5. 渲染必须是纯函数

## 快照state

1. state值永远不会在一次渲染的内部发生变化
2. state值在React调用组件， 获取UI的快照的时候就固定了

## state

1. React等到事件处理函数所有代码完才执行更新，setState
2. React不会跨多个事件进行批处理
3. state中对象都是**只读的**
4. 为了重新渲染，需要创建新对象传递给setState
5. 简化使用immerjs
6. 数组state避免使用变异方法

# 状态管理

随着应用变大，更有意识的去关注状态的组织和管理、数据在组件之间的流动

## state响应输入

1. 删除不必要state
   - state是否矛盾?
   - 是否包含相同的信息?
   - 通过state反值是否得到另一个state
2. 开发组件时
   - 梳理所有视图状态
   - 触发更新state的时机
   - useState使用
   - 删除不必要state
   - 连接事件处理程序

##  构建state结构

构建state的原则:

1. 合并关联的state， 如果总是需要同步更新，不妨合并一个
2. 避免互相矛盾的state
3. 避免可计算的信息放入state
4. 避免重复state
5. 避免深度嵌套的state，最好是扁平化
6. 使用useState来包装props的数据，会失去响应式
7. 对于选择类型的state，应该保存索引而不是对象本身

## 组件状态共享

1. 相同state提升共享，通过props传递给子组件
2. 可以传递事件处理程序给子组件
3. 受控组件重要信息是props而不是自身驱动

## state保留、重置

1. 只要组件还被渲染在**UI树的相同位置**，那么就会保留state
2. 相同位置不同组件会被重置
3. 组件定义在最上层、不要把它们的定义嵌套
4. 同一个组件根据不同条件渲染(三元运算的渲染)，但是数据想要重置:
   -  分开书写，不用三元运算可重置
   -  使用key值
5. 移除的组件保留state
   - 全部渲染，css隐藏
   - 状态提升在父组件
   - 缓存在其他地方如localStorage

## reducer整合状态逻辑

1. 将组件所有状态更新逻辑整合到一个外部函数，就是reducer
2. 必须是**纯函数**
3. 每种action对应一种交互方式，即使引发了多种数据变化。 如重置表单比设置多种状态更简单

## context透传

1. Context允许父组件透传所有子组件
2. `createContext() => useContext(context) => context.Provider`
3. 写context之前先从props传递开始
4. 然后是通过很多层不用的组件传递，那么应该考虑抽象jsx作为children传递， 最后是context
5. 主题、当前用户、路由、状态管理会用到context

## reducer结合context

1. 为子组件创建state和dispatch的函数
   - 创建两个context，一个是state，一个是dispatch
   - 组件context使用reducer
2. 将信息传递代码移动到一个文件
   - 导出一个codeProvider提供context的组件
   - 导出useTask和useTaskDispatch自定义hooks

# 脱围机制

## ref

1. `useRef(initialValue)`返回`{ current: initialValue }`
2. 18之前通过forwardRef创建ref
3. ref不会触发更新渲染
4. ref不可以在渲染期间使用
5. 组件的**秘密口袋**，不用于渲染的可以放在这里
6. 脱围机制就是**跳出**react与外部系统交互的时候使用：
   - 储存timeoutId
   - 存储操作dom元素
   - 存储不会jsx计算的对象
7. ref回调可以批量操作动态绑定的ref列表
8. 可以像其他props一样，将ref绑定dom传递给子组件
9. 配合`useImperativeHandle`二次创建新的对象，例如只暴露focus获取焦点，不可以设置样式
10. state添加列表后滚动到最后一条，ref绑定dom的方式滚动。
   - 但是state并不会立刻更新dom，导致滚动位置不对
   - 可以使用`react-dom`的`flushSync`方法，强制更新dom
11. ref避免绑定React会更新的dom，可以绑定那些React没有理由绑定的dom

## Effect

1. 指定由渲染本身而不是特定事件引起的副作用
2. 允许在渲染结束后执行一段代码
3. **Effect**是与**外部系统**进行同步的，**你可能不需要使用Effect**
4. **如果没有外部系统，而是根据state调整状态，那么你并不需要Effect**
5. 指定的**所有依赖**值都与上一次渲染相同，React才会跳过调用Effect
6. 指定依赖项后Effect的行为也是不同的
   - 依赖为空，Effect会**在每次渲染后**执行
   - 依赖为空数组，Effect只会在组件挂载后执行
   - 依赖不为空，Effect会在组件挂载后执行，并且会在依赖项发生变化时重新执行
7. ref为依赖，不会触发Effect
8. 清理函数，在useEffect中返回函数来执行清理操作
9. Effect中fetch请求数据太过于手动化
    - 需要去请求去重、缓存响应、避免网络瀑布

### 移除不必要的Effect

1. 不必转换渲染所需要的数据
2. 不必处理用户事件处理程序
3. 一个值基于props或state计算而出，那么直接在渲染期间计算，**不要作为state**
4. 计算缓存属性，那么使用`useMemo`来缓存一次昂贵的计算
5. props变化需要重置state，那么可以使用组件的key值来视为不同组件来重置
6. 三级联动网络请求的(无法在事件处理程序获取的)使用Effect。
7. 子组件接受父组件的更新state事件来改变父组件的state，那么可以提升到父组件，也保持了数据的可侦测性
8. 订阅了一个外部的 store 数据，React针对性的提供了`useSyncExternalStore`的hooks

### 事件和Effect

1. Effect内部逻辑是响应式的
2. 事件处理程序是非响应式的
3. 可以将非响应式逻辑移入`Effect Event`中
4. 只在 Effect 内部调用 `Effect Event`
5. 不要将 `Effect Event` 传给其他组件或者 Hook
6. `experimental_useEffectEvent as useEffectEvent`

## 自定义hooks复用逻辑

1. 组件级共享逻辑
2. 必须`use`开头
3. 共享状态的逻辑，而不是状态
4. 重新渲染，hooks重新运行

# hooks

### useActionState

1. 根据表单动作的结果更新state
2. 之前版本是ReactDOM的`useFormState`
3. 用于更新提交后的错误信息，计数器增加
4. 第一个参数为异步函数，第二个参数为初始值

### useCallback

1. 组件递归重新渲染，组件传递了函数prop，那么memo对于组件的优化不起作用
2. 只用于性能优化， 缓存**函数**
3. 父组件**函数prop**传递给子组件
4. 第一个参数为缓存的函数，第二个参数为依赖项
5. **子组件memo包裹，父组件useCallback包裹**
6. **仅依靠state来更新state,那么可以包裹后记忆化回调更新state**

### useDebugValue

1. 在调试工具中显示自定义hooks的标签

### useDeferredValue

1. 用法：新内容加载期间显示旧内容、内容过时、延迟渲染UI
2. 第二个参数默认值，用于初渲染期
3. 值应该是原始值或渲染之外的对象，否则每次都不同
4. 可中断渲染
5. 本身不会引起延迟，原始渲染结束会立即使用新延迟值
6. 在提交到屏幕之前不会触发Effect

### useEffect

1. 不与外部系统同步，那么不需要Effect
2. 严格模式，会额外调用一次，确保setup函数可以被cleanup掉，如果导致问题，请实现cleanup函数
3. 删除不必要的对象、函数依赖
4. 如果在做视觉相关，那么应该将放在useLayoutEffect中
5. 如果Effect由交互引起，那么会在重新绘制前执行
7. 只在客户端运行，不会在服务端运行
8. 必须是响应式依赖
9. Effect中请求数据有缺点：
   - 不在服务器上运行
   - 导致网络瀑布
   - 意味着不会预加载和缓存数据
   - 不符合工效学，需要编写样板代码，避免竞争条件这样的bug

### useId

1. 生成传递给无障碍属性的唯一ID
2. 不可以生成列表key

### useImperativeHandle

1. 自定义由 ref 暴露出来的句柄
2. 如果是input只想暴露`focus`和`blur`方法

### useInsertionEffect

1. css-in-js的作者打造
2. 除非你正在使用 CSS-in-JS 库，否则不使用
3. **布局副作用触发之前将元素插入到 DOM 中**

### useLayoutEffect

1. 可能影响性能，尽可能使用 useEffect
2. 会在创建virtualDOM创建后，通知执行
3. 阻止渲染真实dom, 执行effect
4. 与useEffect区别
   - useLayoutEffect优先执行
   - 都是可以获取DOM，区别是浏览器是否渲染
   - useEffect会重新绘制，useLayoutEffect会执行回调后，决定是否重新绘制。

### useMemo

1. 重新渲染的时候缓存计算结果
2. 不会跳过首次渲染，只会**跳过不必要更新**
3. 可用于useEffect、作为props传入组件
4. **不可以在循环中使用** 

### useOptimistic

1. 帮助你更乐观地更新用户界面
2. 使应用程序在感觉上响应地更加快速

### useSyncExternalStore

1. 返回store 中数据的快照
2. 三个函数参数

### useTransition

1. 后台渲染部分UI
2. 没有参数
3. 返回`[isPending, startTransition: (callback) => void]`
4. 传递给startTransition的回调被称为actions
5. 任何在startTranstion调用的函数命名必须**Action**后缀
6. 场景:
   - 多tab切换期间状态
   - 输入框的实时搜索
   - 分页加载
   - 防抖节流替代方案

# 组件

1. fragment：`<></>`
2. Profiler测试性能：`<React.Profiler id="test" onRender={callback}>`
3. StrictMode严格模式：`<React.StrictMode>`
4. Suspense后备内容：`<React.Suspense>`

# api

### lazy

1. 组件初次渲染之前延迟加载组件代码

```jsx
const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
```

### memo

1. props 没有改变的情况下跳过重新渲染

```jsx
const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```
