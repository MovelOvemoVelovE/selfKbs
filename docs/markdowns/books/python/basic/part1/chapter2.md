# 列表

python列表就是js的数组，可以存储不同类型的数据

## 反向取值

可以通过-1、-2等方式反向取值

## 增、删、改、插

| 操作        | 方法                        | 结果                            |
|-----------|---------------------------|-------------------------------|
| 增加        | `List.append(xxx)`        | 在列表末尾添加一个元素                   |
| 索引删除      | `del List[index]`         | 删除指定索引的元素                     |
| 索引尾部删除或任意 | `List.pop(index?)`        | 删除并返回列表的最后一个元素， 也可以传入索引删除指定位置 |
| 值删除       | `List.remove(xxx)`        | 删除第一次出现的值                     |   
| 修改        | `List[index] = xxx`       | 修改指定索引的元素                     |
| 插入        | `List.insert(index, xxx)` | 在指定索引位置插入, 超出了长度范围则是尾增        |

## 方法

| 说明   | 方法        | 使用                             | 备注              |
|------|-----------|--------------------------------|-----------------|
| 变异排序 | `sort`    | `List.sort(reverse = True)`    | 永久修改, 传入参数可倒序排列 |
| 临时排序 | `sorted`  | `sorted(List, reverse = True)` | 不修改原列表， 返回新列表   |
| 反转   | `reverse` | `List.reverse()`               | 永久修改            |
| 长度   | `len`     | `len(List)`                    | -               |

## 遍历列表

普通循环如下:

```py
for item in List:
    print(item)
```

### 缩进

在`py`中，缩进很重要， for循环体内的代码才需要缩进！ 一旦某一行代码缩进结束了， 那么就代表循环结束。

## 数值列表

可以使用`range`函数创建数值列表， 循环数字。

```py
for num in range(1,6):
    print(num)
```

:::tip
通过给`range`传入第三个参数， 可以设置步长。
:::

而`py`内置对数值列表简单统计的方法:

```py
print(min(nums))  # 最小值
print(max(nums))  # 最大值
print(sum(nums))  # 总和
```

## 列表推导式

`py`支持列表推导式, 一行代码就可以快速创建列表:

```py
squares = [value**2 for value in range(10)]
print(squares) // [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

## 切片

`py`也是支持 `js`的数组切片语法: `lists[startIndx:endIndex:step]`

```py
lists = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
print(lets[2:5]) # 2到5下标
print(lets[:5])  # 头到5下标
print(lets[5:]) # 5下标到结尾
print(lets[-3:]) # 倒数第3个到结尾
print(lets[1::2]) # 下标1开始到结尾每隔2个
```

## 复制

`py`中列表复制可以使用切片语法， 由于 `py`中变量赋值也是**引用传递**

```py
my_foods = ['pizza', 'falafel', 'carrot cake']
friend_foods = my_foods[:]
print(friend_foods)
```

# 元组

不能修改的值称为**不可变的**， 不可变的列表成为**元组**（tuple）。

元组使用圆括号 `()` 来表示， 元组中的元素用逗号 `,` 分隔。

:::tip

- 严格来说， 元组就算只有一个元素， 也需要在后面加逗号， 否则 `py`会认为不是元组。

- 元组变量可以赋值，但元组中的元素不能修改。

:::


# 列表、字符串、元组转换

可以使用`list()`、`str()`、`tuple()`函数进行相互转换:

可以用`.join()`方法将列表转换为字符串:

```py
str = '$'
joined_str = str.join(['a', 'b', 'c'])
print(joined_str)  # a$b$c
```

