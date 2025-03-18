---
theme: vuepress
highlight: vs2015
---
# 简介

Redux是React常用的**集中状态管理工具**， 可独立运行。

类似于pinal、vuex。

# 管理流程

1. **定义reducer函数**

1. **Redux.createStore(reducer函数)**，**生成一个实例对象store**

1. **store.subscribe**订阅数据变化

1. **store.dispatch**提交action对象，发布消息，触发数据变化

1. **store.getState**方法获取最新状态。

# [旧版核心包]

> 旧版官网声明**已过时**，但是在老项目中仍然会遇到。

因为redux是js的状态管理工具(并非必须依赖于框架)，所以整体核心简介流程(旧版核心包)如下：

```js
import redux from 'redux'
// 第一步、定义reducer函数
// 定义默认初始值
function reducer(state = { count: 0 }, action) {
//action分发逻辑
  switch (action.type) {
    case 'INC':
      return state.count + 1
    case 'DEC':
      return state.count - 1
    default:
      return state.count
  }
}
// 第二步、createStore函数，生成实例化对象
const store = redux.createStore(reducer)
// 第三步、subscribe函数，订阅store变化
store.subscribe(() => {
  console.log(store.getState())
  // 第五步、 getState函数，获取store中的state
  document.getElementById('count').innerText = store.getState().count
})
// 第四步、dispatch函数，派发action，发布消息
const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  store.dispatch({ type: 'INC' })
  store.dispatch({ type: 'DEC' })
})
```

## 安装

```bash
npm i -D-S redux
```

## 批量使用

通过context上下文全局注入。后通过获取store来全局操作

```html
<clsContext.Provider value={store} />
```

## 工程化

### 1. combineReducers合并函数

> 创建多个reducer， 最后合并reducer传入到store中。

```js
// 引入合并包
import { combineReducers } from "redux";
import person from "./person";
import vode from "./vode";
const reducer = combineReducers({
    vode,
    person
})

export default reducer
// 最后的state结构是：
// vuex中的开启命名空间一般
state = {
    vode: {
        xxx
    },
    person: {
        xxx
    }
}
```

### 2. actions常量

新建actions-types.js文件，里面存在统一的行为标识**常量**。

```js
export const VOTE_OPP = 'VOTE_OPP'
export const VOTE_SUP = 'VOTE_SUP'
```

### 3. actions管理

> 虽然多此一举看起来， 但是对**react-redux**有意义。

将**actions/someModule.js**文件修改如下:

```js
// 各个模块的action命名如下: 
const vodeActions = {
    supAdd(){
        return {
            type: 'VODE_SUP'
        }
    },
    oppAdd(){
        return {
            type: 'VODE_OPP'
        }
    }
}
export default vodeActions
```

---

**actions-types/index.js**文件如下：

```js

import personActions from "./person";
import vodeActions from "./vode";

const actions = {
    person: personActions,
    vode: vodeActions
}

export default actions
```

---

**各个组件的使用如下：**

```js
store.dispatch(actions.person.oppAdd)
```

# react-redux

链接react组件和redux的包。

> 1. 内置组件**Provider**
> 
> 1. 事件池无需手动注入react-redux自动处理组件更新
> 
> 1. 把需要的信息传递组件

## 安装

```bash
npm i react-redux
```

## provide注入数据源

```jsx
import { Provider } from 'react-redux'
<Provider store={store}>
    <Component />
</Provider>
```

## connect使用数据-mapStateToProps

`connect(mapStateToProps, mapDispatchToProps)(Component)` 来使用状态

第一个参数参数为state，通过return 一个对象来选择 注入的状态。

```js
export default connect(state =>{
    console.log(state);
    return {
        ...state
        // ...state.vode   // 选择某个reducer的state return也是可以的。
    }
})(Demo1)
```

使用的话则是:

```js
let {vode, person} = this.props

<p>总参与人数: {vode.sup + vode.opp}人</p>
<h2>名字是: {person.name}</h2>
```

## 派发connect-mapDispatchToProps

以下是标准写法：

```js
<Button type='primary' onClick={ this.props.supAdd }>点击支持</Button>

export default connect(
    null,
    dispatch =>{
        return {
            supAdd(){
                dispatch(actions.vode.supAdd())
            },
            oppAdd(){
                dispatch(actions.vode.oppAdd())
            }
        }
    }
)(DemoFooter)
```

封装actions集中管理、派发标识宏管理则是为了以下的模块缩写。

利用封装好的actions集中管理来进行替换mapDispatchToProps写法， 内部调用 redux.actionsCreators(actions.xxxx, dispatch)方法来进行合并。

```js
export default connect(
    null,
    actions.vode,
    <!-- 相当于以下对象变为了标准写法 -->
    // {
    //     supAdd() {
    //         return {
    //             type: VODE_SUP
    //         }
    //     },
    //     oppAdd() {
    //         return {
    //             type: VODE_OPP
    //         }
    //     }
    // }
)(DemoFooter)

// 创建actions的同名函数。
bindActionCreators(actions.vode, dispatch) => dispatch(actionsCreators.apply(this, arguments))
```

# 中间件

安装后传入applyMiddleware中

```js
import logger from "redux-logger";

const store = createStore(
    reducer,
    applyMiddleware(logger)
)
```

## redux-logger-日志

`npm i -D-S redux-logger`

每次派发，输出派发日志。 对之前的state、行为、之后的state等进行调试。

## redux-thunk 异步

`npm i -D-S redux-thunk redux-promise`

actions异步操作后修改state，直接写入`async/await`会报错。

return 函数，异步操作后，手动dispatch派发。

```js
supAdd(){
    return async dispatch =>{
        await getData()
        return dispatch({
            type: VODE_SUP
        })
    }
},
```

## redux-promise

`npm i -D-S redux-promise`

不需要修改解构偶，直接使用async/await语法糖就可以实现。

```js
async oppAdd(){
    await getData()
    return {
        type: VODE_OPP
    }
}
```

# redux-toolkits

官网要求编写redux逻辑的方式，简化书写方式。

```
npm install @reduxjs/toolkit
```

redux Toolkie官方强烈推荐的Redux开发工具集。 简化redux开发。

包括配置store、定义reducer、组件更新事件池、slice状态，无需编写任何action Creator或者action types、自带redux-thunk。

## 仓库流程

整体使用核心为下：

**在模块仓库中代码如下：**

```js
// 引入切片函数
import { createSlice } from "@reduxjs/toolkit";
// 1. 创建 切片的子仓库
const counterStore = createSlice({
  // 子仓库 命名空间
  name: 'counter',
  // 子仓库初始化数据
  initialState: {
    count: 0
  },
  // 子仓库修改数据的同步方法
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    }
  }
})
// 解构出创建action对象的函数 (actionCreator)
const { increment, decrement } = counterStore.actions
// 获取reducer函数
const counterReducer = counterStore.reducer
// 导出创建action对象的函数和reducer函数
export { increment, decrement }
export default counterReducer
```

---

**根仓库代码如下：**

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counter";
// 创建主仓库
const store = configureStore({
  reducer: {
    counter: counterReducer
  },
});

export default store
```

## configureStore

```js
import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import thunk from "redux-thunk";

const store = configureStore({
    reducer:{

    },
    middleWareArray: [logger, thunk] // 默认thunk中间件
})

export default store
```

## createSlice

```js
import { createSlice } from "@reduxjs/toolkit";

const demoSlice = createSlice({
    // slice name
    name: 'demo',
    // setting slice initialState
    initialState: {
        name: 'xx',
        age: 23
    },
    // change actions
    reducer: {
        getInfoList(state, action) { // 不需要克隆state修改 使用了immer库
            state.name = action.name
        },
        changeAge(state, { payload }) {
            state.age = payload
        }
    }
})

export default demoSlice.reducer
```

## actionCreator

 需要将actionsCreator导出，在dispatch时使用。

```js
export let { getInfoList, changeAge } = demoSlice.actions
export default demoSlice.reducer
```

# 使用数据及派发

## useSelector获取数据

```jsx
import { useSelector } from 'react-redux';

function Counter() {
  const counter = useSelector(state => state.counter);
  return (
    <div>
        { counter.count}
    </div>
  );
}
```

## useDispatch派发action

```jsx
import { useSelector, useDispatch } from 'react-redux';
// 引入模块内暴露的 actionCreator， 调用后生成action
import { decrement, increment } from './store/modules/counter';

function App() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
        <button onClick={() => dispatch(decrement())}>数字减一</button>
        { counter.count }
        <button onClick={() => dispatch(increment())}>数字加一</button>
    </div>
  );
}
export default App;
```

> 实际开发是伴随异步操作的，那么又该如何dispatch?
> 
> 方案是：**不需要直接导出actionCreator而是进行异步后导出一个返回值为函数的函数**

```js
// 解构出创建action对象的函数 (actionCreator)
const { increment, decrement } = counterStore.actions
// 异步操作
const fetchIncre = function(){
  return async (dispatch) => {
    const res = await fetch('http://localhost:3000/api/increment')
    const data = await res.json()
    dispatch(increment(data))
  }
}
export { fetchIncre }

// 使用
import { useDispatch } from 'react-redux';
import { fetchIncre } from './store/modules/counter'
function Demo() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchIncre())
    })
}
```

# 源码分析

```js
import React, { createContext } from "react"
const reduxContext = createContext('redux')

/* Provider注册仓库 store注入、children渲染 */
export function Provider(props) {
    let { store, children } = props
    return <reduxContext.Provider value={{ store }}>
        {children}
    </reduxContext.Provider>
}

/* 获取redux上下文， 公共状态、方法派发传递给组件。 
组件更新redux事件池 */
export function connect(mapStateToProps, mapDispatchToProps){
    if(!mapStateToProps){
        mapStateToProps = () =>{
            return {}
        }
    }
    if(!mapDispatchToProps){
        mapDispatchToProps = (dispatch) =>{
            return {
                dispatch
            }
        }
    }
    // injectComponent => 注入组件
    return function curring(injectComponent){
        // 高阶组件导出
        return function HOC(){

        }
    }
}
```
