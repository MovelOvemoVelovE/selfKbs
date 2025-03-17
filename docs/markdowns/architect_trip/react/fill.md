### 使用不安全生命周期

可以使用` UNSAFE_componentWillMount(){}` 消除警告。

使用`<React.StrictMode></React.StrictMode>` 则是直接红色警告。

### vscode解析`@/xx`路径

**根目录/jsconfig.json**

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  }
}
```

## hooks使用规则

1. 只能在组件或者其他hooks调用
1. 只能组件顶层使用，不能在下级作用域
2. **不要在循环、条件、嵌套函数中调用hooks。**

## 生命周期

组件在创建、销毁、更新阶段**自动执行的函数，提供了逻辑介入的时机。**

#### 1.组件渲染：

` pWillMount => pRender => CwillMount => CdidMount => pdidMount`

#### 2.组件更新:
 `pshouldUpdate => pwillUpdate => prender => cWillReciveProps => cShouldUpdate => cwillUpdate => crender => cdidUpdate => pdidUpdate`
#### 3.组件卸载: 

`pwillUnmount => cwillUnmount => cdidUnmount => pdidUnmount`


## 合成事件

1. 17版本以后：对容器的`id=root`对捕获和冒泡都进行了委托。 
2. 17版本之前：只是对`document`的冒泡阶段进行了委托。
3. 没有给元素绑定事件，而是等待#root调用

## class组件更新逻辑

1.  `shouldComponentUpdate(nextProps, nextState):boolean`。 **返回一个Boolean，来决定是否进行视图更新。**
2. `UNSAFE_componentWillUpdate(nextProps, nextState)`。    **状态未修改**
3. 修改状态、属性
4. render() 组件更新。
5. 触发`componentDidUpdate(prevProps)` 
6. `this.forceUpdate()`会忽略`shouldComponentUpdate()`。
7. 子组件全部更新后，更新父组件。
8. `UNSAFE_componentWillReceiveProps`, 接受最新props之前
9. 重新1-8

## pureComponent

`pureComponent`预定义了`shouldComponentUpdate`函数。 在钩子内， 会被新老属性、状态进行**浅比较**。  

## 版本区别

1. v18.x无论什么时候setState快照， 而v16.x出现在**定时器、事件监听器时**是同步操作.
