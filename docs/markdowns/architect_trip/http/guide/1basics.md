# http
http用作获取类似HTML文档这类的协议。

客户端与服务端通过交互一个个独立消息进行通信， 客户端发出的叫做**请求**， 服务端返回的叫做**响应**。

## http组成

http请求由一个实体，即user agent。 多数是web浏览器， 但是也可能是任何东西， 比如机器爬虫。

在两端之间，还有很多很多的被称为**代理**的中间实体，履行不同作用。如： 充当网关或缓存。

## 代理

代理可以是透明的只是做转发，也可以传递给服务端之前修改这个请求。

- 缓存
- 过滤(反病毒扫描、家长控制)
- 负载均衡
- 认证
- 日志， 可以记录历史记录

## http基本性质

- http是简单且易读的
- 可扩展的， 只要两端对新标头简单协商，就可以被加入
- 无状态的， 两个执行成功的请求是没有关系，但是可以通过cookie来关联**有状态**的会话

## http控制什么?

http可以控制的常见特性:

- 缓存： 文档缓存的策略
- 同源限制
- 认证： 访问受保护的资源的权限
- 代理： 允许或禁止代理缓存的资源
- 会话： cookie可以将**无状态**的http变成**有状态**的会话

# MIME类型

在`http header`的`content-type`中， 指定文档类型的正确非常重要，如果配置不正确，网站可能无法工作。

## MIME结构

包含两个部分: `type/subtype;parameter=value`。 主类型和子类型，中间由`/`分割，以及**可选参数**。

如: ``text/html; charset=utf-8``。

## 常用结构

- `application/octet-stream`： 二进制流数据， 例如文件下载
- `text/plain`： 文本文件， 例如纯文本文件
- `text/html[css/javascript]`： HTML/CSS/JavaScript文件
- `image/gif[png/webp]`：GIF图片文件
- `audio/webm[ogg/wave]`：音视频文件
- `multipart/form-data`： 表单数据， 例如文件上传
- `application/x-rar-compress`： RAR压缩文件


