Buffer是一个类似于数组的对象，用于表示固定长度的字节序列。 

本质是一个内存空间，专门处理**二进制数据**

:::tip 特性

-   大小固定且无法调整
-   性能较好，直接对计算机内存操作
-   每个元素的大小都为1byte

:::

## 创建Buffer

-   `Buffer.alloc(size)`
-   `Buffer.allocUnsafe(size)`
    -    unsafe方式可能会遗留之前的数据，是复用之前的buffer内存空间
-   `Buffer.from( <string | number[]> )`

```js
let buf = Buffer.alloc(10)
let buf2 = Buffer.allocUnsafe(22)
let buf3 = Buffer.from('hello')
let buf4 = Buffer.from([105, 108, 111, 118, 101,121,111,117])
```

## 实例方法

| 方法名              | 描述                 |
|---------------------|----------------------|
| `buffer.toString()` | 将buffer转换为字符串 |
| `buffer[index]`     | 同数组下标使用读写   |

