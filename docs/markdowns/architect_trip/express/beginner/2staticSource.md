静态资源的提供比如图片、js 、css、html等。

`app.use([virtualUrl,]express.static(path.join(__dirname, 'public')))`

如：

:::  code-group

```js [index.js]

const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')))
```

```md [访问]
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

:::
