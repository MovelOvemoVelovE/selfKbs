
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