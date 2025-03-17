# 注意项

V5版本和V6(配合React18)的语法不同。

```bash
npm i react-router-dom
```

# 路由设计

1. hash原理：路由跳转改变hash值，监听hashChange后跳转内容。
2. history原理：H5的historyApi来进行页面地址切换。监听popState事件跳转

```ts
interface Ihistory {
    back: f,
    forward: f,
    go: f,
    length: .,
    pushState: f,
    replaceState: f,
    state: ''
}

window.history: Ihistory
```

# V5版本

## 注入基础路由

#### HashRouter组件

`import {HashRouter} from 'react-router-dom'`

```jsx
return <HashRouter>
        <NavWrapper>
            <nav>
                <Space wrap>
                    <a href="#/A">A</a>
                    <a href="#/B">B</a>
                    <a href="#/C">C</a>
                </Space>
            </nav>
        </NavWrapper>
</HashRouter>
```

#### Link组件

渲染结果仍然是a标签

`import {Link} from 'react-router-dom'`

```jsx
<Link to="/">A</Link>
<Link to="b">B</Link>
<Link to="c" replace>C</Link // 替换当前历史栈
```

#### Route组件

`import {Route} from 'react-router-dom'`

路由渲染组件. path是路由路径、component是组件。

`*`是404错误路由，放置在最后。

```jsx
<Route path='/' component={A}></Route>
<Route path='/b' component={B}></Route>
<Route path='/c' component={C}></Route>
```

**render属性方法：**

路由匹配后，render函数执行，返回值为render内容。

```jsx
<Route path='/b' render={ () =>{
    let isLogin = false
    return isLogin ? <B></B> : <Redirect to='/'></Redirect>
}}></Route>
```

#### Switch组件

`import {Switch} from 'react-router-dom'`

确保只有一个路由匹配到。

```jsx
<Switch >
    <Route path='/' component={A}></Route>
    <Route path='/b' component={B}></Route>
    <Route path='/c' component={C}></Route>
</Switch>
```

#### Redirect组件

`import {Redirect} from 'react-router-dom'`

重定向路由组件

```jsx
{/* <Redirect from="" to="/"></Redirect> */}
```

#### exact精准匹配

Route、Redirect组件属性，对路由/from路由进行精准匹配。

## 多级路由

在一级路由组件下 设置Link、Route、Redirect。

```jsx
 <div className="menu">
    <Link to='/a/demo1'>demo1</Link>
    <Link to='/a/demo2'>demo2</Link>
    <Link to='/a/demo3'>demo3</Link>
</div>
<hr />
<div className="view">
    <Redirect from="/a" to="/a/demo1"></Redirect>
    <Route path='/a/demo1' component={Demo1}></Route>
    <Route path='/a/demo2' component={Demo2}></Route>
    <Route path='/a/demo3' component={Demo3}></Route>
</div>
```

## 统一管理router路由表

新建router文件夹，新建routes.js来配置路由规则

```js
/* 
    1. redirect: true 重定向 渲染 Redirect
    2. from  来源地址
    3. to    重定向地址
    4. exact: 精准匹配
    5. path: 路径
    6. component 渲染组件
    7. name：命名路由
    8. meta： 路又远信息
    9. children：[]  子路由
*/

import A from "../views/A"
import B from "../views/B"
import C from "../views/C"
import Demo1 from "../views/a/Demo1"
import Demo2 from "../views/a/Demo2"
import Demo3 from "../views/a/Demo3"

const routes = [
    {
        redirect: true,
        from: '/',
        to: '/a',
        exact: true
    },
    {
        path: '/a',
        name: 'A',
        component: A,
        meta: {
            title: '这是首页默认Demo内容'
        },
        children: [
            {
                redirect: true,
                from: '/a',
                to: '/a/demo1'
            },
            {
                path:'/a/demo1',
                name: "DEMO1",
                component: Demo1
            },
            {
                path:'/a/demo2',
                name: "DEMO2",
                component: Demo2
            },
            {
                path:'/a/demo3',
                name: "DEMO3",
                component: Demo3
            },
        ]
    },
    {
        path: '/b',
        name: 'B',
        component: B,
        meta: {
            title: '这是B'
        }
    },
    {
        path: '/c',
        name: 'C',
        component: C,
        meta: {
            title: '这是C'
        }
    },
]

export default routes
```

新建index.js来新建RouterView渲染方法：

```jsx
import { Switch } from "react-router-dom/cjs/react-router-dom"
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min"

const RouterView = function (props) {
    let { routes } = props
    return <Switch>
        {
            routes.map((item, index) => {
                let { redirect, from, to, path, component, exact } = item
                let config = {}

                if(redirect){
                    config.to = to
                    if(from)config.from = from
                    if(exact)config.exact = exact
                    return <Redirect key={index} {...config}></Redirect>
                }
                config = {path}
                if(exact)config.exact = true
                return <Route key={index} {...config} component={component}></Route>
            })
        }
    </Switch>
}

export default RouterView
```

组件替换来进行渲染。

```jsx
<RouterView routes={routes}></RouterView>
```

二级路由则需要引入二级路由的Routes传入参数。

## 路由懒加载

从react中引入lazy `import {lazy} from 'react'`,

配合Suspense组件来进行懒加载

```jsx
component: lazy(() => {
    return import('../views/B')
}),

// router/index.js

return <Route key={index} {...config} render={ () =>{
    return <Suspense>
        <Component></Component>
    </Suspense>
}}></Route>
```

## 获取route信息

v5版本中，**路由匹配的组件**，路由默认给组件传递三个属性:

1. history
2. location
3. match

使用render渲染组件，则会给render函数来传入三个属性，需要手动给组件传递过去。

**函数组件可以通过hook函数获取：** useHistory、useLocation、useRouteMatch。

**类组件且不被Route渲染组件怎么获取Route信息:** 

1. 自己手写HOC包裹
2. V5版本自带的withRouter HOC组件。

```jsx
import {withRouter} from 'react-router-dom'

export default withRouter(Com)
```

## 路由跳转、传参

跳转有： link和编程式导航两种方案。

#### 编程式导航 history.search

? 后拼接传参。

```js
history.push({
    pathname: 'c',
    search: qs.stringify({
        id: 'xx',
    })
})

通过location.search 接受
```

#### 动态路由

```js
 {
    path:'/a/?:id/?:name',
    name: "DEMO3",
    component: Demo3
},

history.push({
    pathname: '/a/100/nam'    
})

通过match.params来获取
```

#### push(state)-刷新丢失

```jsx
history.push({
    pathname: 'c',
    state: {
        id: 'xxx',
        name: 'xqwe'
    }
})

location.state获取
```

## Link和NavLink

NavLink有下面特性： 

1. 自动加一个className="active"属性

# v6版本

语法改动较大：

| api | 改动 | 备注 |
| --- | --- | --- |
| `Switch` | 移除 | 默认匹配一项 |
| `exact` | 移除 | 默认匹配精准 |
| `Redirect` | 改动 | Navigate默认遇到就会跳转、必须放在最下面的404，取消from |
| `withRouter` | 完全移除 | - |
| `Routes` | 改动 | 所有route必须放在routes下 |
| `element={component}` | 移除 | - |
| `render` | 移除 | - |
| `<Navigate>` | 改动 | 必须在Route内设置replace |
| 嵌套路由 | 改动 | 插槽route + `<Outlet />` |

## 基本流程

react-router基本流程如下：

> 1. 通过**createBrowserRouter**实例化router对象
> 
> 1. 通过**RouterProvider组件**使用路由

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

## 路由导航

路由的跳转及传参。 分为声明式导(jsx)航和编程式导航(js)

### 声明式

最后解析为**a标签**。

```js
<Link to="/about">跳转about</Link>
```

### 编程式

通过**useNavigate**hooks， 调用返回值跳转。

```js
import { useNavigate } from "react-router-dom"
const Login = function(){
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => navigate('/about')}>点击跳转</button>
    </div>
  )
}
```

## 嵌套路由

配置路由表的children属性， 使用**Outlet**组件， 渲染出口。

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/about',
    element: <About />,
    children: [
      {
        path: '',
        element: <Home />
      }
    ]
  },
])
```

**组件使用：**

```js
const About = function(){
  return (
    <>
      <div>About</div>
      <hr></hr>
      {/* 子路由出口 */}
      <Outlet></Outlet>
    </>
  )
}
```

### 索引路由

> index属性设置为true。

目前简单可以理解为**父路由匹配但其子路由都不匹配时(意味着只存在于嵌套路由)**，它就是默认的子路由。

```js
{
    path: '/about',
    element: <About />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
}
```

## 404路由

同vue，使用通配符设置为router的最后一项则为404路由

```js
{
    path: '*',
    element: <NotFound />
},
```

## hash路由模式

使用**createBrowserRouter**替换成**createHashRouter**即可。

## 路由懒加载

> 1. react中引入组件时， lazy函数包裹
> 1. react内置组件**Suspense**, 包裹jsx元素

```js
import { lazy } from 'react'
const Home = lazy(() => import('../views/Home'))
```

---

**router代码如下：**

```js
const router = createBrowserRouter([
  {
    path: '/about',
    element: <About />,
    children: [
      {
        index: true,
        element: <Suspense fallback={'loading'}><Home></Home></Suspense>
      }
    ]
  },
])
```