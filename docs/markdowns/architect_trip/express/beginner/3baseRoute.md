路由是确定 app 如何响应客户端对特定端口的请求， 该端点可以是 URL、HTTP 请求(GET、POST、PUT、DELETE 等)。

每个路由可以有**一个或多个**处理函数，匹配路由时执行。

使用: `app[METHOD](PATH, HANDLER`

::: tip

- app是express的实例
- METHOD是小写的请求方法，get、post
- PATH是服务器路径
- HANDLER是执行的回调函数
:::
