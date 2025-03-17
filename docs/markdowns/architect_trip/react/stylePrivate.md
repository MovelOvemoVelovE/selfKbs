## css-module
1. `import demo from './demo.module.css'`
2. 使用demo.xxx替换className进行样式使用
   
```html
<div className={sty.wrapper}>
    <div className={sty.title}>这里是导航栏</div>
</div>
```
全局样式则可以使用`:global`
```css
:global(xxxselector){
    xxx
}
```
使用`composes:xxx` 进行继承样式

```css
.demo {
    composes: parentSelector,
    ...xxxStyle
}
```

## react-jss

1. `npm i -D-S react-jss`
2. **不能使用于类组件中，除非函数组件包裹**
3. 样式写入js
4. 调用`createUseStyles`返回对象
5. `useStyles()`使用

```js
import { createUseStyles } from 'react-jss';
// 返回创建一个hook函数
const useStyles = createUseStyles({ 
    wrapper: {
        backgroundColor: 'pink'
    },
    title: {
        fontSize: '20px',
        color: 'red'
    },
    list: {
        fontSize: '15px',
        '& :hover': {
            color: 'green'
        }
    }
})
// 返回一个对象
let { title, list, wrapper } = useStyles()


let { list } = useStyles({
    size: 15,
    colorHover: 'green'
})
list: props => {
    return {
        fontSize: props.size,
        '& :hover': {
            color: props.colorHover
        }
    }
}

// 高阶组件包裹类组件
const proxyComponent = function(Component){
    return function HOC(props){
        let styleObj = useStyles()
        return <>
            // 类组件
            <Component {...props} {...styleObj}></Component>
        </>
    }
}
```
## styled-components

1. `npm install -D styled-components`
2. `vscode-styled-components`vscode插件

```js
import styled from 'styled-components'

export const NavSty = styled.nav`
    background-color: #ccc;
    .title {
        font-size: 24px;
        color: lightblue;
        background-color: ${props => props.bgc}
    }
`
class Nav extends React.Component {
    render() {
        return <NavSty>
            <div className='wrapper'>
                <div className='title'>这里是导航栏</div>
            </div>
        </NavSty>
    }
}
```