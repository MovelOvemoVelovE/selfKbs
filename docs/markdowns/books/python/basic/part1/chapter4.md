# 字典

`py`字典中为花括号包裹的 **键值对**。

:::tip
值可以是数、字符串、元组等**不可变**的值
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

## 特殊处理

- 循环的键`dict.keys`可以使用列表方法`sorted(dict.keys())`**排序**

- 循环的值`dict.values`可以使用集合`set(dict.values())`**去重**

> [!IMPORTANT] 注意
> 可以直接花括号包裹创建集合
> 
> ```python
> languages = {'python', 'c', 'java', 'python'} # 结果为 {'python', 'c', 'java'}
> ```

## 嵌套

字典可以嵌套列表，列表可以嵌套字典，字典可以嵌套字典。

### 外星人列表

创建一个外星人列表，每个外星人都是一个字典，有着自己的属性

```python
lists = []
# 创建30个外星人 三等分为 绿色 黄色 红色 and 30cm 10cm 1cm and 5岁 2岁 1岁
for i in range(30):
    if i < 10:
        alien = {'color': 'green', 'size': '30cm', 'age': 5}
    elif i < 20:
        alien = {'color': 'yellow', 'size': '10cm', 'age': 2}
    else:
        alien = {'color': 'red', 'size': '1cm', 'age': 1}
    lists.append(alien)
```

### 班级语言清单

```python
class_languages = {
    'alice': ['python', 'c'],
    'bob': ['java'],
    'carol': ['python', 'ruby'],
}
```






