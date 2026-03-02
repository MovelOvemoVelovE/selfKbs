# 一、 基本用法

## 基本使用

```html
<canvas id="canvas" width="500" height="500">
  这里是替换内容， 如果浏览器不支持canvas标签， 则显示这里的内容
</canvas>
```

canvas标签实际上只有2个属性， width和height， 其余内容就如同普通的element标签一样(如`margin`、 `padding`、 `border`等)， 这里的id同理，是为了更好的在js中找到它

:::tip

如果图像画出来是扭曲的， 那么尝试用`width`和`height`属性来设置canvas的宽高， 而不是用css来设置

:::

替换内容比`img`标签的`alt`更容易些，写入标签内的内容，则是可以替换掉的。

闭合标签不可以省掉， 如果没有则全部内容都不会显示，默认设置为替换内容。

## 渲染上下文

canvas元素知识创建了一个固定画布， 公开了一个或者多个**渲染上下文**， 这里的教程主要是用于 2D渲染上下文中。

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
```

## 一个模板

这里有使用canvas的一个模板，基本所有的使用(本笔记)都是存在这个基础上

```html
<html>
  <head>
    <title>Canvas tutorial</title>
    <script type="text/javascript">
      function draw() {
        var canvas = document.getElementById("myCanvas");
        if (canvas.getContext) {
          var ctx = canvas.getContext("2d");
        }
      }
    </script>
    <style type="text/css">
      canvas {
        border: 1px solid black;
      }
    </style>
  </head>
  <body onload="draw();">
    <canvas id="myCanvas" width="150" height="150"></canvas>
  </body>
</html>
```

# 二、绘制图形

## 绘制矩形

canvas只支持两种形式的图形绘制， 矩形和路径。

canvas 提供了三种方法绘制矩形：

- `fillRect(x, y, width, height)`：填充矩形
- `strokeRect(x, y, width, height)`：描边矩形
- `clearRect(x, y, width, height)`：清除矩形区域

x和y指定矩形的左上角坐标， width和height指定矩形的宽和高。

```js
context.fillRect(15, 15, 100, 150);
context.clearRect(45, 45, 50, 50);
context.strokeRect(10, 10, 110, 160);
```

![alt text](/assets/Canvas/1.png)

## 绘制路径

图形的基本元素是路径。 路径通过不同颜色、宽度的线段或者曲线的 不同形状的点的集合。 

一个路径，甚至子路径都是需要闭合的。

路径创建的步骤：

- 创建路径起始点

- 画图函数画出路径

- 路径封闭

- 封闭后路径生成，通过秒表或者填充来渲染图形

以下是用到的函数：

- `beginPath()`：开始一个新的路径

- `closePath()`：关闭当前路径

- `stroke()`：通过线条绘制图形轮廓

- `fill()`：通过填充绘制图形轮廓

- `moveTo(x, y)`：移动到指定坐标， 类似于笔来移动到指定位置

- `lineTo(x, y)`：画线到指定坐标， 类似于笔来画线到指定位置

- `arc(x, y, radius, startAngle, endAngle, anticlockwise)`：画弧线， 圆弧的起始角度和结束角度， 逆时针方向

- `arcTo(x1, y1, x2, y2, radius)`：画弧线， 圆弧的起始角度和结束角度， 逆时针方向

- `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`：画贝塞尔曲线， cp1和cp2是控制点， x和y是结束点

- `quadraticCurveTo(cpx, cpy, x, y)`：画二次贝塞尔曲线， cpx和cpy是控制点， x和y是结束点

- `Rect(x, y, width, height)`：画矩形， x和y是左上角坐标， width和height是宽和高

:::code-group

```js [三角形.js]
context.beginPath();
context.moveTo(75, 75);
context.lineTo(100, 75)
context.lineTo(100, 25)
context.fill()
```

```js [笑脸.js]
context.beginPath();
context.arc(75, 75, 50, 0, Math.PI * 2, true); // 画一条弧线
context.moveTo(110, 75); // 切换笔到指定位置
context.arc(75, 75, 35, 0, Math.PI, false); // 画一条弧线
context.moveTo(65, 65); // 切换笔到指定位置
context.arc(60, 65, 5, 0, Math.PI * 2, true); // 画一条弧线
context.moveTo(95, 65); // 切换笔到指定位置
context.arc(90, 65, 5, 0, Math.PI * 2, true); // 画一条弧线
context.stroke()
```

```js [两个三角形.js]
ctx = myCanvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(25, 25);
ctx.lineTo(105, 25);
ctx.lineTo(25, 105);
ctx.fill();

// 描边三角形
ctx.beginPath();
ctx.moveTo(125, 125);
ctx.lineTo(125, 45);
ctx.lineTo(45, 125);
ctx.closePath();
ctx.stroke();
```

```js

```

:::
