express是快速、独立、极简的nodejs web框架

```bash
mkdir myapp
cd myapp
npm init
npm i express 
```

# 新手入门

## Hello world

先来一个简单的示例，进入express的世界!

::: code-group

```js [index.js]
const express = require('express')
const app = express()
const port = 9999

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log('example app listening on port ' + port)
})
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

