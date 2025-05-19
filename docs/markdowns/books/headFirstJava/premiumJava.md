这一章开始我理解为premium进阶版， 介绍java的特性及设计app的一些要求。

# 继承与多态

规划程序时要考虑到未来。 

少写点程序代码? 别人很容易扩展的程序代码? 非常灵活，即使上线前最后一刻修改也是可以应付? 

这里1小时会教会你java的这种能力。

# 一、对象村优质生活

## 1. 了解继承

设计继承，我将公共程序代码放在某个类钟，然后告诉其他类：此类是他们的父类， 当一个类继承另一个类，那么就是：

**子类继承父类**。

那么下面是继承的范例：

```java
public class Doctor {
    boolean worksAtHospital;

    void treatPatient(){
        System.out.println("我会检查看x片");
    }

    public static void main(String[] args) {

    }
}

public class FamilyDoctor extends Doctor {
    boolean makesHouseCalls;
    void giveAdvice(){
        System.out.println("我会给你一些诊断建议");
    }
}

public class Surgeon extends Doctor {
    void treatPatient(){
        System.out.println("我会给你做手术");
    }

    void makeIncision(){
        System.out.println("我会给你做截肢");
    }
}
```  

## 2. 是否应该继承

当某物是否应该继承另一物体，那么可以使用**IS-A**关系来判断。

三角形是一个多边形?————true

外科医生是医生?————true

hello kitty是猫?————true

澡盆是一个浴池?————false

如果验证不通过则说明你的设计是有问题的。

澡盆和浴池确实有关系，但是是**HAS-A**关系。 如果浴池有一个澡盆是成立的，表示浴池里应该有一个澡盆的实例变量。

## 3. IS-A还有!!

**IS-A**适用于任何继承层次的任何地方， 如果你的继承层级书设计的很好，那么所有的子类都可以通过任意上一层父类的**IS-A**检验。

:::info

如果Y是继承的X， 且Y是Z的父类， 那么！ Z一定通过了IS-A X的测试

IS-A关系在继承下一定是单向的关系， 如果会双向则可能是同级或者是相同的两者。

:::

## 4. 子类怎么继承? 继承哪些?

子类可以继承父类的成员，父类可以通过存取权限符来决定子类是否可以继承。

比如妈妈的金镯子并不想给你这个败家子， 而是想自己保管。


**权限从小到大的顺序为**
- `private`
  - 只能在类中使用
  - 不会被子类继承
- `default`
  - 只能在同包中使用
  - 不会被子类继承
- `protected`
  - 只能在同包中使用
  - 会被子类继承
- `public`
  - 可以在任何地方使用
  - 会被子类继承

## 5. 善用继承吗?滥用继承?

当子类会比父类更具有特定意义的时候使用继承。 例如美短是一种特定的猫，可以从猫科中扩展继承一种美短猫。

在相同基本类型类共享了很多程序代码， 如方形、圆形、正方形都需要旋转和播放声音，那么放在父类然后继承是很合理的。

:::tip

要注意到，继承虽然是面向对象程序设计的一项关键特征，但不一定是最佳的抽离重用程序代码的最佳方式。

有时**设计模式**更可以微妙的、适应性的选择。《Head First 设计模式》是一本不错的书

:::

如果两者之间通过不了 **IS-A**关系， 那么就不应该使用继承。  一定要确认**子类是一种特定的父类**


## 6. 继承到底有什么意义?

1. 继承避免了重复的程序代码， 在单一位置定义共同的程序代码， 让子类继承， 当想要修改这个行为程序，只需要修改父类的程序代码。

1. 定义出共同的协议

### 继承确保父类下所有类都有父类持有的全部方法

也就是说， 可以通过继承来定义相关类之间的共同协议。

当创建一个`Animal`类， 拟出了所有动物子类的共同协议， 他们可以执行 叫、吃饭、睡觉和走路等行为。 这又涉及到了面对对象最精彩的——**多态**

## 7. 认识多态

我们之前创建对象是这样的：

```java
Dog dog = new Dog();
```

引用类型必须与对象的类型是一致的， 两者都必须是Dog

**那么多态下，这种规则就不成立了， 我们可以这样：**

```java
Animal myDog = new Dog();
```

引用类型与对象类型不一致了！ 我们可以用父类的引用来指向子类的对象。 这就是**多态**。

:::tip

运用多态时， 引用类型可以是实际对象的父类。

只要通过**IS-A**关系来验证， 那么就可以使用父类的引用来指向子类的对象。

:::

## 8. 多态的例子

我们举些例子， 从**对象的创建**、**方法的参数**、**方法的返回类型**来说明多态的应用。

```java
// 1. 对象的创建
public class polymorphismExam {
    public static void main(String[] args) {
        Animal[] animals = new Animal[5];

        animals[0] = new Dog();
        animals[1] = new Cat();
        animals[2] = new Lion();

        for (int i = 0; i < animals.length; i++) {
            animals[i].eat();
            animals[i].roam();
        }
    }
}

// 2. 方法的参数
public class Vet {
    public void giveShot(Animal a) {
        a.sound();
    }
}

class PetOwner {
    public void start(){
        Vet v = new Vet();
        Dog d = new Dog();
        Cat c = new Cat();

        v.giveShot(d);
        v.giveShot(c);
    }
}
```

## 9. 有奖问答

1. **设计子类有层次上的限制吗? 最多几层?** 
    - 实际上是没有严格层次的限制
    - 但是观察Java API可以发现，不会很深，通常不会超过两层 

1. **如果没有办法看到类源代码，有想要改变类方法，是不是可以用子类来覆盖?**
    - 是的，这是面向对象很了不起的特征

1. **能够继承任何一个类吗? 类是私有的能不继承吗?**
    - 内部类还没介绍到，但是并没有私有类这一说
    - 存取控制可以使类不继承，虽然类不能标记私有，但是可以标记不共有，只能被同一个包下的继承子类
    - 使用final修饰符， 表示类为继承的末端
    - 类只有private的构造程序(constructor)

1. **`final`这个类有什么好处? 有什么意义?**
    - 一般是不会使用这个标记，除非你要确保都是你写的版本，控制死

1. **是不是`final`可以用在方法上，继承了不能覆盖**
    - 可以的

## 10. 遵守覆盖的规则

子类可以覆盖父类的方法， 但是有一些规则需要遵守：

1. 覆盖的方法必须与父类的方法具有相同的名称、返回类型和参数列表

1. 不能降低方法的存取权限

## 11. 方法重载

方法的重载是**两个方法的名称相同，但是参数不同**， 所以： 重载与多态是毫无关系的。

:::tip

重载版的方法只是刚好有相同名字的不同方法。 

与多态和继承是无关，重载的方法与覆盖方法不一样。

:::

1. **返回类型可以不同**
    - 可以任意改变重载方法的返回类型
    - 参数不同即可

1. **不能只改变返回类型**
    - 重载的条件是使用不同的参数！此时返回的类型才可以自定义

1. **可以更改存取权限**
    - 可以任意更改存取权限

```java [overload.java]
public class Overloads {
    String uniqueId;

    public int addNums(int a, int b) {
        return a + b;
    }

    public double addNums(double a, double b) {
        return a + b;
    }

    public void SetUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public void setUniqueId(int ssNumber) {
        String numberString = " " + ssNumber;
        this.uniqueId = numberString;
    }
}
```

# 二、深入多态


**继承只是开始**， 要使用多态，我们还需要**接口**。

## 1. 接口定义

接口是**100%纯抽象的**类， 无法初始化。

:::tip

接口是多态和Java的核心， 也是Java的灵魂。

:::

之前我们用过`Animal`类，然后通过继承扩展出了`Dog`、`Cat`、`Lion`等类。 那么有个问题： 

`Animal myAnimal = new Animal();` 这个是可以的嘛? 世界上存在一个叫做`Animal`的动物吗?

当然不可能， 所以说`Animal`是一个接口。 这就是接口的意义， 他是不可以初始化的纯抽象类。

抽象类很简单，直接加上关键词`abstract`即可。

```java
abstract class Animal {
    
}
```

:::tip

抽象类除了被继承之外， 是没有用途、价值、目的的。

:::

## 2. 抽象与具体

不是抽象类的类就是具体类。 在Java API中， 会有很多的抽象类。

## 3. 抽象方法

除了类，我们还可以抽象方法。 抽象的类代表此类必须要`extends`过， 抽象方法则是表示方法必须被**覆盖**。

:::tip

抽象的方法是没有实体的！ 

如果声明出抽象的方法，必须将类标记为抽象!, 不能在非抽象类中拥有抽象方法。

:::

```java
public abstract void eat();
```

## 4. 必须实现所有抽象的方法

**实现抽象的方法就如同覆盖过方法一样。 但是具体类必须！实现抽象方法**

抽象机制允许将负担转移为下层， 如`Animal`和`Canine`类都标记为了`abstract`， 那么就`Canine`类就可以不实现`Animal`的抽象方法，但是下层就必须要实现了。

## 5. 万用类、终极类

在Java中所有的类都是从`Object`类继承出来的， 它是所有类的源头。

**没有直接继承过其他类的类都是隐式的继承了对象**

`public class Animal extends Object` 这个是隐式的， 你看不到的。

那么`Object`里有哪些自带的行为?

1. `equals()`
    - 比较两个对象是否相同
2. `toString()`
    - 返回对象的字符串表示
3. `hashCode()`
    - 返回对象的哈希值
4. `getClass()`
    - 返回对象的类

## 6. 重点问答

1. **Object这个类是抽象类嘛?**
    - 不是，至少不是完全的抽象类
    - 所有继承下来的方法都是具体的，没有必须要覆盖的方法
1. **可以覆盖Object的方法?**
    - 部分是可以的， 部分被设置`final`修饰符
1. **Object是具体的? 但是为什么会允许有人创建呢? 这不是类似于创建了`Animal`类嘛?**
    - 好问题! 这种情况是为了创建一个通用的对象，轻量化的
    - 最常用的用途是用在线程的同步化
1. **既然多态这么牛，那所有参数、变量、返回类型我都用Object可以不?**
    - Java程序的类型安全检查时一项重要机制，防止调用一些不安全的类型越界
    - 如果使用Object类型来设置引用类型，那就**代表！这个实例仅仅是Object的实例**

## 7.使用Object类型引用会付出代价！

查看以下代码， 了解Object转换的问题。

```java
public class MyAnimals {

    public static void main(String[] args) {
        ArrayList<Dog> dogs = new ArrayList<Dog>();
        dogs.add(new Dog());
        Dog a = dogs.get(0);

        ArrayList<Animal> animals = new ArrayList<Animal>();
        animals.add(new Dog());
        // java: 不兼容的类型: polymorphismExam.Animal无法转换为polymorphismExam.Dog
        Dog b = animals.get(0);
    }

    public void go(){
        Dog aDog = new Dog();
        // Object不可以再转换为Dog类型, 传入的Dog已经被转为了Object
        Dog sameDog = getReturn(aDog);
    }

    public Object getReturn(Object o){
        return o;
    }
}
```

## 8. 探索内部Object

当你执行`Snowboard snowboard = new Snowboard();`时, 会在堆上发生什么事情呢? 创建怎么样的对象?

![堆上的对象](/assets/headFirstJava/Object1.png)

所以如果你用了`Object`类型引用来设置`snowboard`，那么一定是不能调用`turn`方法

如果想要转换回去，可以使用`Dog d = (Dog) o`


## 9. 深入多态! 修改合约

如果说我是一个`Dog`， 那么`Object`、`Animal`、`Canine`都是合约的一部分。 根据 IS-A 测试，我就会是`Canine`、`Animal`、`Object`。

如果有人想用，大可以将定义好的class交给他人使用。

但是如果我们想要加上一个亲热、耍宝的 宠物特性进入的功能怎么办呢?

我们大可以将`beFirendly()`和`play`方法直接加入到`Dog`类中， 但是有没有缺陷呢?

**如果。。。如果Cat也想要这个功能呢? 怎么样才能让`Animal`选择性的带有`Pet`行为但是又不会让老虎、狮子也变为了宠物?

### 方法一、直接加入到Animal

是的可以解决，但是河马？狼？也是宠物了？？

### 方法二、 将宠物方法设为抽象！每个动物必须覆盖

是的，可以让每个动物都必须声明： 我是宠物或者我不是宠物，别让我做一些蠢事

但是老虎、狮子凭什么需要定义这种声明，没有意义！

### 方法三、 需要的动物手动去添加方法

我们可以手动给dog、cat都加入这些方法，但是这样和java的多态有什么关系呢？ 我根本不知道到底哪个动物被你定义为了家宠

### 方法四、 多重继承？

创建一个另类的`Pet`类， 让需要的动物去多重继承这类，这样可以变相的实现多态，且不会影响其他动物

其实java并不支持这种方法，因为多重继承有被成为**致命方块**的问题。(由于形状像扑克牌的方块)

![致命方块](/assets/headFirstJava/Object2.png)

好吧！问题还是没有解决

### 方法五、 接口救星来了

`interface`关键字的接口。

:::code-group

```java [Pet.java]
public interface Pet {
    public abstract void beFirendly();
    public abstract void play();
}

```

```java [Dog.java]
public class Dog extends Animal implements Pet {
    // 必须实现这两种方法
    public void beFirendly() {

    }
    public void play() {

    }
}
```

:::

**类是可以实现多个接口，实现更加灵活的继承关系**

## 10. 调用父类的方法

使用`super`关键字： `super.play()`

# 三、对象的前世今生

对象有生有死， 你必须了解对象的生命循环周期。

你决定着对象的创建、也决定着对象的死亡。 你其实并不需要手动杀死他， 只是声明要放弃后，冷血无情的垃圾收集器(GC)就会将他抹除掉。 

这里我们会介绍对象如何创建、在何处、如何保存和抛弃， 涉及到堆、栈、范围、构造器、超级构造器、空引用等。 

:::danger
注意，这里涉及到死亡！12岁以下儿童需与家长陪同观看了。
:::

## 1. 栈(stack)与堆(heap)： 生存空间

当java虚拟机启动， 会从计算机底层操作系统取得一块内存， 以此区域来执行java程序。

至于多少内存及是否需要调整则与java虚拟机版本和平台版本而定了。

![栈堆](/assets/headFirstJava/Object3.png)

栈是一个后进先出(LIFO)的结构， 也就是最后放进去的东西最先被取出来。

查看下面的例子： 

![栈堆](/assets/headFirstJava/stack1.png)

:::info

要记得，非primitive类型的变量都是引用类型， 也就是指向对象的内存地址。

在栈中，存放的都是对于对象的引用而已，对象本身永远都是存在堆中

:::

## 2. 局部变量活在栈里，那么实例变量呢?

对于primitive类型， 对象的实例变量是存放在对象上的， java会根据主数据类型的大小，int 32位， long是64位，为变量留下空间

但是如果是对象的实例变量，java会为变量留下**引用值**的空间， 而不是对象本身的值。

当实例变量没有给他赋值， 那么只会留下变量值的空间。 直到引用变量被赋值，那么堆上会产生一个空间

## 3. 创建对象的奇迹-构造函数

声明一个对象

`Duck myDuck = new Duck()`

这里的`new duck()`, 看起来像是在调方法，没错， 只不过我们在调用它的**构造函数**

在类的内部，编译器会写入以下的方法：

```java
public class Duck {
    public Duck() { // [code ++]
        // 构造函数 // [code ++]
    } // [code ++]
}
```

构造函数的意义是在对象被赋值给引用前就被执行。

---

构造问答：

1. **既然编译器都有构造函数了，还自己写干嘛?**
    - 创建程序需要帮忙初始化，那么就需要自己写
2. **如果分辨构造函数**
    - java可以允许与类同名方法，区别是：
    - **是否有返回值**
3. **构造函数会被继承嘛?**
    - 不会的

## 4. 构造函数使用

当你使用构造函数进行初始化变量， 但是你传入了一个参数，**那么你必须手写一个没有参数的构造函数**

```java
public class Duck {
    int size;
    public Duck(int duckSize) {
        size = duckSize;
    }
    public Duck(){
        System.out.println("Duck constructor with no args");
    }
}
```

## 5. 父类、继承与构造函数的关系

调用`new`会触发一系列的构造反应，首先会调用父类的构造函数，然后再调用子类的构造函数。 这种过程称之为**构造函数链**

调用父类的构造函数并且传参是需要在**构造函数的第一行**调用`super(args)`

调用同类的另一个构造函数使用`this()`

:::danger

必须都是在构造函数的第一行！ 且两者不可兼得。

:::

## 6. 对象存活周期

对象的生命周期完全是看**引用**， 如果引用还活着，那么对象就会活着。

**那么引用变量到底可以活多久呢?**

### life和scope

life： 

只要变量的堆栈还存在于堆栈，局部变量就算是活着，也就是活到方法执行完毕为止。

scope：

局部变量的作用范围只限于声明他的方法中， 如果说方法调用了别的方法，那么变量还活着，只不过不在目前的范围，执行其他方法完毕后，范围也会回来。


### primitive类型

局部变量的生命周期是局部的， 也就是在方法中声明的变量， 当方法结束后，变量就会被销毁。

实例变量则是与对象共存亡。


### 对象类型


