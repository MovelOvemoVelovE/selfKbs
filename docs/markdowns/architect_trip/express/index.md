express 是快速、独立、极简的 nodejs web 框架

```bash
mkdir myapp
cd myapp
npm init
npm i express
```
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
