# 1、对象无处不在

"学习一门新语言将为你打开一扇通往新世界的大门" ———— 路德维希·维特根斯坦

> **创建对象后，数据保存在哪里?**
>
> 1. **寄存器**： 速度最快的数据存储方式， 直接保存在CPU中， 但是数量有限
> 2. **栈**： 存储在RAM，也就是内存中。 只不过JAVA在创建app时必须明确栈上所有对象的生命周期， 限制约束灵活性
> 3. **堆**： 也是存储在RAM中， 但是不需要在创建app时明确对象的生命周期， 由垃圾回收器自动管理， 灵活性更强
> 4. **常量存储**： 通常存储在程序代码中， 但是在某些嵌入式系统中存储在ROM中， 也就是只读存储器
> 5. **非RAM存储**： 没有保存在app中，如序列化对象和持久化对象， 这些对象保存在磁盘上， 通过IO流读写。 JAVA支持轻量级的持久化对象存储，
     有些库可以支持从数据库获取对象信息

## 特殊类型--基本类型

基本类型不需要`new`创建， 直接声明。 且直接创建变量并存储在栈中，注意不是创建**引用**。

基本数据类型如下表所示：

| 类型      | 大小      | 最小值                        | 最大值                       | 包装类       |
|---------|---------|----------------------------|---------------------------|-----------|
| boolean | --      | --                         | --                        | Boolean   |
| char    | 2 bytes | '\u0000' (0)               | '\uffff' (65,535)         | Character |
| byte    | 1 byte  | -128                       | 127                       | Byte      | 
| short   | 2 bytes | -32,768                    | 32,767                    | Short     |
| int     | 4 bytes | -2,147,483,648             | 2,147,483,647             | Integer   |
| long    | 8 bytes | -9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 | Long      |
| float   | 4 bytes | 1.4E-45                    | 3.4028235E38              | Float     |
| double  | 8 bytes | 4.9E-324                   | 1.7976931348623157E308    | Double    |   
| void    | --      | --                         | --                        | Void      |

包装类这个概念， 是暴露出位于**堆**上的非原始对象， 如：

```java
char a = 'x';
Character b = new Character(a);
```

**自动装箱**： Java会自动将基本类型转换为包装类， 反之亦然， 如：

```java
Character b = 'x'; // 自动装箱
char a = b;        // 自动拆箱
```

::: danger
基本数据类型包装类在java9中被弃用deprecated.
:::

### 高精度数字

Java提供了`BigInteger`和`BigDecimal`类来处理超出基本类型范围的高精度数字。

这两个类是没有基础类型的， 只能通过`new`创建， 两个都是位于`java.math`包中。

`BigInteger`用于处理任意精度的整数， `BigDecimal`用于处理任意精度的浮点数。

## 无须销毁对象

### 作用域

java中，嵌套作用域的变量重名是**不被允许的**

```java
{
    int x = 0;
    if (true) {
        // int x = 1; // 编译错误， 变量重名
        System.out.println(x); // 访问外层作用域的x
    }
}
```

java中无需关心对象的销毁，垃圾处理器会处理掉它们。

### 字段

可以在类中定义字段。 如果是作为类成员， java会设置默认值。 而如果是方法内生命未赋值，那么java会在编译时报错。

| 字段类型    | 默认值            |
|---------|----------------|
| boolean | false          |
| char    | '\u0000'(null) |
| byte    | 0              |
| short   | 0              |
| int     | 0              |
| long    | 0L             |
| float   | 0.0f           |
| double  | 0.0d           |

---

### 编写java程序

#### 名称可见性

所有语言都会有一个问题，那就是对于名称的控制。 在程序的某一模块使用一个名称，有的人在另外的模块也是用了同名，那么怎么区分。

java通过新颖的方法来解决问题，将命名空间和反转的URL所生成的文件路径关联。

#### 使用其他组件

为了消除类与库的冲突，java可以使用`import java.util.ArrayList`和`import java.util.*`来导入类使用，不过第二种在很多编程风格中都明确要求指出具体类

#### static关键字

使用了`static`关键字，可以不创建对象而直接访问类成员。

对于这个可以叫做**类数据**和**类方法**， 也就是静态数据和静态方法。

```java
class StaticText {
    static int num; // 静态字段
    static void print() { // 静态方法
        System.out.println(num);
    }
}

StaticText.num++
StaticText.print();
```

### 第一个java程序和笔记规范

可以写成第一个完整程序， 运行时显示一个字符串，以及一个java标准库的Date类生成的日期。

第一行注释则为示例文件夹的路径， 接下来的行则是`import`引入的所有额外的库中类，如`import java.util.*;`

java额外的类很多，可以下载Oracle公司官网的JDK文档，查看列表及用法。

```java
// objects/HelloWorld.java
import java.util.Date;

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println(new Date());
    }
}
```

#### 程序启动入口

每一个文件内必须有一个和文件同名的类，且类中有一个`public static void main(String[] args)`方法， 作为程序的入口。

#### 标准库

java的重要资产之一也是极其丰富的标准库， 如`System`的库:

```java
public class ShowProperties {
    public static void main(String[] args) {
       System.getProperties().list(System.out); // 打印所有系统属性
       System.out.println(System.getProperty("user.name")); // 当前用户名
        System.out.println(System.getProperty("java.library.path")); // java库路径
    }
}
```

#### 编程风格

"Code Conventions for the Java Programming Language"是java的编程风格规范， 可以在Oracle官网找到。

要求类名使用大驼峰风格，而方法和数据则使用小驼峰风格。

# 2. 操作符

## 使用java操作符

java操作符接受一个或多个参数，然后生成一个新的值。 这里参数与普通方法参数形式不同， 但是效果一致

普通的加法、减法、乘法、除法、取模与其他语言基本相同。 有些操作符会修改自身的值，也叫做**副作用**。

> 几乎所有操作符只能操作基本数据类型， 例外的是 `=`、`==`、`！=`可以操作对象(这也是对象一个容易令人疑惑的地方)
>
> String类也支持`+=` 和 `+`操作符。

## 优先级

最简单的规则就是先乘除后加减。 可以用括号来明确计算顺序。

`+`意味着字符串拼接， 如果需要，还会执行字符串转换。 当一个字符串后跟着`+`和一个非`String`字符，那么会尝试将非`String`字符转换为
`String`， 然后进行拼接。

## 赋值

对于赋值来说，基本数据是赋值，而引用数据类型则是赋值引用， 也就是指向同一个对象。

### 方法调用中的别名

当一个对象作为参数传递给方法时， 实际上传递的是对象的引用， 也就是别名。 这样在方法内对对象的修改会影响到原始对象。

```java
public class PassObject {
    static void f(Letter y) {
        y.c = 'z';
    }
    public static void main(String[] args) {
        Letter x = new Letter();
        x.c = 'a'; // a
        System.out.println("1: x.c: " + x.c); // a
        f(x);
        System.out.println("2: x.c: " + x.c); // z
    }
}

class Letter {
    char c;
}
```

## 算数操作符

java中的算数操作符与其他语言类似，包括了乘法(`*`)、除法(`/`)、取模(`%`), 整数除法的结果是舍弃小数位，而不是四舍五入。

通过`Random`类创建对象可以生成随机数。 通过调用`Random`类的`nextInt()`、`nextFloat()`、`nextDouble()`、`nextLong()`
等方法可以生成不同类型的随机数。

> `Random`的`nextInt(n)`方法生成的整数下限为0。

```java
public class Mathops {
    public static void main(String[] args){
        // 创建一个种子随机数生成器
        Random rand = new Random(47);
        int i, j, k;
        // 产生两个0-99之间的随机整数
        j = rand.nextInt(100) + 1;
        System.out.println("j: " + j);
        k = rand.nextInt(100) + 1;
        System.out.println("k: " + k);
        i = j / k;
        System.out.println("j / k: " + i);
        i = j % k;
        System.out.println("j % k: " + i);
        // 单精度浮点数float运算
        float u, v, w; // 使用单精度
        v = rand.nextFloat();
        System.out.println("v: " + v);
        w = rand.nextFloat();
        System.out.println("v - w: " + w);
        u = v * w;
        System.out.println("v * w: " + u);
        u = v / w;
        System.out.println("v / w: " + u);
    }
}
```

#### 一元操作符

一元减号是可以将正数变为负数， 负数变为正数。

> 一元操作符可以将较小的类型提升为int类型。

```java
public class Mathops {
    public static void main(String[] args){
        int a = 100;
        int x = -a;  // 转换为负数
        byte d = 10;
        int y = -d; // 将较小的byte转换为int，然后转换为负数
        System.out.println(x);
        System.out.println(y);
    }
}
```

#### 关系操作符

这里的关系与其他语言基本无异， 但是可以看下 测试对象是否相等 这个命题

##### 测试对象是否相等

`==`和`!=`可以用来比较对象， 但是比较的是引用， 也就是内存地址。 如果两个引用指向同一个对象， 那么它们是相等的。

> 接下来比较整数值用4种方式来创建
> 1. 规定变量为`Integer`类型， 直接赋值
> 2. 通过`new`创建
> 3. 通过`Integer.valueOf()`创建
> 4. 规定变量为`int`类型， 直接赋值
> 
> 并且关注下127 和 128 这两个边界值的不同表现
> 

```java
public class Equivalence {
    static void show(String desc, Integer n1, Integer n2) {
        System.out.println(desc + " : ");
        System.out.printf(
                "%d===%d %b %b%n", n1, n2, n1 == n2, n1.equals(n2)
        );
    }

    @SuppressWarnings("deprecation")
    public static void test(int value) {
        // 变量为 Integer 类型
        Integer i1 = value;
        Integer i2 = value;
        show("Automatic", i1, i2);

        // 使用 new 创建 Integer 对象
        Integer r1 = new Integer(value);
        Integer r2 = new Integer(value);
        show("new Integer", r1, r2);

        // 使用 Integer.valueOf 创建 Integer 对象
        Integer v1 = Integer.valueOf(value);
        Integer v2 = Integer.valueOf(value);
        show("Integer.valueOf", v1, v2);

        // int 作为整数数值对象
        int p1 = value;
        int p2 = value;
        show("int", p1, p2);
    }

    public static void main(String[] args) {
        /**
         * 对于 -128 到 127 之间的整数，Java 使用享元模式来缓存对象， 超出边界则是每次创建新的对象
         * 127 输出结果如下
         * Automatic :
         * 127===127 true true
         * new Integer :
         * 127===127 false true
         * Integer.valueOf :
         * 127===127 true true
         * int :
         * 127===127 true true
         */
        test(127);
        /**
         * 对于 128 输出结果如下
         * Automatic :
         * 128===128 false true
         * new Integer :
         * 128===128 false true
         * Integer.valueOf :
         * 128===128 false true
         * int :
         * 128===128 true true
         */
        test(128);
    }
}
```

> 浮点数比较(==)`Double.MAX_VALUE`和`Double.MAX_VALUE - Double.MIN_VALUE * 1000000`是相等的。


### 逻辑运算符

逻辑运算符与其他语言类似， 但是JAVA中`&&`和`||`只可用于布尔值。

java中也有**短路**的概念， 对于`&&`如果第一个条件已经决定了结果， 那么第二个条件就不会被计算。 

### 按位操作符

操作单个二进制位， 对两个参数的对应二进制进行布尔代数运算。

两个输入位都是1 则 按位`&`(与操作符)输出1， 否则为0;

两位一个为0， 一个为1， 则按位`|`(或操作符)输出1， 只有2个都为0则输出为0;

两位只有一个是1， 则按位`^`(异或操作符)输出1， 否则输出0;

按位`~`(非操作符)将0变为1， 1变为0。 **是一元操作符**， 只对一个操作数进行操作。

### 移位操作符

[//]: # (TODO)

### 字符串转换

通过`+`和`+=`操作符可以将非字符串类型转换为字符串类型。 同JavaScript。

```java
int x = 0;
System.out.println("" + x); // 0
```

是执行类型转换的一种方法， 不用调用麻烦的显式方法:`Integer.toString(x)`。

### 类型转换操作符

适当时候，java会自动将一种类型的数据转换为另一种类型数据。 例如当整数赋值给浮点变量， 将自动`int`转换为`float`。

如果想要对某个值转换，可以将希望得到的数据类型放在括号中。

> 类型转换可能是多余的， 但是仍然可以做多余的类型转换来表明观点，或者是仅仅让代码更加清晰。

```java

```













