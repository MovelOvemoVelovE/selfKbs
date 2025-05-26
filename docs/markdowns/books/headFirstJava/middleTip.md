# 数字很重要

除了primitive主数据类型的运算，数字还有很多其他工作。

比如对数字计算绝对值、计算日期、格式化货币等。


## 1. Math方法

虽然java中没有东西是全局的，但是一种方法的行为不依靠实例变量值， 例如Math这个类的round方法，他永远执行同一个行为————取出浮点数的四舍五入值。

**永远无需创建Math的实例， 会用到的只有它的类本身**。

## 2. 静态static与非静态方法

使用**static**关键字来定义一个方法是静态的， 也就是不依赖于实例变量的。

```java
public static int min(int a, int b) {
    return a < b ? a : b;
}
```

如果需要调用则直接使用 `Math.min(3, 4)`

## 3. 静态方法与非静态变量/方法

静态方法不能调用非静态变量， 因为它并不知道是哪个实例的变量， 不知道堆上有哪些实例的。

非静态方法通常是以实例变量状态来行为方法， 所以静态方法是不可以调用非静态方法的。

## 4. 静态变量是所有实例的共享、相同的

先看下面的代码:

:::code-group
```java [Duck.java]
public class Duck {
    private int size;
    private static int duckCount = 0;

    public Duck() {
      // 每次构造器将 duckCount加1
        duckCount++; // [!code ++]
    }
    public void setSize(int s) {
        size = s;
    }
    public int getSize() {
        System.out.println("Size: " + size);
        return size;
    }
    public static int getCount() {
        return duckCount;
    }
}
```

```java [DuckTest.java]
public class DuckDeviceTest {
    public static void main(String[] args) {
        Duck duck1 = new Duck();
        Duck duck2 = new Duck();
        Duck duck3 = new Duck();
        Duck duck4 = new Duck();

        System.out.println(Duck.getCount()); // 输出4 实例被创建了4次
    }
}
```
:::

上面代码可以体会到，静态变量是所有实例共享的、相同的变量。

实例对象并不会维护自己的一份 duckCount变量. 上面代码展示了类被创建了多少个实例.

## 5. 静态变量的起始

- 静态变量会在类的任何对象创建之前完成初始化

- 静态变量会在类的任何静态方法执行之前初始化

- 静态变化是在类被加载时被初始化

## 6. 静态的final变量是常数

标记为final的变量代表是常数！初始化后就不回改动， 如`Math.PI`。

**常数变量的名称应该是大写字母，单词之间用下划线分隔**。

```java
public static final double PI = 3.14159;
// public是公开的，供各方读取
// static是静态的，不需要读取实例化对象
// final是常量，不能被修改, 圆周率是不变的。
```

静态初始化程序是一段加载类时执行的程序代码， 适合放final静态变量的起始程序：

**用于给静态final变量赋值的操作**

```java
// 声明则赋值
public class Foo {
    public static final int FOO_X = 254;
}
// 声明不赋值，在静态初始化程序中赋值
public class Test {
    public static final int BAR_SIGN;
    static {
        BAR_SIGN = 1;
    }
}
```

## 7. final不止可以用于静态变量

1. final可以用于实例变量，甚至局部变量、方法的参数。都是用于表明值不可变动。

1. final方法则表明不可以覆盖

1. final类则表明不可以被继承

## 8. 其他Math方法

| 方法名 | 描述 | 示例 |
| ------ | ---- | ---- |
| `Math.random()` | 生成0到1之间的双精度浮点数 | `int r2 = (int)(Math.random() * 100);` |
| `Math.abs()` | 计算绝对值 | `int abs = Math.abs(-5);` |
| `Math.round()` | 四舍五入 | `int round = Math.round(3.5f);` |
| `Math.min()` | 计算最小值 | `int min = Math.min(3, 4);` |
| `Math.max()` | 计算最大值 | `int max = Math.max(3, 4);` |
| `Math.sqrt()` | 计算平方根 | `double sqrt = Math.sqrt(16);` |
| `Math.pow()` | 计算幂 | `double pow = Math.pow(2, 3);` |
| `Math.ceil()` | 向上取整 | `double ceil = Math.ceil(3.2);` |

## 9. 包装类：字符串转数字

`Integer.parseInt()`、`Double.parseDouble()`、`Float.parseFloat()`等方法可以将字符串转换为数字。

## 10. 包装类：数字转字符串

```java
String intStr = Integer.toString(123);
String doubleStr = Double.toString(3.14);
String floatStr = Float.toString(2.71f);
```

## 11. 数字格式化

先查看一个例子，讲数字用逗号相隔展示。

`String s = String.format("%,d", 1234567890);`

格式化format，第一个参数的格式可以总结为以下:

`% [argument_index$] [flags] [width] [.precision] conversion`
- `argument_index$`：可选，指定参数的索引
- `flags`：可选，指定格式化的标志
- `width`：可选，指定最小宽度
- `.precision`：可选，指定小数点后的位数
- `conversion`：必需，指定转换类型，如`d`（整数）、`f`（浮点数）、`s`（字符串）等

```java
public class Main {
    public static void main(String[] args) {
        // The rank is 154984.22, out of 49,875,145.13
        System.out.println(String.format("The rank is %.2f, out of %,.2f", 154984.215, 49875145.126548));
        // The rank is 49875145.13, out of 154,984.22
        System.out.println(String.format("The rank is %2$.2f, out of %1$,.2f", 154984.215, 49875145.126548));
    }
}
```

## 12 日期格式

查看几个日期格式化的范例

```java

```