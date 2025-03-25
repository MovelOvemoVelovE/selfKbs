模拟高阶函数的实际实现， 捕获调用信息、new实例化构造函数信息、配置返回值等。

## 简单使用

::: code-group


```js [index.js]
export function forEach(items, callback) {
  for (const item of items) {
    callback(item);
  }
}
```

```js [index.test.js]
const forEach = require('./forEach');

const mockCallback = jest.fn(x => 42 + x);

test('forEach mock function', () => {
  forEach([0, 1], mockCallback);
  // 被调用了几次
  expect(mockCallback.mock.calls).toHaveLength(2);
  // 第一次调用的参数
  expect(mockCallback.mock.calls[0][0]).toBe(0);
  // 第二次调用的参数
  expect(mockCallback.mock.calls[1][0]).toBe(1);
  // 第一次调用的结果
  expect(mockCallback.mock.results[0].value).toBe(42);
});
```

:::

## `.mock`属性

在简单使用中，可以看到有`.mock`属性，所有函数都有这个属性。

保存了函数如果调用和返回数据的各种信息

```js

```