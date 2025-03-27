这里是一个小小的hello jest示例

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
