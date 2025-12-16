# 类

面向对象语言(Object-Oriented Programming, OOP)是一种编程范式, 万物皆对象。Python是一种面向对象的编程语言。

`py` 的类和 `js`的类基础声明有一些 编码风格上和要求上的区别:

:::tip
- `constructor`构造函数为 `__init__` 方法
- `this` 关键字为 `self`
- 类的方法第一个是 `self` 参数， 用于表示类的实例对象本身
- 类的属性通常在 `__init__` 方法中定义
- 实例化不需要`new`
- 类命名是**大驼峰命名法** (PascalCase)
- 类方法命名是`_`风格的(如: get_name)
- 紧跟定义后可以写文档注释
:::

```python
class Dog:
    """这里是一个狗类的示例"""
    def __init__(self):
        self.name = "Buddy"
        self.age = 3

    def get_name(self):
        return self.name

myDog = Dog()
```

## 更加具体细节的定义

在`__init__`， 可以不传入形参，直接定义就是**默认值**。

## 使用类和实例

使用类和实例**正常使用**即可。

## 类继承

类的继承是在**类名后括号内**写上父类名(可多重继承， 但谨防钻石继承问题)。 

也是通过`super`方法来获取到父类的方法。

重写也是同名方法覆盖。

## 组合

> [!NOTE] 备注
> 可以将实例来作为属性， 将大型类拆分为功能协同合作的小类， 称之为**组合**

作为电池，可以设置一个电池类，详细介绍电池的**信息**(属性和方法)

```python
class Car
    --snip--
    
class Battery: #[!code ++]
    def __init__(self, capacity=70): #[!code ++]
        self.capacity = capacity #[!code ++]
 #[!code ++]
    def get_capacity(self): #[!code ++]
        return self.capacity #[!code ++]
        
class ElectricCar(Car):
    def __init__(self, make, model, year):
        super().__init__(make, model, year)
        self.battery = Battery() #[!code ++]
    ---snip--
```

# 导入类

导入类和导入模块是一样的。

只不过有一点是， 当一个模块内类 导入使用了 另一个类， 如电车继承了`Car`， 但是`Car`类在另一个模块内， 那么就需要先导入`Car`类， 然后才能使用。

:::code-group
```py[ElectricCar.py]
class ElectricCar(Car):
```
```py[Car.py]
class Car:
```

```py[my_car.py]
from Car import Car
from ElectricCar import ElectricCar

my_tesla = ElectricCar('tesla', 'model s', 2019)
```
:::

# python标准库

Python 标准库 (Python Standard Library) 是 Python 自带的一组模块和包， 提供了丰富的功能。 如果要使用， 直接`import`即可。

有趣的函数如`randint`， 可以生成两个参数之间的随机整数。 `choice`， 可以从一个列表、元组中随机选择一个元素。

```py
from random import randint, choice

a = randint(1, 3)
print(a)

b = choice([11, 22, 33, 412, 1235])
print(b)
```

# 类编程风格

- 类名使用**大驼峰命名法** (PascalCase)
- 方法名使用**下划线命名法** (snake_case)
- 属性名使用**下划线命名法** (snake_case)
- 类定义后紧跟文档注释
- 空行分割代码，但不宜过多，一个空行来分割方法
- 导入标准库模块后， 使用空行分割自己编写的模块导入
