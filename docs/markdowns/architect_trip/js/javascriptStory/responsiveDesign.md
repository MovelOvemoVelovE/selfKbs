---
theme: vuepress
highlight: vs2015
---
> 响应式web设计可以让网站同时适配 **不同屏幕、设备**。    
>
> 使网站的布局及功能随着用户使用环境(设备/浏览器能力、输入方式、分辨率)的不同，而对应的变化适应。
>
> 参考：《响应式Web设计HTML5和CSS3实战》

# 一、媒体查询

媒体查询是css中的 **条件处理** 语句。

## 语法

书写媒体查询，原则上为设置一套基准样式，而后媒体查询覆盖掉样式表中部分。

利用媒体查询，应该是小屏幕以原生样式显示，而不是在某个断点处，让用户去缩小和放大。

### 1.基础语法

```css
.body {
    /* 样式 */
}
@media screen and (min-width: 768px){
    /* 样式 */
}
```

### 2. link标签

link标签可以设置 **media** 属性指定 **设备类型、能力和特性** 

```html
<!-- 
    开头为not是 逆条件
    逗号分隔为多个媒体查询表达式，等同于`||`
 -->
<link rel="stylesheet" media="not screen and (orientation: portrait), projection" href="portrait-screen.css" />
```

### 3. @import

```
@import url('iphone.css') screen and (min-width: 750px)
```

## 覆盖特性

> 1. 除scan和grid都可加入`min-`和`max-`前缀。
> 1. 媒体查询4级废弃了一些特性： device-width、aspect-ratio

媒体查询可以测试那些特性? :

1. width：视口宽度(作者认为是使用最多的特性)

1. height: 视口高度

1. device-width(height): 渲染表面/设备屏幕宽度(高度)

1. orientation： 设备方向水平(landscape)还是垂直(portrait)

1. aspect-ratio: 视口宽高比

1. color(颜色组分位深)、color-index(设备颜色查找表条目数)、monochrome(单色帧缓冲中每个像素的位数)、resolution(分辨率)、scan(电视的逐行还是隔行扫描)、grid(基于栅格还是位图)


## 注意事项

1. 只要链接了的css文件，**都会被下载**， 如果涉及到页面渲染所需文件，则会 **阻塞** 暂停页面的首次渲染。

1. 通过link链接媒体查询的css文件，多次请求http请求会影响页面的加载速度。
    
    - 涉及性能优化，这里的http请求并不指望。需要确认：图片压缩过、脚本拼接/缩短过、资源gzip压缩过、静态资源CDN缓存过、CSS多余规则清除过。
    - 再去考虑是否媒体查询分隔开引入。
    
1. 一个样式就写一个媒体查询，还是在一个同类媒体查询写入所有涉及到样式，冗余方面无需考虑,gzip压缩可以无视这种微小查询。 

## <meta>标签

<meta>标签是网页与 **移动浏览器** 的接口，告诉浏览器，如何渲染页面。

```html
<!-- 内容放大为实际大小的两倍 页面宽度等于设备宽度 -->
<meta name="viewport" content="initial-scale=2.0,width=device-width"/>

<!-- 最大放大为设备宽度3倍 最小缩小为设备宽度一半 -->
<meta name="viewport" content="width=device-width,maximum-scale=3,
minimum-scale=0.5" />

<!-- 内容为1倍正常 不允许用户缩放 -->
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
```

> W3C尝试在css中引入 `@viewport {width:320px}`来

## 媒体查询四级

### 1. 无js样式

```css
@media (scripting: none){
    /* 无js样式 */
}

@media (scripting:enabled){
    /* 有js样式 */
}
```


### 鼠标等交互

```css
/* 手指、游戏机指针等非精准控制 */
@media (pointer: coarse){}

/* 鼠标、笔等设备 */
@media (pointer: fine){}
```

### 悬停

```css
@media (hover: none){}

/* 可以悬停但是需要一定启动步骤 */
@media (hover: on-demand){}

@media (hover){}
```

### 环境媒体

根据环境光线亮度特性设置不同样式。

```css
@media (light-level: normal) { 
 /* 针对标准亮度的样式 */ 
} 
@media (light-level: dim) { 
 /* 针对暗光线条件的样式 */ 
} 
@media (light-level: washed) { 
 /* 针对强光线条件的样式 */ 
}
```


# 二、弹性布局/响应图片

媒体查询针对 **设计断点** 切换样式， **弹性布局** 针对断点之间有个平滑过渡。

> 针对小屏幕，核心思想就是内容展示在长条内，左右侧功能栏隐藏未画为外元素。 **点击或某种方式触发后展示出来**

## 既有布局的缺点

### 行内块

由于 **html代码对行内块的换行、空格、缩进可能会转化为实际空白、css定义的内边距及填充、盒模型、字体和行高** 导致有空白

垂直居中及自填充也不容易

### 浮动

高度丢失、宽度百分比精度丢失导致有空隙

### 表格及表元

`display: table(table-cell)`不会对HTML布局产生影响

有跨平台绝对一致，且能做到一个元素在另一个元素的绝对垂直居中

`table-cell`在`table`样式元素中间距恰到好处，且向后兼容IE7

**限制总体来说** ： 

- 完美垂直居中，表元必须被包含在一个表格元素

- 表元不能包在多行上

## flexbox

> IE9及以下不支持flexbox
> 
> 使用flexbox可以使用postcss 的autofixer自己增加前缀，否则就需要为每个厂商都加上对应前缀

flexbox超能力总结为：

1. 方便垂直居中

1. 元素视觉次序(展示顺序)

1. 自动插入空白、对齐元素、填充元素间空白

**关键特性** ： **方向、对齐、次序、弹性**

### 改变次序

css诞生以来，只有一种方法可以改变HTML元素的视觉排序。

将元素包含在`display:table`的容器内， 切换内部元素的`display`：

1. 放在底部: `display: table-footer-group`

1. 头部： `display: table-header-group`

flex则直接通过`order`来设置次序展示问题

## 响应式图片

**浏览器只有打开和渲染时才知道设备的特性、只有开发者知道自己手里有几张图片。** 根据场景提供合适图片并不容易。

### 1. 通过srcset切换分辨率

**对于支持srcset** 的浏览器，通过逗号分隔的描述让浏览器加载哪一个。

分别为：图片名、分辨率说明。

```html
<img src="scones_small.jpg" srcset="scones_medium.jpg 1.5x, scones_large.jpg 2x" alt="Scones taste amazing">
```

> 上面是针对三种屏幕进行的响应式图片： 
> 
> 普通是small，1.5倍分辨率和2倍分辨率使用不同的图片。
> 
> **但是存在问题，1440像素的1x屏幕和 480像素 3x屏幕获取的图片是一样的**

### 2. srcset和sizes联合

通过设置 **sizes** 属性，**设置图片展示的宽度**

```html
<img srcset="scones-small.jpg 450w, scones-medium.jpg 900w" 
sizes="(min-width: 17em) 100vw, (min-width: 40em) 50vw" src="sconessmall.jpg" alt="Scones">
```


> 以上的srcset属性中`w`后缀告诉浏览器大概有多少像素。
> 
> sizes则表明在宽度大于17em，图片满屏宽，而大于40em时，半屏展示。

### 3. `<picture>`元素

利用`<picture>`元素配合`<source>`和`<img>`元素针对 **媒体查询表达式** 来提供不同的图片。

```html
<picture> 
 <source media="(min-width: 30em)" srcset="cake-table.jpg"> 
 <source media="(min-width: 60em)" srcset="cake-shop.jpg"> 
 <img src="scones.jpg" alt="One way or another, you WILL get 
cake."> 
</picture>
```

> 1. `<picture>`是一个元素，为包含的`<img>`提供便利
> 
> 1. 样式是要为`<img>`添加，如果浏览器不支持或没有合适的媒体查询定义，`<img>`则是作为后备内容存在。 **不可以忽略掉`<img>`标签**
> 
> 1. 通过`<source>`标签的`media`属性提供媒体查询表达式提供不同图片。
> 
> 1. `srcset`属性是不同媒体查询的提供图片

### 4. webp格式

webp格式是新格式，比png压缩质量、大小等更完美。但是存在兼容性问题。

可以配合`<picture>`标签和`source.type`属性来提供图片优先级。

```html
<picture> 
 <source type="image/webp" srcset="scones-baby-yeah.webp"> 
 <img src="scones-baby-yeah.jpg" alt="Again, you WILL eat cake."> 
</picture>
```

# 三、HTML5

现阶段大部分网站为HTML5，通过引入腻子脚本也可以使IE9以下正确渲染新增加的元素。

## HTML5结构

以下代码包含了HTML5文档的写法：

```html
<!DOCTYPE html> 
<html lang="en"> 
<head> 
<meta charset=utf-8>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
```

1. doctype是告诉浏览器文档类型的手段

1. doctype声明后就是文档的根元素，使用 **lang** 属性置顶文档的语言

1. **meta** 是一个空元素，所以不需要 **结束标签**。 指定了 **字符编号集等**。

1. `<a>`标签可以放入多个元素了!

## HTML新语义元素

有以下新的元素：

1. main：主内容区域(主内容只能有一块!且不能作为其它新元素的后代存在)

1. section

1. nav

1. article: 一个独立的内容块(复制粘贴到另一个网页是否仍有意义?)

1. aside: 与旁边内容不相关的内容块。

1. figure与figcaption: figcaption作为figure的子元素，**一般用于注解图片、代码等**

1. details与summary： **展开收起** 的补充内容面板，可以使用两个元素结合

```html
<details> 
 <summary>这里是....</summary> 
 <p>展开后的详细内容</p> 
</details>
```

1. header、footer、address元素

1. b、em、i元素： 加粗、强调文本、斜体

## 离线优先

**理想方式为离线优先，mdn可学习**

# 四、css3新特性

## 4.1 便捷css之多列布局

如果把一段文本分成多列展示，可以使用以下：

```css
main { 
 <!-- 每列12em --> 
 column-width: 12em; 
 <!-- 或者为固定4列 -->
 column-count: 4; 
}

section {
 <!-- 间距2em -->
 column-gap: 2em; 
 <!-- 分隔线格式 -->
 column-rule: thin dotted #999; 
 <!-- 每列宽 -->
 column-width: 12em; 
}
```

## 4.2 断字

1. 折行： `word-wrap: break-word;`

1. 省略号： 

```css
.truncate { 
 width: 520px; 
 overflow: hidden; 
 text-overflow: ellipsis; 
 white-space: no-wrap; 
}
```


## 4.3 条件分支

css原生语法类似与媒体查询语法：

```css
@supports (display: flex){
    main {
        display: flex
    }
}

@supports not (display: flex) {
    main: {
        display: inline-block
    }
}

@supports ((display: flex) and (pointer: coarse)) or (transform: translate3d(0, 0, 0)) {
    main: {
        display: inline-block
    }
}
```

### Modernizr

由于`@supports`没有得到广泛支持，可以使用 **Modernizr** 这个js工具，实现css分支。

## 4.4 新选择器

在css2中就可以使用属性选择符如：

```css
<!-- 所有有alt属性的img标签 -->
img[alt]{}
<!-- 包含data-sausage属性的元素 -->
[data-sausage]{}
<!-- 指定属性值的元素 -->
img[alt="sausage"]{}
```

### 1. 字符串匹配属性

分为三种： **以..开头、包含..、以..结尾** 

```css
<!-- 以myimg开头 -->
img[alt^="myimg"]{}
<!-- 包含 -->
img[alt*="img"]{}
<!-- 以什么结尾 -->
img[alt*="val"]{}
```

### 2. 注意事项

> `[data-key]`是`awful`开头的，并不是`key`

**空格分隔的属性、任意多个字符串是否存在** 也是可以的
```css
<!-- 属性值存在空格 -->
img[alt~="my"]{}
<!-- 多个匹配 -->
[data-film*="awful"][data-film*="img"]{}
```

### 3. 数值的ID和class

HTML5支持了数值开头的id和class类名。 属性选择符可以帮助css协同html来完成选择。

## 4.5 结构伪类

| 伪类名 | 描述 |
| --- | --- |
| `sel:first-child` | 选中第一个选择符(css1就有了) |
| `sel:last-child` | 选中最后一个选择符 |
| `sel:nth-child()` | 任意位置选择符 |
| `sel:nth-last-child()` | 倒数开始位置的选择符 |
| `.sel:nth-type()` | 针对类名来选择 |
| `.sel:nth-last-type()` | 针对类型倒数开始选择 |

> `nth`等选择器的参数有四种情况：**odd(奇数)、even(偶数)、整数、数值表达式(n)**
> 
> 前三个不用说，最后一个是这样的:
> ```css
> /* 表示从第3个开始，每隔一个开始选择 */
> div:nth-child(2n+3){}
> 
> /* 倒数第三个开始全部选中 */
> div:nth-last-child(-n+3){}
>```

**以下是四列宽的元素，最后一行取消掉border底边框的实际使用：**
```css
/* 每四项选一项，且在最后四项 */
.item:nth-child(4n+1):nth-last-child(-n+4),
/* 所有在最后一行的兄弟元素 */
.item:nth-child(4n+1):nth-last-child(-n+4) ~ .item{
    border-bottom: none;
}
```

### 其它伪类


| 语法 | 描述 |
| --- | --- |
| `:not()` | 表示**非** |
| `:empty` | 没有内容的元素 |
| `:first-line` | 浏览器渲染的第一行 |
| `:has()` | 包含某属性的元素 |

## 4.6 视口高宽

css3引入了**vw、vh、vmin(vh或vw中最小值)、vmax(vh、vw最大值)**

## 4.7 `@font-face`

在网站上下载的字体文件放入同一文件夹后，复制并修改css文件. **注意字体文件大小防止影响性能**

```css
@font-face {
    font-family: 'robotoregular';
    src: url('../fonts/Roboto-Regular-webfont.eot');
    src: url('../fonts/Roboto-Regular-webfont.eot?#iefix')
format('embedded-opentype'),
    url('../fonts/Roboto-Regular-webfont.woff') format('woff'),
    url('../fonts/Roboto-Regular-webfont.ttf')
format('truetype'),
    url('../fonts/Roboto-Regular-webfont.svg#robotoregular')
format('svg');
    font-weight: normal;
    font-style: normal;
}
```

## 4.8 颜色格式、透明度

> css3新增了**RGB、HSL**, 这两种颜色还支持**alpha通道(RGBA/HSLA)**

### 语法含义

RGB中`rgb(254.2.8)`分别代表了 red、green、blue三原色的分值

HSL中`hsl(359, 60%, 60%)`分别代表了 色相、饱和度、亮度的颜色系统。

### 意义

放着十六进制的颜色不适用，而引入RGB和HSL颜色系统，是因为这两个支持**alpha透明通道**：

```css
.main {
    color: rgba(255, 255, 255, 0.8);
    background-color: hsla(359, 99%, 50%, .5);
}
```

> 相较于**opacity**透明度属性，他们只改变元素特定颜色的透明度，而**opacity改变了整个元素的透明度。**

# 五、css高级特性

## 5.1 文字阴影

使用`text-shadow: 1px 1px 1px #ccc;`给文字添加阴影效果。

值分别代表着：**右侧偏移量、下方偏移量、模糊距离(可以省略掉)、色值**。

**多阴影通过`,`分隔来实现**

## 5.2 盒阴影

使用`box-shadow: 0px 3px 1px 1px #444`给盒增加阴影

值分别代表着：**水平偏移值、垂直偏移值、模糊距离(可省略)、阴影尺寸(可省略)、阴影颜色**

> 默认阴影是在外层，可以设置**inset**来设置内阴影。`box-shadow: inset 1px 1px #ccc;`
> 
> 多重阴影使用 **`,`** 分隔来实现

## 5.3 背景渐变

### 5.3.1 线性渐变

```css
/*普通语法，方向默认为从顶部到底部*/
.linear-gradient1 {
    background: linear-gradient(to top right, red, blue);
}
/*数学角度语法*/
.linear-gradient2 {
    background: linear-gradient(45deg, red, blue);
}
/*左偏移(可见区域之外便开始渲染)*/
.linear-gradient3 {
    background: linear-gradient(red -50%, blue);
}
/*色标语法*/
.linear-gradient4 {
    background: linear-gradient(red 10%, blue 20%, green 50%, pink 100%);
}
```

语法可以总结为： 

1. **第一个参数的渐变方向(可忽略，默认为顶部到底部)**

1. 之后的参数可以写为**颜色 位置(可忽略), 颜色 色标位置(可忽略)**

### 5.3.2 径向渐变

```css
.radial-gradient {
    background: radial-gradient(12rem circle at bottom, yellow,orange, red);
}
```

语法可以总结为：**直径(可忽略) 形状 at 渐变中心点(默认为容器中心), ...颜色(至少两种颜色)**

*直径 形状*可以设置的方式有： 

- **5em: 忽略形状默认为circle**

- **circle： 忽略直径，默认为容器的最长边**

- **40px 50px： 生成一个对应的椭圆或者圆**

- **ellipse： 生成与容器大小一致的椭圆**

*位置*可以设置的方式有：

- **at top right： 默认为中心，设置为右上角**

- **at right 100px top 20px：中心在右100px，上20px**

- **at center left：左中区域**


### 5.3.3 响应式渐变

css3设置一些关键词对渐变的 **直径** 进行了**响应式优化**：

比如：`background: radial-gradient(closest-side circle at center, red, blue);`

可以设置的值是: 

- **closest-side: 渐变与距离中心最近的边框进行相切**
- **closest-corner: 渐变与距离中心最近的角进行相切**
- **farthest-side: 与closest-side相反， 渐变与距离中心最远的角进行相切**
- **farthest-corner：与距离最远的角相切**
- **cover： 等价于farthest-corner**
- **contain： 等价于closest-side**

### 5.3.4 重复渐变

在`radial-gradient`和`linear-gradient`前增加`repeating-`前缀可以实现重复渐变效果

## 5.4 多背景图片设置

如果需要使用多张背景图片那么可以通过：**background、background-size、background-position及他们的缩写来完成设置**

```css
.main {
  background:
    url('first.img'),
    url('second.png'),
    url('third.png') left bottom,
    /* 最后写背景色，使其在最底部 */
    #ccc;
  /* cover保持图片比例，覆盖整个元素 */
  /* contain保持图片比例，图片最长边保持在元素内部 */
  background-size: 75vmax, 50vh, cover;
  background-position: top 50px right 50px, 40px 40px, top center;
  background-repeat: no-repeat;
}
```

## 5.6 滤镜

> **box-shadow** 只能是矩形,如要给三角形使用阴影，可以使用 **drop-shadow** 

使用 **filter:xx** 来使用滤镜. ** 首先定义filter: url('./imgs/filter.svg#filterRed')定义一个svg滤镜 **(下一章SVG详细描述)

css滤镜常用的属性如下：

| 滤镜 | 描述 |
| --- | --- |
| `filter: blur(3px)` | 简单的长度 |
| `filter: brightness(2)` | 值为0-100(表达0%-100%)，表达**亮度的强度** |
| `filter: contrast(2)` | 值为0-100(表达0%-100%)，表达**对比度** |
| `filter: drop-shadow(x, y, blur, color)` | 阴影 |
| `filter: grayscale(0.8)` | 值为0-1,表达灰度变化的程度 |
| `filter: hue-ratate(25deg)` | 值为0-360度,表达**色轮上的变化角度** |
| `filter: invert(75%)` | 值为0-100%,表达**反色的程度** |
| `filter: opacity(50%)` | 值为0-100%,表达**元素透明度** |
| `filter: saturate(10%)` | 值为0-1,表达**元素饱和度** |
| `filter: sepia(.64)` | 值为0-1,表达**褐色滤镜** |

## 5.7 css性能

css的性能的核心宗旨可以用一句话总结：

> "括号外的决定了页面的架构，括号内的决定了页面的性能" - Ben Frain

css的性能是不需要考虑选择器的复杂程度，而是那么**很昂贵的**css属性的选择使用。

# 六、 SVG

> SVG是庞大的主题，《响应式设计 第二版》的作者表明，如果想要全部学习完，需要准备好大份饮料。

## 6.1 起源

svg是2001推出的第一个版本，是XML中用于描述二维图形的语言。他使用**相对点**来保存数据， 可以缩放到任意大小而不会损失清晰度。

SVG支持三种图形对象：矢量图标形状、图像和文本

## 6.2 文档表示图像

通常说我们不需要查看SVG的代码，只需要在图像编辑器来编辑SVG或直接将图像保存为svg即可。 但是了解SVG的结构和如何调整还是非常有用的(控制或者增加动画)

### 6.2.1 根元素

`<svg>`根标签有三个属性：**width、height、viewbox**

宽、高用于创建一个视口， 而viewbox是**SVG内所有形状需要遵循的坐标系**

```xml
<!-- viewbox定义为一半，所以对svg图形进行了缩放操作 -->
<svg width="198px" height="188px" viewbox="0 0 99 94"></svg>
```

### 6.2.2 命名空间

svg会有一个生成它的图形编辑程序定义的命名空间(xmlns=XMLnamespace)。**web展示并不是必须的，为了优化可以删掉**

### 6.2.3 标题、描述

```xml
<title>svg1</title>
<desc>created with lx</desc>
```

### 6.2.4 defs标签

defs标签是一个存储**所有可复用的元素定义的地方，如梯度、符号、路径等**

### 6.2.5 元素g

g元素的作用可以是**把其他元素捆绑在一起**

### 6.2.6 形状标签

SVG有一系列可用的形状标签：

path(路径)、rect(矩形)、circle、ellipse(椭圆)、line、polyline(折线)、polygon(多边形)

> path路径是由任意数量的连接点组成的，允许自由创造想要的形状

## 6.3 流行图形编辑工具

有：Adobe的Illustrator、Sketch、Inkscape、DrawSVG等

## 6.4 插入html中

如何将svg插入到html到web中，有几种方式：

1. 使用img标签

1. 使用obejct标签

object标签是W3C推荐的装载非html内容的容器。

```html
<!-- data是路径 type是描述内容的MIME类型 -->
  <object data="123.png" type="image/png">
    <!-- 预备内容 但是无论是否显示都会下载请求 -->
    <img src="last.png" alt="">
  </object>
```

## dataURL

dateURL节省了一次网络请求， 推荐工具为：[iconizr](https://iconizr.com/)

# 七、 过渡、变形、动画

1. 知道动画的起始和终止状态，需要一个简单的变形方法时，使用css过渡

1. 不影响页面布局，只是想改变一下视觉效果，使用css变形

1. 在一个元素上实现一系列关键帧动画，使用css动画

## 7.1 css过渡

css过渡是应用在元素的初始状态而不是终止状态上。

过渡有四个属性可以声明：

1. transition-property: 过渡的css属性名称(bgc、width等)

1. transition-duration: 过渡效果持续时间(.3s、2s、1.5s等)

1. transition-timing-function: 过渡期间的速度变化(ease、linear、ease-in、ease-out、cubic-bezier)

1. transition-delay: 过渡开始前的延迟时间(定义负值，会在半路结束)

```css
.main {
  width: 50px;
  height: 40px;
  background-color: pink;
  transition-property: all;
  transition-duration: 2s;
  transition-timing-function: ease;
  transition-delay: .5s;
  /* 推荐使用缩写版 */
  transition: all 2s ease .5s;
}
```

## 7.2 2D变形

css中变形有2D变形和3D变形。都是对元素视觉效果的改变。

css2D变形有以下几个模块可以定义：

1. scale: 缩放元素

1. translate: 移动元素

1. rotate：旋转元素

1. skew： x和y轴对元素进行斜切

1. matrix： 像素精度控制变形效果

```css
.main {
  /* 放大到1.4倍 */
  transform: scale(1.4);
   /* 缩小到0.4倍  */
  transform: scale(0.4);
  /* 移动到x轴90px，y轴200px */
  transform: translate(90px, 200px);
  /* 旋转45度 */
  transform: rotate(45deg);
  /* 倾斜45度 */
  transform: skew(45deg);
  /* 矩阵 */
  transform: matrix(1, 0, 0, 1, 0, 0);
}
```

还有**transform-origin**属性可以定义，是**变形中心点的位置**，默认为x轴和y轴的50%，也就是正中心的位置

## 7.3 3D变形

3D变形不止是利用transform3(x,y,z)这一种属性，还要与`backface-visibility: hidden`、`transform-style:preserve-3d`、`perspective:300px`等一起使用. 目前基本未接触过这里。不做深究。

## 7.4 动画

动画主要是**一系列关键帧的效果**

使用动画的步骤是： 声明关键帧、使用该声明。

```css
@keyframes pulse {
  50% {
    background-color: red;
  }
  100% {
    background-color: pink;
    width: 50px;
  }
}

.main:hover{
  animation: pulse 1s infinite;
}

/* 所有的动画属性及值如下 */
.animation-props {
  /* 动画名称 */
  animation-name: xx;
  /* 动画持续时间 */
  animation-duration: 1s;
  /* 动画速度曲线 */
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  /* 动画次数 */
  animation-iteration-count: infinite;
  /* 动画状态 */
  animation-play-state: running | paused;
  /* 动画延迟时间 */
  animation-delay: 1s;
  /* 动画填充模式 */
  animation-fill-mode: forwards | backwards | both;
  /* 动画方向 */
  animation-direction: normal | reverse | alternate | alternate-reverse;
}
```

# 实现响应式web设计

> 在电影和故事中，导师给英雄一个建议或者是赠予魔法物品，你知道那些东西在日后会大有用处，只是不知道什么时候会发挥作用。
>
> 本章一半是哲学上的思考，另一半是毫无关联的提示和技巧

## 尽快让设计在真实环境运行起来

响应式web设计做的越多，越觉得尽快让设计在浏览器、设备环境运行起来很重要。(也是展示和传递视觉设计的宗旨。)

> 让设计决定断点，而非开发决定断点。

## 在真实设备观察/使用

如果可以，通过不同设备，而非在项目完成后告知某些环境下代码无法正常工作。使用**BrowserSync**工具来同步您的工作。

## 拥抱渐进式增强

逐步增强的基本想法是：**从选择支持的浏览器中选择他们选取交集来编写前端代码，然后逐步优化代码以适应强大的浏览器和设备。**

## 确定需要支持的浏览器

1. 等价的功能而非等价的外观。

1. 选择要支持的浏览器，通常为**前两个版本**原则

## 分层的用户体验

对于体验可以分为两个层级： **基本体验**和**增强体验**

基本体验是站点的最小可行版本，而增强体验为包括所有功能并且最为美观的版本。

> 实现体验分层可以使用**modernizr**的包依赖， 编写css时，没有被媒体查询或modernizr添加的选择器的代码则为基本体验。

## 避免在生产中使用css框架

最有名的 bootstrap 和 foundation。大佬认为加入到生产环境是一种错误的策略。

因为： 

1. 技术上来看，会带来过多的冗余代码

1. 美学角度的话，框架十分普及，导致项目与市面的无数个项目看起来一模一样

1. 如果只是项目中复制粘贴代码，然后调整至符合需求，那么就不可能充分理解原理。

## 采用务实的解决方案

使用button包含icon来定义一个flex布局，使得icon在左侧。(但是fireFox不允许我们将一个按钮元素设为flex容器)。

使用一种务实的解决方案则是， 将button元素改为**a**链接，可以做到使用flex布局。

## 尽可能简单代码

如下：

```css
.list-item:nth-child(5){
    /* 样式 */
}
```

使用这种不如直接在html标签添加类来做到样式。这样是不推荐的。

直接添加类后增加样式不仅**简单易懂**，而且支持度也更高。

## 根据视口隐藏、展示、加载内容

在web响应式设计中有一个常用准则： 如果你在小屏幕上不加载某一部分，那么在大屏幕上也不应该加载。(复杂的交互是特殊情况)

在大尺寸的视口展示额外部分意味着： 在小尺寸设备中要么部分内容被加载但是不可见，要么是部分内容可见但是未加载。


# 额外知识点

## 制定规范流程

W3C指定规范需要走一个流程，简单来说为以下几点：

1. WD(working Draft)工作草案

1. CR(Candidate Recommendation)候选推荐

1. PR(Proposed Recommendation)建议推荐

1. REC(Recommendation) 推荐标准

