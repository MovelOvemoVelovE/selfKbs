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

# 前置后置函数

守卫模式，在**测试之前和测试之后**需要执行一些动作， jest提供了函数来实现功能。

## repeating重复设置

- `beforeEach()`前置
- `afterEach()`后置

::: info

假设我们测试之前需要检查是否有用户登录数据，

在测试之后检查下是不是用户被踢出去了。

:::

```js
let hadLogin = true;
beforeEach(() => {
  expect(hadLogin).toBeTruthy()
});
afterEach(() => {
  expect(hadLogin).toBeFalsy()
});
test('user info request', () => {
  // 注释掉报错
  hadLogin = false
  expect(2).toBe(2)
})

// 前置函数报错， 因为每一次运行测试都会进行重复守卫
test('user info request2', () => {
  expect(3).toBe(3)
})
```

## once一次性设置

一次性设置有`beforeAll`和`afterAll`

与`beforeEach`不同，这两个函数只会在**运行用例开始前和结束后执行一次**

```js
let hadLogin = true;
let hadLogin = true;
beforeAll(() => {
  expect(hadLogin).toBeTruthy()
});
afterAll(() => {
  expect(hadLogin).toBeFalsy()
});
test('user info request', () => {
  // 注释掉报错
  hadLogin = false
  expect(2).toBe(2)
})

expect(3).toBe(3)
```

::: tip

`beforeAll`执行顺序优先级是高于`beforeEach`的

`afterAll`执行顺序优先级是低于`afterEach`的

:::

## scoping作用域

`describe`函数内钩子具备作用域，执行顺序是**低于**顶级或者上级的`beforeEach`执行的顺序。

```js
beforeEach(() => console.log('1 - beforeEach'))
afterEach(() => console.log('1 - afterEach'))

test('', () => console.log('1 - test'))

describe('Scoped / Nested block', () => {
  beforeEach(() => console.log('2 - beforeEach'))
  afterEach(() => console.log('2 - afterEach'))

  test('', () => console.log('2 - test'))
})
```

## 执行顺序

使用`describe`块作用域，那么`jest`执行顺序会变得难以直接理解。

**遇到`describe`块， 优先执行`describe`块内代码， 遇到测试函数！相当于放入了js的微任务。**

```js
console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');

    test('test 1', () => console.log('test 1'));
  });

  console.log('describe outer-b');

  test('test 2', () => console.log('test 2'));

  describe('describe inner 2', () => {
    console.log('describe inner 2');

    test('test 3', () => console.log('test 3'));
  });

  console.log('describe outer-c');

/**
 * describe outer-a
 * describe inner 1
 * describe outer-b
 * describe inner 2
 * describe outer-c
 * test 1
 * test 2
 * test 3
 */
```

## 单独测试

当一套测试流程失败了，想检查某某一个是不是独立运行都失败？ 可以使用`test.only()`

# 模拟函数

模拟高阶函数的函数参数来擦除函数的实际实现。