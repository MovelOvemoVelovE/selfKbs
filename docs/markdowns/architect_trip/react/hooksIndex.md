---
highlight: vs2015
theme: vuepress
---
## useState

Q: **react16.x的 同异步 等同于 setState 一样嘛？**
A: 是的，放在合成事件为异步，放在定时器、事件监听器内是同步的。

## useActionState

```js
 const [state, formAction] = useActionStat(
  // 表单提交时触发的异步函数
  async (previousState, formData){
    console.log(formData.get('input'))
    return previousState + 1
  },
  // 初始值
  0,
  // 是否绑定到URL
  "#search"
  )
```

## useReducer

```js
import { useReducer } from "react";

let initialState = {
  age: 23
}
// 定义reducer函数，根据不同action处理 返回状态
const reducer = function (state, action) {
  state = { ...state }
  switch (action.type) {
      case "plus":
          state.age++
          break;
      case 'minus':
          state.age--
          break
      default:
          break;
  }
  return state
}
const Home = function (props) {
  let [state, dispatch] = useReducer(reducer, initialState)
  const handler = (actionType) => {
      dispatch({
          type: actionType
      })
  }
  return (
    <div>
      <div color="magenta">{state.age}</div>
      <hr />
      {/* 点击按钮，操作数据 */}
      <button onClick={handler.bind(null, 'plus')}>点击增加</button>
      <button onClick={handler.bind(null, 'minus')}>点击减少</button>
  </div>
  )
}
export default Home
```

## useCallback

## useContext

```js
const theme = useContext(ThemeContext)
```

## useDebugValue

```js
const deferredValue = useDeferredValue(data, data => data.toDataString())
```

## useDeferredValue

```jsx
const [query, setQuery] = useState('')
const deferredQuery = useDeferredValue(query, '')
return (
  <>
    <input type="text" value={query} />
    <hr />
    <Suspense fallback={<h2>Loading...</h2>}>
      <SearchResults query={query} />
    </Suspense>
  </>
)
```

## useImperativeHandle

```js
function MyInput({ ref }){
  let inputRef = useRef(null)
  useImperativeHandle(ref, () => {
      return {
        myFocus(){
          inputRef.current.focus()
        }
      }
  })
  return (
    <>
      <input type="text" ref={inputRef} />
    </>
  )
}
function App() {
  const ref = useRef(null)
  function handleClick(){
    ref.current.myFocus()
  }
  return (
    <>
      <MyInput ref={ref}></MyInput>
      <hr />
      <button onClick={handleClick}>点击</button>
    </>
  )
}
```

## useInsertionEffect

```js
import { useInsertionEffect } from 'react';
// 在你的 CSS-in-JS 库中
function useCSS(rule) {
  useInsertionEffect(() => {
    // ... 在此注入 <style> 标签 ...
  });
  return rule;
}
```

## useLayoutEffect

## useMemo计算属性

```jsx
let ratio = useMemo(() =>{
    let total = sup + opp
    let ratio = '--'
    if (total > 0) ratio = (sup / total * 100).toFixed(2) + '%'
    return ratio
}, [sup, opp])
```

## useOptimistic

```js
// form表单提交事件
async function formAction(formData) {
  addOptimisticMessage(formData.get("message"));
  formRef.current.reset();
  await sendMessage(formData);
}
// 创建Optimistic Message
const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (state, newMessage) => [
    ...state,
    {
      text: newMessage,
      sending: true
    }
  ]
);
// 使用optimistic messages 循环渲染
{optimisticMessages.map((message, index) => (
  <div key={index}>
    {message.text}
    {!!message.sending && <small>（发送中……）</small>}
  </div>
))}
```

## useRef-获取dom元素

```jsx
function App() {
  // 使用useRef hook
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.focus();
  };
  return (
    <div className="App">
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </div>
  );
}
```

## useSyncExternalStore

```js
function subscribe(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}
function getSnapshot() {
  return window.navigator.onLine
}
const isOnline = useSyncExternalStore(subscribe, getSnapshot /* 只在服务端渲染有用的第三参数 */)
return (
  <>
    <h1>{ isOnline ? 'current is online' : 'disconnected' }</h1>
  </>
)
```

## useSelector/useDispatch--redux

redux工具的2个hooks，用于获取数据、派发action

# react-router-dom--路由

| api | 备注 |
| --- | --- |
| `useLocation` | 获取路由路径 |
| `useSearchParams` | 获取参数 |
| `useParams` | 命名路由获取参数 |
| `useNavigate` | 路由跳转 |
| `useHistory` | 获取历史栈 |
| `useRouteMatch` | 获取路由匹配项 |



