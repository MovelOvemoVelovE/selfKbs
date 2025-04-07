Http缓存会存储与请求相关的响应， 将**存储的响应**复用给**后续请求**。

可用性会有几个优点: 

- 缓存越近， 响应速度就越快。 最典型的是使用**浏览器本身的缓存**
- 服务器不需要解析请求， 直接返回缓存的响应， 减少了服务器的负担。

## 不同种类缓存

http缓存有两大类： **私有缓存**和**共享缓存**。

**共享缓存**又细分为： **代理缓存和托管缓存**。

### 私有缓存

私有缓存是指在用户的浏览器中， 只对这个用户可见。

```http
Cache-Control: private
```

::: danger

如果响应有`authorization`头， 除非`Cache-Control`头指定`public`， 否则私有缓存会被禁用。

:::

### 代理缓存

**代理服务器**实现了缓存以减少网络流量。 **通常不由服务开发人员管理**.

如`webpack`的`devServer`， 代理服务器会缓存请求的响应。

```http

Cache-Control: no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate

```

### 托管缓存

托管服务是**服务开发人员**明确部署的， 降低服务器负载， 如 **反向代理** 和 **CDN**。

```http

Cache-Control: no-store

```


## 启发式缓存

http旨在尽可能的缓存， **即使没有明确的缓存指令**， 如果满足条件响应也会被存储和复用。

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2021 22:22:22 GMT

<!doctype html>
…

```

启发缓存是在`Cache-control`广泛使用之前的缓存机制。

## 