webSocket API可用于 客户端和服务端之间开启**双向交互式**通话。

利用api可以向服务器发送消息，并接收事件驱动的相应，而无需轮询服务器。

## 编写客户端代码

客户端实现功能，需要创建一个`webSocket`对象， 自动尝试与服务器的链接。

```js
const ws = new WebSocket('ws://www.example.com/socketserver', ['protocolOne'])
```

接下来就是确保已经建立后发送数据、发送对象的复杂数据、接收服务器的API、关闭连接。

```js
// 建立连接
const ws = new WebSocket('wss://example.com/socket');

// 监听连接打开
ws.onopen = () => {
  console.log('WebSocket 连接已建立');
  ws.send('Hello Server!');
};

// 监听消息
ws.onmessage = (event) => {
  console.log('收到消息:', event.data);
};

// 监听错误
ws.onerror = (error) => {
  console.error('WebSocket 错误:', error);
};

// 监听连接关闭
ws.onclose = () => {
  console.log('WebSocket 连接已关闭');
};
```

::: danger

ws不应当用于混合的上下文环境， 包括https下打开非安全的ws.

:::