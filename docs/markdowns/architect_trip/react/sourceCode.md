# JSX处理机制

1. 编写jsx为virtual DOM
2. virtual DOM 渲染为真实DOM
3. 视图更新 DOM-diff对比，更新差异。

## preview

可以使用babeljs.io 去try it out  使用勾选 presets react 来查看生成的虚拟dom。  

```
React.createElement(ele, props, ...children)


virtualDOM = {
    props:{},
    keu: null,
    type: 'tags',
    ref:null,
}
```

## 手写createElement

```
export function createElement(ele, props={}, ...children){
    let virtualDOM = {
        $$type: Symbol('react.compoment'),
        type:ele | null,
        props,
        key:null,
        children: children.length === 1 ? children[0] : children
    }
    return virtualDOM
}
```

## 创建真实dom

```
/* version16... */
ReactDOM.render(
  <>...</>,
  document.getElementById('root')
)

/* version 18... */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    ...
  </>
);
```

由于需要循环`props`对象，来给标签添加个个属性。 但是for..in..循环**私有、公有、可枚举、不是Symbol类型的key**, 可以处理一下。

**Object.getOwnPropertyNames(obj)**获取私有属性。

**Object.getOwnPropertySymbols(obj)**获取Symbol类型属性。‘

**Reflect.ownKeys(obj)**获取Symbol类型属性。

```
// 封装一个循环 props 的方法
function forin(obj, cb){
    if(obj === null || typeof obj !== 'object') throw new Error('obj is not a object')
    if( typeof cb !== 'function' ) throw new Error('callback is not a function')
    const keys = Reflect.ownKeys(obj)
    keys.forEach( key =>{
        let val = obj[key]
        cb(key, val)
    })
}

// render 方法
function render(virtualDOM, container){
    let { type, props } = virtualDOM
    if(typeof type === 'string'){
        // 动态创建标签
        let domEle = document.createElement(type)
        // 为标签设置子节点、props、style、key
        forin(props, (key, val) =>{
            if(key === 'className'){
                // className转为class
                domEle.classList.add(val)
                return
            }
            if(key === 'style'){
                // style给行内赋值
                forin(val, (attr, value) =>{
                   domEle.style[attr] = value
                })
                return
            }
            if(key === 'children'){
                // 处理子节点
                let child = val
                if( !Array.isArray(child) ){
                    child = [child]
                }
                child.forEach( item =>{
                    if(typeof item === 'string' | 'number'){
                        domEle.appendChild(document.createTextNode(item))
                        return
                    }else {
                        render(item, domEle)
                    }
                })
                return
            }
            container.appendChild(domEle)
        })
    }
}
```

# pureComponent浅比较

```
function isObject(obj){
    return obj !== null && /^(object|function)$/.test(typeof obj)
}

const shallowClone = function(objA, objB){
    /* 判断是不是对象 */
    if(!isObject(objA) || !isObject(objB)) return false
    /* 同一个堆内存 */
    if(objA === objB) return false
    let keysA = Reflect.ownKeys(objA),
        keysB = Reflect.ownKeys(objB)
    /* key数量是否相同 */
    if(keysA.length !== keysB.length) return false
    /* 如果objB没有这个属性  | 有属性但是value不同 return false */
    for(let i =0; i <keysA.length; i++){    
        let key = keysA[i]
        if(!objB.hasOwnProperty(key) || !Object.is(objA[key], objB[key]))return false
    }
}
```

# diff算法

遵循**统计比较、深度优先**原则