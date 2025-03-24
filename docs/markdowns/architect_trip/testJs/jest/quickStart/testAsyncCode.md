- [Promise](#promise)
- [Async/Await](#Async)
- [Callbacks](#Callbacks)
- [`.reslove`/`.reject`](#resloves/rejects)

## Promise

测试返回一个`Promise`, 如果`reject`掉, 那么测试失败

```js
function fetchData() {
  // 模拟一个后端请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("peanut butter1");
    }, 1000);
  });
}

test("request remote and date is peanut butter", () => {
  // return出去，不然测试无效
  return fetchData().then((res) => {
    expect(res).toBe("peanut butter");
  });
});
```

::: danger
**必须**使用`return`关键字，将测试的回调函数变为`Promise`, 否则测试是无效的
:::

## Async

```js
test("async test", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter1");
});

test("async catch test", async () => {
  // 添加代码以验证断言的数量被调用
  expect.assertions(1);
  try {
    await fetchData();
  } catch (error) {
    expect(error).toMatch("error");
  }
  data.toBe("peanut butter1");
});
```

:::danger

`expect.assertions(1)`确保测试的断言被调用了几次，确保有测试用例运行过了。

:::

## Callbacks

回调函数形式的测试。

**重点就是在`callback`的函数上测试。**

```js
function fetchData(callback) {
  // 模拟一个后端请求
  setTimeout(() => {
    callback(null, "peanut butter1");
  }, 1000);
}

// test函数使用一个done 参数
test("callback data test", (done) => {
  function callback(error, data) {
    if (error) return done(error);
    try {
      expect(data).toBe("peanut butter1");
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback);
});
```

::: tip

在测试函数中增加一个`done`参数，用来通知测试函数，测试已经完成。

:::

## resloves/rejects

`.resloves`和`.rejects`算是一种语法糖， 如果`promise`被`rejct`或`resolve`， 那么测试都会自动失败

```js
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```