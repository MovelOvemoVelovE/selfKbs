express 是快速、独立、极简的 nodejs web 框架

```bash
mkdir myapp
cd myapp
npm init
npm i express
```

# 新手入门

## Hello world

先来一个简单的示例，进入 express 的世界!

::: code-group

```js [index.js]
const express = require("express");
const app = express();
const port = 9999;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("example app listening on port " + port);
});
```

```shell [shell终端]
node index.js
```

:::

## 应用生成器

利用`express-generator`快速创建一个应用骨架。

::: code-group

```shell [shell终端]
 -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support
        --hbs           add handlebars engine support
        --pug           add pug engine support
    -H, --hogan         add hogan.js engine support
        --no-view       generate without view engine
    -v, --view <engine> add view <engine> support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

```shell [shell终端]
# 创建一个视图为pug的app
npx express-generator --view=pug myapp
cd myapp
npm i
$env:DEBUG='myapp:*'; npm start
```

```bash [myapp/]
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```

:::

## 基本路由

路由是确定 app 如何响应客户端对特定端口的请求， 该端点可以是 URL、HTTP 请求(GET、POST、PUT、DELETE 等)。

每个路由可以有**一个或多个**处理函数，匹配路由时执行。

使用: `app[METHOD](PATH, HANDLER`

::: tip

- app是express的实例
- METHOD是小写的请求方法，get、post
- PATH是服务器路径
- HANDLER是执行的回调函数
:::

## 提供静态资源

静态资源的提供使用: `app.use([virtualUrl,]express.static(path.join(__dirname, 'public')))`

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

## 常见问题

### 
