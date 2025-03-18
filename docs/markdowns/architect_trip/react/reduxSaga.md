# 简介

一个redux的中间件。 异步派发管理

# redux、redux-thunk、redux-saga

redux是 action => reducer => state。

1. action只能处理同步操作
2. action是一个纯对象
3. reducer是一个纯函数(只使用了自己作用域的函数)

redux-thunk可以实现异步处理，但是将异步操作分散给了开发个人，不利用管理。

redux-saga 则有以下优势：

1. # 流程

**原本在redux中，每一次派发直达 reducer，只可以同步派发。**

使用了saga后，创建监听器，监听**每一次派发**。

当任务被监听到，指定工作者处理异步操作，结束后通知reducer执行； 当任务没有被监听，直接走reducer执行。

# 使用

`npm i -D-S redux-saga`

## createSagaMiddleware()

```
import createSagaMiddleware from "redux-saga";
const sagaMiddleware = createSagaMiddleware()

// 使用saga中间件
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
```

## saga.js

组件中dispatch， 派发的action的type命名需要注意一个细节。

- 每一次派发都会reducer执行，再去saga监听执行。 如果是同步派发，则和reducer命名一致
- 而在异步派发中， 需要走saga监听，所以就需要命名不同。

```
/* 创建监听器 监听dispatch */
const saga = function* (){

}

export default saga
```

## run(saga)

在设置了createStore(reducer, applyMiddleware(sagaMiddleware))之后来使用run来启动saga中间件，创建监听器

`sagaMiddleware.run(saga)`