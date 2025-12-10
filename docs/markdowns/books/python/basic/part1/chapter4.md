# 字典

`py`字典中为花括号包裹的 **键值对**。

:::tip
值可以是数、字符串、列表、字典、元组等任意值
:::

| 操作                        | 说明                |
|---------------------------|-------------------|
| `dict[key]`               | 访问, 如果不存在报错       |
| `dict[key] = value`       | 添加或修改             |
| `del dict[key]`           | 删除                |
| `dict.get(key, default?)` | 访问，键不存在则返回默认值None |


## 遍历字典

| 操作                     | 说明             |
|------------------------|----------------|
| `for key,value in dict.items()` | 遍历字典的键值对        |
| `for key in dict.keys()`        | 遍历字典的键          |
| `for value in dict.values()`    | 遍历字典的值          |

```python
alien_0 = {'color': 'green', 'points': 5, 'speed': 'slow', 'lives': 3}
for key, value in alien_0.items():
    print(f"Key: {key}")
    print(f"Value: {value}\n")
```

## 



