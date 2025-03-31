Crypto提供基本的加密功能，允许访问一个密码学安全的随机数生成器和密码学原理。

可以使用`window.crypto`或在 worker 中使用`workerGlobalScope.crypto`访问。

::: danger abandon

专业的加解密通常是安全学专家做的事情，能用的机会很少

:::

## 属性

`subtle`提供了前端基本的低级密码。

用的也就是`encrypt()`和`decrypt()`