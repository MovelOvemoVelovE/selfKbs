# hello jest 示例

::: code-group

```bash [npm]
#
npm init
npm install --save--dev jest
```

```json [package.json]
{
  "scripts": {
    "test": "jest"
  }
}
```

```js [sum.js]
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

```js [sum.test.js]
const sum = require("./sum");
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

```bash [cmd]
npm test

# 结果
PASS  ./sum.test.js
  √ adds 1 + 2 to equal 3 (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.349 s, estimated 1 s
```

:::

# 更多配置项

jest 配置项创建一个配置文件 。

如果有一些插件、想配置生成文件或者有自定义的文件解析规则。 那么可以使用

::: code-group

```bash [npm]
npm init jest@latest

# 使用babel
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

```js [babel.config.js]
// 配置babel来兼容当前的nodejs版本
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
```

:::

# 匹配器

匹配器可以理解为是 **比较运算符**， 用于不同情况的测试值。

::: tip
the following matchers just a taste. 在 api 文档内进行索引展示
:::

## 精确相等

测试值最简单的方式看看是不是相等， 而精确相等性可以使用：

- `toBe()`
- `toEqual()`
- `not.[toBe/toEqual]()`
- `toStrictEqual()`

::: code-group

```js [toBe.js]
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});
```

```js [toEqual.js]
test("object assignment", () => {
  const data = { one: 1 };
  data.two = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
```

```js [not.js]
test("not test", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = -1; b > -10; b--) {
      // 报错
      expect(a + b).not.toBe(0);
    }
  }
});
```

:::

::: tip

`toBe`使用`Object.is`来比较值.

`toEqual`是递归检查对比。

`toEqual`会忽略 undefined、稀疏数组， 如果想要比较这些可以使用`toStrictEqual`。

:::

## 真值

测试真值中，有时需要区分`undefined`、`null`、`false`，有时又不需要， jest 提供了比较全面的匹配器。

- `toBeNull`
- `toBeUndefined`
- `toBeDefined`=`not.toBeDefined`
- `toBeTruthy`是指`if()`括号中为真的
- `toBeFalsy`

## 数字

大多数比较数字的都有对应的匹配器：

- `toBeGreaterThan` 大于
- `toBeGreaterThanOrEqual` 大于等于
- `toBeLessThan` 小于
- `toBeLessThanOrEqual` 小于等于

## 字符串

字符串自带的`match`在这里可以用`toMatch`来测试对应的正则表达式

## 数组

数组和可迭代对象可以使用`toContain`来测试包含关系。

```js
test("array or iterator have some thing", () => {
  const arr = ["liu", "xiao", "need", "some"];
  expect(arr).toContain("neded");
});
```

## Exceptions 异常

测试某个函数是不是会抛出异常，使用`toThrow`

```js
test("compiling android goes as expected", () => {
  expect(() => compilingAndroidCode()).toThrow();
  expect(() => compilingAndroidCode()).toThrow(Error);
  expect(() => compilingAndroidCode()).toThrow(/JDK/);
  // 报错测试不通过
  // expect(() => compilingAndroidCode()).toThrow('yoqweqweqwewqequ are using the wronwg JDK');
  expect(() => compilingAndroidCode()).toThrow(
    /^you are using the wrong JDKk$/
  );
});
```

# 测试异步代码

- [Promise](#promise)
- [Async/Await](#Async)
- [Callbacks](#Callbacks)
- [`.reslove`/`.reject`](#reslove)

## Promise

测试返回一个`Promise`, 如果`reject`掉, 那么测试失败

```js
function fetchData(){
  // 模拟一个后端请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('peanut butter1')
    }, 1000)
  })
}

test('request remote and date is peanut butter', () => {
  // return出去，不然测试无效
  return fetchData().then( res => {
    expect(res).toBe('peanut butter')
  })
})
```

::: danger
**必须**使用`return`关键字，将测试的回调函数变为`Promise`, 否则测试是无效的
:::

## Async



## Callbacks

## reslove
