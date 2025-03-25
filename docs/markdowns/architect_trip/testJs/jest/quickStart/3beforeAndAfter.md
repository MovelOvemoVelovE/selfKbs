前置后置其实就是守卫模式，在**测试之前和测试之后**需要执行一些动作， jest提供了函数来实现功能。

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