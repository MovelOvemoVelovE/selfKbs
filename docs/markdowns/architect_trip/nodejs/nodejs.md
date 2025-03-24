nodejs是前端学习的必修课. 掌握了nodejs才能够进阶前端知识。这个笔记是学习nodejs基础的总结。
> 宗旨是言简意赅且通俗易懂，不至于日后自己第一眼看过去都看不懂。


# 前言

作为一名前端，不管是**工程化**、**构建工具**、**浏览器引擎**、**工作脚本**等等都离不开nodejs, 可以说前端进入全栈的第一步。

最简单的需求：这次文档，由于设置`sidebar`需要手动配置很多路径，就可以使用nodejs来生成`sidebar`路径。

::: tip node特性

- **nodejs是开源的、跨平台的js运行环境**
- 由于nodejs和浏览器没有关系，是不具备BOM和DOM的api的。   
- nodejs的顶级对象为`global`, 由于ES2020定义了新的全局对象`globalThis`(推荐使用`globalThis`)
- nodejs内可以使用`console`和`定时器`

:::



# Buffer(缓冲器)

**Buffer的概念:**

-   Buffer是一个类似于数组的对象，用于表示固定长度的字节序列
-   本质是一个内存空间，专门处理**二进制数据**
> 
>-   大小固定且无法调整
>-   性能较好，直接对计算机内存操作
>-   每个元素的大小都为1byte

## 创建

-   `Buffer.alloc(size)`
-   `Buffer.allocUnsafe(size)`
    -    unsafe方式可能会遗留之前的数据，是复用之前的buffer内存空间
-   `Buffer.from( <string | number[]> )`

```js
let buf = Buffer.alloc(10)
let buf2 = Buffer.allocUnsafe(22)
let buf3 = Buffer.from('hello')
let buf4 = Buffer.from([105, 108, 111, 118, 101,121,111,117])
```

## 实例方法

| 方法名              | 描述                 |
|---------------------|----------------------|
| `buffer.toString()` | 将buffer转换为字符串 |
| `buffer[index]`     | 同数组下标使用读写   |


# fs模块
> **本章节全程必须先引入fs进行操作：**`const fs = require('fs')`
## 写入文件

**应用场景：**   

1. 下载文件
2. 安装app
3. 保存日志
4. 编辑器保存
5. 保存视频、录屏等
### writeFile()
写入文件
> `fs.writeFile(fileName, data[, options], callback)`
>    
> callback参数为error，失败为error对象，成功则为null

### writeFileSync()
同步写入文件

> `fs.writeFileSync('./output/data.txt', '同步写入文件')`

### appendFile()
参数同writeFile。**是在文件的后面追加写入。**

### appendFileSync()
同步的`appendFile`

### createWriteStream()

创建文件写入流。通过**返回的流对象**`write、close`方法进行系列操作。

> **特点:** 
> - 减少打开、关闭文件的次数。   
> - 适合大文件写入、频繁写入等操作

```js
const fs = require("fs");
/* 写入流对象 */
const ws = fs.createWriteStream('./座右铭.txt')
ws.write('锄禾日当午\r\n')
ws.write('汗滴禾下土\r\n')
ws.write('谁知盘中餐\r\n')
ws.write('粒粒皆辛苦\r\n')
// 销毁流对象
ws.close()
```

## 读取文件
### readFile

读取文件

> `fs.readFile(path[, options], callback)`    
> `callback`接受两个参数为`err`、`Buffer`类型的`data`

```js
const fs = require('fs')
fs.readFile('./座右铭.txt', (err, data) =>{
    console.log(err, data.toString());
})
```

### readFileSync

> `const res = fs.readFileSync(path[,options])`   
> `res`是读取到的`Buffer`类型数据

```js
let a = fs.readFileSync('./data.txt')
console.log(a.toString());
```

### createReadStream
创建读取流，读取文件。通过**返回的流对象**，绑定`data`和`end`等**事件**进行读取。

> `const rs = fs.createReadStream(path)`

```js
// chunk为读取的 文件块
rs.on('data', chunk =>{
  console.log(chunk) // Buffer数据 64kb
})
// 结束事件，读取完成后触发
rs.on('end', _ =>{
  console.log('读取结束')
})
```

### pipe

> `fs.createReadStream().pipe(fs.createWriteStream())`   
> 读取流，将数据通过pipe(管道)传输给后者的写入流，完成复制。

### DEMO-复制文件
通过`fs`的读写api进行复制文件：

```js
const fs = require('fs')

// 方法一 同步读取文件后, 同步写入文件，完成复制
let data = fs.readFileSync('./output/data.txt')
fs.writeFileSync('./res/data2.txt',data)

// 方法二 异步操作
fs.readFile('./output/data.txt', (err,data) =>{
  if(err)throw err
  fs.writeFileSync('./res/data4.txt', data)
})

// 方法三 创建流，读取流读取，写入流写入完成复制
let rs = fs.createReadStream('./output/data.txt')
const ws = fs.createWriteStream('./res/data3.txt')
rs.on('data', chunk =>{
  ws.write(chunk)
})
rs.on('end', _ =>{
  console.log('复制完成')
})
```

### 重命名/移动文件

> 重命名就是修改文件的路径，同样的路径换了fileName就是重命名，不同的路径则是移动文件   
> 异步修改：`fs.rename(path, newPath, callback)`   
> 同步修改：`fs.renameSync(path, newPath)`

```js
// 同步重命名
fs.renameSync('./output/data.txt', './output/dataRename.txt',)
// 移动文件
fs.rename('./output/dataRename.txt', './res/dataRename.txt', err =>{
  if(err)throw err
})

```

### 删除文件

#### unlink/unlinkSync

> 异步：`fs.unlink(path, err => void)`   
> 同步：`fs.unlinkSync(path)`

#### rm/rmSync

> 异步：`fs.rm(path, err => void)`   
> 同步：`fs.rmSync(path)`

## 文件夹读写删

| 方法名                                          | 描述                       |
|-------------------------------------------------|----------------------------|
| `fs.mkdir(path[, option], err=>void)`           | 创建文件夹                 |
| `fs.readdir(path[, option], (err, data)=>void)` | 读取文件夹                 |
| `fs.rmdir(path[, option], err=>void)`           | 删除文件夹(推荐使用`rm()`) |
| `fs.mkdirSync(path[, option])`                  | **同步操作**创建           |
| `fs.readdirSync(path[, option])`                | **同步操作**读取           |
| `fs.rmdirSync(path[, option])`                  | **同步操作**删除           |

## 查看文件状态

> 同步: `const res = fs.statSync(path[,options])`    
> 异步: `fs.stat(path[, options], (err, data) => void)`

其中 `callback`参数的`data`，可以使用`data.isFile()`和`data.isDirectory()`返回的`boolean` 查看是否为文件、文件夹

## 文件路径

在nodejs中，js文件内写入的**相对路径**是根据命令行所在目录的**上下文**来进行执行。

```js
// nodejsDemo/a/file1.js目录下写入
const writeContent = '我想要在a目录下写入一个文件'
fs.writeFileSync('./文件路径bug.txt', writeContent)
// 命令行
cd nodejsDemo
node file1.js

cd nodejsDemo/b
node ../a/file1.js
```

> 以上代码： 我们原本想要在a目录下写入一个新的文件，在根目录下node编译会正确，但是切换到其他目录然后执行js文件，输出文件会根据命令行上下文环境寻找`./`。
> 
> 类似于this指向的问题。所以就需要使用**绝对路径**保证我们路径这里的绝对正确。   

### __dirname

> `cconsole.log(__dirname == 'D:\\demo\\architect-trip\\nodejs') // true`

**当前js文件目录**的绝对路径

### __filename

> `console.log(__filename == 'D:\\demo\\architect-trip\\nodejs\\9-文件路径.js') // true`

**当前文件**的绝对路径

# path模块

路径模块。


| api                      | 描述                             | 返回值                                   |
|--------------------------|----------------------------------|------------------------------------------|
| `path.resolve(...paths)` | 拼接参数为规范路径(转义`/`和`\`) | 拼接好的规范路径                         |
| `path.sep`               | 路径中的分隔符                   | windows为`\` linux为`/`                  |
| `path.parse(path)`       | 解析路径                         | 对象，包含了根目录、扩展名、文件名等信息 |
| `path.basename(path)`    | 路径基础名称                     | 当前文件的父级目录名称                   |
| `path.dirname(path)`     | 目录名称                         | `__dirname`                              |
| `path.extname(path)`     | 扩展名                           | `.js`等                                  |


# http模块
> 本章节需要引入`const http = require('http')`模块

**创建一个简单的服务：**

```js
// 创建一个服务 
// req为请求内容 res为返回内容
const server = http.createServer((req, res) => {
    // 在接受到http请求时 触发callback
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World\n')
})
// 监听端口 启动服务
server.listen(8080, '127.0.0.1', () => {
    console.log('Server is running on port 8080')
})
```

## 请求报文
其实是通过`createServer`中回调函数第一个参数`request`获取。


| 描述                    | 方法                                                           |
|-------------------------|----------------------------------------------------------------|
| 请求的方法类型          | `req.method`                                                   |
| 请求的http版本          | `req.httpVersion`                                              |
| 请求路径                | `req.url`                                                      |
| URL路径(**弃用**)       | `url.parse(req.url).pathname`                                  |
| URL查询字符串(**弃用**) | `url.parse(req.url, true).query`                               |
| 请求头                  | `req.headers`                                                  |
| 请求体                  | `req.on('data', chunk=>void)` <br /> `req.on('end', ()=>void)` |

```js
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  console.log(req.method) // GET
  console.log(req.httpVersion) // 1.1
  console.log(req.url) // /req
  console.log(url.parse(req.url).pathname) // /req
  console.log(url.parse(req.url).query) // ?name=123
  console.log(req.headers) // 请求头
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  res.end('原神启动！')
})

server.listen(8080, () => {
  console.log('server is running')
})
```

### 请求体
获取请求体，借助`createServer((req) => void)`的请求对象`req`。   

通过给`req`对象绑定`data`和`end`事件(与读取文件流、写入文件流等一致)来获取。

```js
req.on('data', (chunk) => {
    // 读取的是一个buffer数据
    console.log(chunk.toString())
})
req.on('end', () => {
    console.log('请求结束')
})
```

### 获取路径和参数(稳定Api)

> 推荐同ES用法一样的api。   
> 也就是通过**实例化URL对象**，来访问**路径、参数**等

```js
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1')
  console.log(url.pathname)
  console.log(url.searchParams.get('key'))
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  res.end('原神启动！')
})
```

## 响应报文

响应报文有：**状态码(statusCode)、状态描述(statusMessage)、响应头(Header)和响应体**

设置如下：

```js
const server = http.createServer((req, res) => {
  res.statusCode = 200 // 默认成功
  res.statusMessage = 'love'
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.setHeader('myHeader', [1,2,3]) // 生成三个相同的myHeader头信息
  res.write('hello world')
  res.write('nihao')
  res.end()
})
```

## 常用状态码

>[100 Continue - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/100)

- 1xx： 信息响应
- 2xx： 成功响应
- 3xx： 重定向信息
- 4xx： 客户端错误响应
- 5xx： 服务端错误响应


| 状态码 | 描述                                               |
|--------|----------------------------------------------------|
| 100    | 服务端收到头信息，客户端继续发送剩余部分           |
| 202    | 服务端接受请求，尚未处理                           |
| 204    | 成功处理请求，但没返回任何内容                     |
| 301    | 请求网页永久移动到新位置                           |
| 302    | 临时性重定向                                       |
| 304    | NOT Modified。 客户端啊发送GET请求，文档内容无改变 |
| 400    | 请求语法错误                                       |
| 401    | 请求客户端身份验证                                 |
| 403    | 服务端理解请求，但拒绝执行                         |
| 502    | 网关或代理服务器，从上游服务器得到无效响应         |
| 503    | 服务器维护或过载，无法处理                         |


## 网页URL

网页URL的**绝对路径**有三种: 

| 用法                                | 描述                                                                    |
|-------------------------------------|-------------------------------------------------------------------------|
| **http://shanggigu.com/index.html** | 完整路径，直接发送资源请求                                              |
| **//index.html**                    | 拼接页面URL的**协议**后发送请求                                         |
| **/index.html**                     | 拼接页面URL的**协议、主机、端口**后发送请求。(更换主机名后可以跟着改变) |

---

## MIME(媒体类型)

媒体类型(multipurpose Internet mail extensions)是一种标准， 用于表示文档、文件、字节流的性质和格式

hhttp可以设置`Content-Type`表明响应体的MIME类型。

```js
// MIME类型结构为： [mainType]/[SubType]
MIME: {
    html: 'text/html',
    css: 'text/css',
    js: 'test/ javascript',
    png: 'image/png',
    jpg: 'image/jpg',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mp3: 'audio/mp3',
    json: 'application/json',
    // 未知类型可以设置为 application/octet-stream(会下载)
    xxx: 'application/octet-stream'
}
```

## 错误处理