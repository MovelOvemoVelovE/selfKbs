# 测试代码

使用pytest编写和运行测试代码。

> python提供了一款叫做pip的工具，用来安装第三方包， 所以更新频繁。 需要先更新下pip
>
> `python -m pip install --upgrade pip`
>
> `python -m pip` 是python运行pip模块
> `install --upgrade` 是更新python的包
> `pip` 是包管理工具

## 安装pytest

使用pip安装pytest：

```bash
python -m pip install --user pytest
```

## 测试简单函数

编写测试：

- 第一步是要有被测试的代码， 首先编写一个函数
- 第二步则是编写测试代码， 测试函数必须是`test_`开头, 更具有描述性
- 第三步做出一个断言， 断言函数的值是预想的那样
- 第四步运行测试 `pytest`， pytest会自动发现当前目录下所有以`test_`开头的函数并运行它们

:::code-group

```python[name_function.py]
def name_function(first, middle, last):
    full_name = f"{first} {last}"
    return full_name.title()


print(name_function("John", "Smith"))
```

```python[test_name_function.py]
from name_function import name_function


def test_name_function():
    assert name_function("John", "Smith") == "John Smith"
    assert name_function("Jane", "Doe") == "Jane Doe"
    assert name_function("Alice", "Johnson") == "Alice Johnson"
```

```shell
$ pytest
```

:::

## 未通过并修复

以上就是简单的测试可以通过的用例， 下面看一个测试未通过的例子， 并且未通过例子后咱们修改函数

:::code-group

```python[name_function.py]
def name_function(first, middle, last):
    full_name = f"{first} {last}"
    return full_name.title()  
```

```python[test_name_function.py]
from name_function import name_function
def test_name_function():
    assert name_function("John", "Smith") == "John Smith"
    assert name_function("Jane", "Doe") == "Jane Doe"
    assert name_function("Alice", "Johnson") == "Alice Johnson"
    assert name_function("John", "Paul", "Jones") == "John Paul Jones"
```

```shell
$ pytest
```

```python[修复后的name_function.py]
def name_function(first, middle='', last=''):
    if middle:
        full_name = f"{first} {middle} {last}"
    else:
        full_name = f"{first} {last}"
    return full_name.title()

```

:::

## 测试断言

断言是测试代码的核心， 它用来核实函数的输出是否符合预期。 断言的语法是`assert`关键字后跟一个表达式， 如果表达式为真， 测试通过；
如果为假， 测试失败并抛出`AssertionError`异常。

| 断言示例                | 说明        |
|---------------------|-----------|
| `assert a == b`     | 断言a等于b    |
| `assert a != b`     | 断言a不等于b   |
| `assert a`          | 断言a为真     |
| `assert not a`      | 断言a为假     |
| `assert a in b`     | 断言a在列表b中  |
| `assert a not in b` | 断言a不在列表b中 |

## 测试类



