一部专门为了**学习**Java而设计的书籍

1. 大量可视化GUI让你一目了然
2. 拟人化交谈提高学习后的效率
3. 让学者更深入的思考， 并持续取得读者的注意。

是一本非常不错的`java`入门书籍.

:::tip 提示
此书本称为最适合java初学者的入门书籍，书中的GUI还有各类示例和练习还有写作水平非常nice。

只有去亲自看本书才可以真正体会到它的魅力。 所以本页面仅是针对入门总结。

如果没有接触过编程语言或者只会设计HTML那么这本书不适合你。
:::

# 一、进入JAVA世界

:::tip

java以友好语法、面向对象、内存管理和跨平台可移植吸引程序员，写一次可在任何地方运行(**write-once/run-anywhere**)的特性.

:::

## 1. java工作方式

java目标是写出一个app且任何设备执行。

1. 编写源代码
2. 编译器运行源代码并检查错误
3. 编译器产出字节码，任何支持java装置都可以转译为可执行内容。
4. java虚拟机读取、执行字节码

对于我们来说：

1. 编写java源代码
2. 执行javac编译，产生一个.class文件
3. 输出.class文件
4. 启动java虚拟机，转译执行

## 2. java程序结构

java**类**存在于**源文件**中， **方法**存在于**类**中， **语句**存在于**方法**中。

**源文件**是一个.java文件。

## 3. 刨析类

java虚拟机启动执行，会找到特定的`main`方法。

```java
public static voif main(String[] args) {
  // 源代码
}
```

:::tip

每个程序至少有一个类， **至少且只有**一个`main`方法(作为程序的起点)。

:::

## 4. 循环与分支

在java中有着`while`、`for`、`do..while`、`if`、`else if`、`else`等， 语法同`javascript`。并不需要学习。

## 5. 《专家术语学习机》

在尝试使用这些简单语法时， 称不上是一个真正的app。 那么现在可以写一个真正的app：专家术语学习机。

:::info

三组各类意义的字符串数组容器， 然后互相随机组合成为一个单词，输出出来。 这样就有一个很牛逼但是卵用没有的 "专家术语学习机"

:::


```java
public class Main {
    public static void main(String[] args) {
        // 设置字符串数组， 存有不同的单词
        String[] wordListOne = {"24/7", "multi-tier", "30,000-foot", "B-to-B", "win-win", "front-end", "back-end", "web-based", "pervasive-computing"};
        String[] wordListTwo = {"empowered", "sticky", "value-added", "oriented", "centric", "distributed", "clustered", "networked", "smart"};
        String[] wordListThree = {"synergy", "leverage", "innovation", "paradigm", "bandwidth", "mission-critical", "dynamic", "holistic", "proactive"};
        // 获取数组的长度
        int oneLength = wordListOne.length;
        int twoLength = wordListTwo.length;
        int threeLength = wordListThree.length;
        // 生成数组内的随机元素索引
        int rand1 = (int) (Math.random() * oneLength);
        int rand2 = (int) (Math.random() * twoLength);
        int rand3 = (int) (Math.random() * threeLength);

        String phrase = wordListOne[rand1] + " " + wordListTwo[rand2] + " " + wordListThree[rand3];

        System.out.println(phrase);
    }
}
```

## 6.编译器与JVM

原书中通过一系列有趣的争辩对话了解到两者的区别，总结为：

**java虚拟机**：

1. 编译器只是生产文件，而我是运行
2. 语法错误之外还有错误会到我这里


**编译器**：

1. 严格的语法错误控制，是为了运行速度
2. 允许了动态绑定的功能，所以会放生一些数据类型错误
3. 数据安全如调用`private`方法，防止人们碰到不可触碰代码

# 二、拜访对象村

:::info

有人告诉我， 那里遍地都是对象。

这里有面向对象的类、方法、属性。

:::

## 1. 以对象来思考

:::tip

当你涉及类时，要记得**对象**是**类**的模型塑造出来的：

- 对象本身已知的事物，称为实例变量
- 对象会执行的动作，称为方法
- 对象是实例

::

## 2. 类与对象区别

### 类不是对象

类不是对象，是**用来创建对象的模型、模具**， 是对象的**蓝图**

可以使用雪糕模具**类**， 创造出无数的不同颜色、味道、品牌的雪糕**对象**。

## 3.创建使用类

```java
public class Movie {
    // 电影名
    String title;
    // 电影类型
    String genre;
    // 电影时长
    int rating;

    void playIt(){
        System.out.println("Playing " + title + " by " + genre);
    }
}

// 使用类创建对象
public class Main {
    public static void main(String[] args) {
        Movie movie1 = new Movie();
        movie1.title = "Inception";
        movie1.genre = "Sci-Fi";
        movie1.rating = 148;
        movie1.playIt();

        Movie movie2 = new Movie();
        movie2.title = "The Godfather";
        movie2.genre = "Crime";
        movie2.rating = 175;
        movie2.playIt();
    }
}
```

## 4. 快离开main

只要呆在`main`里面，就永远在对象村外面。

`main()`只有两种用途：

1. 测试真正的类
2. 启动你的java程序

## 5. 问答要点

1. java中没有全局变量或者方法一说。
    - 理论上类使用`public`或`static`修饰符，那么就可以变成全局变量
2. 什么是java程序，如何提交?
   - java是由一组类组成，其中主类带有启动方法`main()`
   - 如果没有虚拟机，需要将Java虚拟机一并提交到设备上
- 

