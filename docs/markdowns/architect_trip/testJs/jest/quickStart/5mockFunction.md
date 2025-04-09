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

保存了函数如果调用和返回数据的各种信息:

- 实例 
  - 实例的集合: `fn.mock.instances`
  - this指向: `fn.mock.contexts`
  - 实例集合的长度: `fn.mock.instances.length`
- 调用
  - 几次: `fn.mock.calls - toHaveLength()`
  - 调用的参数: `fn.mock.calls[0]`
  - 返回结果: `fn.mock.results[0]`

```js [mock.text.js]
function forEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
const myMock = jest.fn((x) => 44 + x);
// const a = new myMock();
// 返回实例化数组
// console.log(myMock.mock.instances); // [<a>]
/**
 * const b = { name: 123 }
 *const bound = myMock.bind(b)
 *bound()
 *实例的this对象
 *console.log(myMock.mock.contexts) // [<b>]
 *实例的集合长度
 *console.log(myMock.mock.instances.length) // 2
 */
// 调用
test("mockFunction", () => {
  forEach([1, 2, 3], myMock);
  expect(myMock.mock.calls).toHaveLength(3);
  // 第一次调用的参数是1
  expect(myMock.mock.calls[0][0]).toBe(1)
  // 返回结果
  expect(myMock.mock.results[1].value).toBe(46)
  // 最后一次调用参数
  expect(myMock.mock.lastCall[0]).toEqual(3);
});
```

## 返回值

注入自定义的**测试返回值。**

使用`.mockReturnValueOnce(result)`和`.mockReturnValue`实现一次注入和多次注入返回值。

```js
const myMock = jest.fn(x => x*x)
console.log(myMock()) //NaN
myMock.mockReturnValueOnce(32).mockReturnValueOnce(23).mockReturnValue(55)
console.log(myMock(), myMock(), myMock()) //32 23 55
```

## 模拟模块

ajax、fetch等如果直接调用，慢慢的测试就会变得缓慢、脆弱。 

可以使用 `jest.mock()`来模拟axios模块。

::: code-group

```js [user.js]

```

```js [user.test.js]

```

:::

