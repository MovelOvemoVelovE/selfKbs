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

## 接口

接口是**100%纯抽象的**类， 无法初始化。

:::tip

接口是多态和Java的核心， 也是Java的灵魂。

:::

之前我们用过`Animal`类，然后通过继承扩展出了`Dog`、`Cat`、`Lion`等类。 那么有个问题： 

`Animal myAnimal = new Animal();` 这个是可以的嘛? 世界上存在一个叫做`Animal`的动物吗?

当然不可能， 所以说`Animal`是一个接口。 这就是接口的意义， 他是不可以初始化的纯抽象类。


