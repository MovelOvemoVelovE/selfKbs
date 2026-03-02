# 函数使用

函数基本知识 及 存储在**模块**文件中，使得代码更加易读。

## 函数的定义及文档注释

在`py`中， 使用`def`关键字定义函数， 函数冒号后的 所有缩进行组成了函数体。

在紧跟着函数名的第一行**三引号**包裹的字符串， 成为**文档注释串**， 用于描述函数的功能， 以及参数和返回值等信息。

```python
def getName():
    """获取用户姓名"""
    name = input("请输入您的姓名：")
    return name
```

## 实参

`py`中实参除了按照顺序填入的**位置参数**， 也有**关键字参数**

位置参数就是编程的普通模式， 关键字参数是指定与形参变量名一样的变量并赋值

```py
def printInfo(name, age):
    """打印用户信息"""
    print("姓名：", name)
    print("年龄：", age)

printInfo("小明", 18)          # 位置参数
printInfo(age=20, name="小红")  # 关键字参数
```

> [!NOTE] 备注
> 在`py`中也是可以给形参设置默认值

## 实参与形参数量不匹配

在`py`中必须等效， 等数量。 如果说实参少于形参，或者实参多于形参， 都会报错。

如果实参非要少于形参， 那么只有**给形参设置默认值**

## 列表传参

需要注意的是在`js`中将对象传递进来的行为，修改后会影响到外部对象

而在`py`中传递列表进入函数， 所有的修改都是**永久的，会改变外部的列表变量**

想要解决， 传递前可以[复制列表](./chapter2#复制)

## 剩余参数(rest参数) => 元组

使用`*argsName`语法， 将剩余参数语法收集到一个**元组**内。

> [!TIP] 提示
> reset语法与`js`一致， 基础语法记录，其余的用法灵活同`js`
>
> 实参传入直接传入值即可

```py
def getFullName(firstName, lastName, *args):
    """Returns the full name by combining first and last names."""
    print(args)
    return f"{firstName} {lastName}"


getFullName('xiao', 'liu', 18, 'yellow') # [!code highlight]
```

## 剩余参数(rest参数) => 字典

上述一个`*`号收集到的剩余参数会转换为元组。 而使用两个`**`则是会将剩余参数收集到**字典**中。

> [!TIP] 提示
> rest实参传入时， 必须为`key=value`的形式

```python
def printRestDict(first, second, **rests):
    print(first, second)
    print(f"rests: {rests}")


printRestDict('a', 'b', age=18, color='yellow') # [!code highlight]
```

## 存储到模块

**模块是扩展名为.py的文件**， 用于存储函数和变量， 以便在其他`py`文件中导入使用。

将函数代码等放入文件中， 之后导入

导入的核心功能同`js`： 全量导入、局部导入、全局导入as重命名、局部导入as重命名、一次性导入所有函数

```python
# 全局导入
import utils

utils.getUserInfo('12345')

# 局部导入
from utils import getUserInfo, getOrderInfo

getUserInfo(6666)

# as全局导入
import utils as ut

ut.getUserInfo('12345')

# as局部导入
from utils import getUserInfo as gui

gui(6666)

# 直接导入所有内容
from utils import *
getUserInfo('12345')
```

# 函数编写指南

- 注释要紧跟在函数定义后，知识最少原则， 查看文档注释即可
- 形参默认值，等号两边不要有空格
- 关键字参数传递时， 形参名与实参名要一致
