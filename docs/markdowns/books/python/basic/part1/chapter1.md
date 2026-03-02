# 安装

安装 python, 使用 pycharm 文本编辑器作用开发工具

# 变量

```py
message = "Hello, Python!"
```

批量变量赋值也可以：

```py
a,b,c = 1,2,3
```

# 字符串

> 字符串使用**单引号或双引号**都可以

## "模版字符串"

f开头，引号包裹，花括号使用变量、表达式

```py
name1 = 'Alice'
name2 = "Bob"
greeting1 = f"Hello, {name1}! Bye {name2}"
```

## 字符串方法

| 方法                | 说明              | 使用                                  |
|-------------------|-----------------|-------------------------------------|
| `title`           | 将字符串的每个单词的首字母大写 | `String.title()`                    |
| `upper`           | 将字符串转换为大写       | `String.upper()`                    |
| `lower`           | 将字符串转换为小写       | `String.lower()`                    |
| `strip`           | 去除字符串两端的空白字符    | `String.strip()`                    |
| `lstrip`、`rstrip` | 去除字符串左端或右端的空白字符 | `String.lstrip()`、`String.rstrip()` |
| `removePrefix`    | 去除字符串前缀         | `String.removeprefix('pre')`        |

# 数

有意思的是， 可以用下划线分隔数字，使其更易读

```py
money = 14_000_000_000
print(money) // 14000000000
```

# 注释

`#`开头书写注释

# python之禅

在python终端，输入`import this`即可看到python之禅。 也是挺有意思的。







