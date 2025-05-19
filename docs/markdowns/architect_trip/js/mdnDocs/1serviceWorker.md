# Service Worker

## 简介

**Service Worker**这个 api 旨在创建有效的离线体验。 是一种在浏览器后台运行的脚本，与网页分离。

它支持离线功能、后台同步和推送通知等特性。

**Service Worker** 是渐进式 Web 应用程序 (PWA) 的关键组件。

## 主要功能

1. **离线支持**：缓存资源，使您的应用程序可以离线运行。
2. **后台同步**：在用户重新连接网络时同步数据。
3. **推送通知**：即使应用未打开，也可以向用户发送通知。
4. **拦截网络请求**：以编程方式修改或处理请求。

## 概念

1. 

## 生命周期

Service Worker 的生命周期包括以下阶段：

1. **注册**：在浏览器中注册 Service Worker。
2. **安装**：安装 Service Worker 并缓存资源。
3. **激活**：Service Worker 接管页面控制。
4. **空闲**：Service Worker 在事件发生前保持空闲状态。
5. **终止**：浏览器可能终止 Service Worker 以节省资源。

### 生命周期代码示例

```javascript
// 注册 Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker 注册成功，作用域为:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker 注册失败:", error);
    });
}
```

## 事件

### 安装事件

在 Service Worker 安装时触发。可用于缓存资源。

```javascript
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/script.js",
        "/image.png",
      ]);
    })
  );
});
```

### 激活事件

在 Service Worker 激活时触发。可用于清理旧缓存。

```javascript
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== "v1") {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
```

### 获取事件

拦截网络请求并在可用时提供缓存资源。

```javascript
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

## 最佳实践

1. **使用 HTTPS**：Service Worker 仅在安全源上工作。
2. **缓存版本化**：使用版本控制管理缓存更新。
3. **充分测试**：测试离线功能和边界情况。
4. **优雅处理错误**：为失败的请求提供备用内容。

## 调试

- 使用浏览器开发者工具检查 Service Worker 的注册和缓存。
- 在 Chrome DevTools 的 **Application** 标签中查看 Service Worker 状态。