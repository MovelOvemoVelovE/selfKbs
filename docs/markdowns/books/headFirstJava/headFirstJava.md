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

:::

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

    void playIt() {
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
3. java程序怎么称得上的是面向对象
    - java所有事物都必须在**类中**
4. 若有多个类，怎么包装成单一应用程序格式
    - 将所有类放在一个文件夹中，打包成一个jar文件
    - 通过`manifest`文件来指定主类的`main()`方法

# 三、变量

:::info

变量有两种： primitive主数据类型(基础数据类型) 和 引用

:::

## 1. 声明变量

**Java注重类型。** 不允许将长颈鹿类型放在兔子类型变量中， 浮点数也不会让放在整数类型中。

编译器会指出大部分的问题。

```java
Rabbit hopper = new Giraffe(); // 错误
``` 

java中的`primitive`数据类型:

| 分类       | 类型            | 位数    | 值域                     |
|----------|---------------|-------|------------------------|
| 布尔值      | boolean       | 虚拟机决定 | true/false             |
| 字符       | char          | 16    | 0-65535                |
| 数值(带正负号) | byte          | 8     | -128-127               |
| 数值(带正负号) | short         | 16    | -32768-32767           |
| 数值(带正负号) | int           | 32    | -2147483648-2147483647 |
| 数值(带正负号) | long          | 64    | 很大                     |
| 浮点数      | float(结尾必须加f) | 32    | 可变                     |
| 浮点数      | double        | 64    | 可变                     |

```java
// 声明变量
int x = 123;
```

## 2. 小心溢出

无法将大数值复制给小容器的变量。 Java编译器会试着防止这种情况。

## 3. 避开关键字

变量命名有规则： **只能**以字母、下划线、`$`开头满足后再**避开关键字**就可以了。

关键字不需要背，一些标明Java功能的如`long`数据类型、`public`的修饰符、 `class`类定义、`while`循环定义外就可以。

## 4. 对象

primitive数据类型的定义会声明，那么对象呢?

:::tip

- 实际上没有对象变量这种东西
- 只有引用`reference`到对象的变量
- 对象引用变量保存的**获取对象的方法**
- 也不是容器，而是指针，指向对象的地址。

:::

### 对象问答

1. **引用变量有多大?**
    - 不知道，除非你去问虚拟机开发团队
2. **所有对象引用都有相同大小， 不管它引用的对象大小?**
    - 是的，但是只是针对同一虚拟机
    - 不同虚拟机之间是可能不同的
3. 声明新的变量，但是不使用新的`new`对象，而是使用现有的对象变量，是什么本质?
    - 与现有对象变量一致，都是引用到同一个对象
    - 相同值的两份拷贝
4. 对象活在哪里?
    - 堆上

## 5. 数组

数组`int[]`是引用变量， 无论承载的是`primitive`还是引用变量。

数组一定确定数据类型，那么就不可以改变。

# 四、对象行为

状态影响行为，行为影响状态。

对象有状态和行为两种属性，分别由实例变量和方法来定义。

## 1. 方法的参数

实参与局部变量一致，有着类型和名称，可以在方法内使用。

```java
// 形参 numOfBarks也有类型 int
void bark(int numOfBarks) {
    // int numOfBarks = 5; // 报错，因为numOfBarks作为参数已经声明过了
    while (numOfBarks > 0) {
        System.out.println("ruff");
        // 使用形参
        numOfBarks--;
    }
}
```

## 2. 返回值

方法需要有返回值，且类型一致。

```java
// 返回值类型是int
int getBarkCount() {
    return 5;
}
```

## 3. 拷贝传递

java是通过**值传递的**，也就是通过**拷贝**传递。

如果传入参数直接修改，原变量并不会修改。

```java
public static void main(String[] args) {
    int numOfBarks = 5;
    bark(numOfBarks);
    System.out.println(numOfBarks);
}
```

## 4. 问答要点

1. **传入非primitive数据类型会怎么样?**
    - java中传递的所有东西都是值，**变量**的值，那么引用对象的变量拷贝的是引用地址
2. **可以声明多个返回值吗?**
    - 只能声明单一值，如果想要返回3个`int`，那就装入数组中返回
3. **一定要返回所声明的类型吗?**
    - 可以返回被 隐式转换的其他值，如`byte`作为`int`
    - 可以返回小容量的类型，大的则必须明确转换
4. **可以忽略返回值吗?**
    - 可以，有返回值但是不用当然可以。

## 5. `getter`与`setter`

getter的目的只有一个，返回实例变量。

而对应的setter的目的就是使用一个参数来设定变量的值

```java
public class Test {
    String brand = "Toyota";
    int numOfPickups = 5;
    boolean rockStarUsersIt = false;

    String getBrand() {
        return brand;
    }

    void setBrand(String brand) {
        brand = brand;
    }
}
```

## 6. 封装

我们一直都在犯一个面向对象界的最严重错误， 不是被妹子发现自己袜子破了，而是**泄露资料**。

暴露的意思是`tehCar.height = 28;`这样。 这件事情是直接通过远程控制修改了`Cat`实例的值， 如果落入不当之人之手，会有风险。

:::warning

强迫所有人都必须调用`setter`和`getter`来访问和修改。

:::

## 7. 数据隐藏

数据隐藏是指将实例变量设为`private`， 将`getter`和`setter`设为`public`。 

这样就只能通过`getter`和`setter`来访问和修改。

**封装还有好处是**：

- 大部分的实例变量都有一个适当的范围，那么通过`setter`检查参数并判断， 或许可以退回或抛出 `Exception`
- 如果类暴露了共有变量，但是公有变量突然需要检查，那么所有人都需要跟着修改自己手写的`setter`程序

## 8.声明与初始化

声明变量但是没有初始化赋值变量，那么调用getter会有自己对应设置的 默认值。

:::tip

实例变量永远都会有默认值，没有明确赋值或setter，都会有对应默认值:

- `int`：0
- `boolean`：false
- `float`：0.0
- `reference`：null

:::

## 9. 局部变量与实例变量区别

1. 实例变量声明在类中而不是方法
2. 局部变量是声明在方法中
3. 局部变量必须初始化后再使用
   - `int x;  int z = x + 3`会报错
4. **局部变量没有默认值!**
5. **形参基本就是局部变量! 只是自动声明了变量**

## 10. 变量的比较

使用 `==`比较primitive数据和对应的引用指针。

使用`equals()`比较引用变量的值, 例如2个 `String` 比较是否有相同的字节组合。


# 五、编写程序

让方法产生更大的作用。 编写和测试一个程序，可以更好的学习到之前的内容。

## 创建一个类似战舰游戏，攻击网站

### 1. 游戏前提

**初始设置：** 程序启动后， 计算机会在虚拟的 7 * 7方格上，安排3个占用3个格子的战舰，安排完成后， 游戏会要求你猜坐标。

**游戏目标：** 以最少的猜测次数打掉目标战舰，计算机会根据你的表现评分

**进行游戏:** 由于现在很菜，不会GUI的程序涉及，所有在命令行来玩。

![战舰游戏](/assets/headFirstJava/game1.png)

### 2. 开发类

首先是整理思路，从高层设计程序，然后逐步填充功能代码。

编写玩游戏(简单版本)的主类:

:::code-group

```java [SimpleDotComGame.java]
// 1. 创建一个游戏
public class SimpleDotComGame {
    // 2. 程序入口main方法
    public static void main(String[] args) {
        // 3. 记录用户猜测的几次
        int numOfGuesses = 0;
        // 4. 创建一个游戏助手，获得用户输入的猜测位置
        GameHelper helper = new GameHelper();

        // 5. 随机生成3个格子 表明战舰的位置
        int random = (int) (Math.random() * 5);
        int[] locations = {random, random + 1, random + 2};

        // 6. 创建一个战舰对象、是否被击中
        SimpleDotCom theDotGame = new SimpleDotCom();
        theDotGame.setLocationCells(locations);

        // 7. 创建一个变量，判断战舰有没有被击沉， 如果一直为true， 那么就一直进行游戏
        boolean isAlive = true;
        // 8. 一直进行游戏直到战舰被击沉
        while (isAlive) {
            String guess = helper.getUserInput();
            String result = theDotGame.checkYourself(guess);
            numOfGuesses++;

            if (result.equals("kill")) {
                isAlive = false;
                System.out.println("You took " + numOfGuesses + " guesses.");
            }
        }
    }
}
```

```java [SimpleDotGameHelper.java]
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class GameHelper {
    String getUserInput() {
        String inputLine = null;
        System.out.print("Enter a number:  ");

        try {
            BufferedReader is = new BufferedReader(new InputStreamReader(System.in));
            inputLine = is.readLine();
            if (inputLine.isEmpty()) return null;

        } catch (IOException e) {
            System.out.println("IOException: " + e);
        }

        return inputLine;
    }
}
```

```java [SimpleDotCom.java]
public class SimpleDotCom {
    int numOfHits = 0;
    int[] locationCells;

    public String checkYourself(String stringGuess) {
        int guess = Integer.parseInt(stringGuess);
        String result = "miss";

        for (int cell : locationCells) {
            if (guess == cell) {
                result = "hit";
                numOfHits++;
                break;
            }
        }

        if (numOfHits == locationCells.length) {
            result = "kill";
        }

        System.out.println(result);
        return result;
    }

    public void setLocationCells(int[] los) {
        locationCells = los;
    }
}
```

:::

# 六、 使用java函数库

Java内置了数百个类。 熟练从统称为JAVA API的函数库中找到所需功能，那么就不必重复造轮子

:::info

上一章是有bug的，当你命中第一次后， 重复输入命中的数字，那么3次后也会判断击沉。

:::

![战舰游戏bug](/assets/headFirstJava/game1bug.png)

## `ArrayList`

问题是没有记录到已经命中的数字，怎么解决嘞：

1. 声明第二个数组，记录是否为true命中过，都为true则击沉
1. 修改原来的数组，命中了就改为 -1，表示命中过
1. 如果可以动态修改数组的长度，直接删除掉对应的元素就好了
    - 但是数组是无法修改长度的

有一种集合是可以动态修改长度的！ 那就是`ArrayList`

---

`ArrayList`是一个可以动态修改长度的数组， 有着以下的api特性:

```java
public class ArrayListTest {
    public static void main(String[] args) {
        // 创建一个ArrayList对象
        ArrayList<Egg> myList = new ArrayList<Egg>();
        Egg s = new Egg();
        s.setName("Egg");
        Egg b = new Egg();
        b.setName("Bacon");
        // 添加元素
        myList.add(s);
        myList.add(b);
        // 集合的大小
        int mySize = myList.size();
        // 是否包含某个元素
        boolean isIncludes = myList.contains(s);
        // 查询元素的索引
        int idx = myList.indexOf(s);
        // 是否为空对象
        boolean empty = myList.isEmpty();
    }
}
```

:::tip

**`ArrayList`无法保存`primitive`数据类型， 只能保存引用变量。**

我怎么知道有一个类型是`ArrayList`，而且还知道他能解决神马问题?

答案在后几章，期待。

:::

## 2. 比较`ArrayList`与一般数组

- 创建时必须确定大小 ———— 一般数组
- 存放对象必须指定位置 ———— 一般数组
    - `ArrayList`直接`add()`
- 可以通过下标索引获取: —————— `myList[1]`
- 需要传入参数化泛型 —————— `ArrayList<String>`

## 3. 修改代码解决简单版bug

:::code-group

```java [SimpleDotComGame.java]
// 1. 创建一个游戏
public class SimpleDotComGame {
    // 2. 程序入口main方法
    public static void main(String[] args) {
        // 3. 记录用户猜测的几次
        int numOfGuesses = 0;
        // 4. 创建一个游戏助手，获得用户输入的猜测位置
        GameHelper helper = new GameHelper();

        // 5. 随机生成3个格子 表明战舰的位置
        int random = (int) (Math.random() * 5); // [!code --]
        int[] locations = {random, random + 1, random + 2}; // [!code --]
        ArrayList<String> locations = new ArrayList<>(); // [!code ++]
        locations.add(Integer.toString(random)); // [!code ++]
        locations.add(Integer.toString(random + 1)); // [!code ++]
        locations.add(Integer.toString(random + 2)); // [!code ++]
        theDotGame.setLocationCells(locations); // [!code ++]

        // 6. 创建一个战舰对象、是否被击中
        SimpleDotCom theDotGame = new SimpleDotCom();
        theDotGame.setLocationCells(locations);

        // 7. 创建一个变量，判断战舰有没有被击沉， 如果一直为true， 那么就一直进行游戏
        boolean isAlive = true;
        // 8. 一直进行游戏直到战舰被击沉
        while (isAlive) {
            String guess = helper.getUserInput();
            String result = theDotGame.checkYourself(guess);
            numOfGuesses++;

            if (result.equals("kill")) {
                isAlive = false;
                System.out.println("You took " + numOfGuesses + " guesses.");
            }
        }
    }
}
```

```java [SimpleDotCom.java]
import java.util.ArrayList; // [!code ++]

public class SimpleDotCom {
    int numOfHits = 0; // [!code --]
    int[] locationCells; // [!code --]
    ArrayList<String> locationCells; // [!code ++]

    public String checkYourself(String stringGuess) {
        int guess = Integer.parseInt(stringGuess); // [!code --]
        String result = "miss";

        for (int cell : locationCells) { // [!code --]
            if (guess == cell) { // [!code --]
                result = "hit"; // [!code --]
                numOfHits++; // [!code --]
                break; // [!code --]
            } // [!code --]
        } // [!code --]

        int index = locationCells.indexOf(stringGuess); // [!code ++]
        if (index >= 0) { // [!code ++]
            locationCells.remove(index); // [!code ++]
            if (locationCells.isEmpty()) { // [!code ++]
                result = "kill"; // [!code ++]
            } else { // [!code ++]
                result = "hit"; // [!code ++]
            } // [!code ++]
        } // [!code ++]

        if (numOfHits == locationCells.length) {  // [!code --]
            result = "kill";  // [!code --]
        }  // [!code --]

        System.out.println(result);
        return result;
    }

    public void setLocationCells(int[] los) {
        locationCells = los;
    }
}

```

:::

## 4. 制作豪华版的战舰游戏

:::code-group

```java [DotComGame.java]
import java.util.ArrayList;

public class DotComGame {
    private GameHelper helper = new GameHelper();
    private ArrayList<DotCom> dotComsList = new ArrayList<DotCom>();
    private int numOfGuesses = 0;

    private void setupGame(){
        DotCom dotcomOne = new DotCom();
        dotcomOne.setName("Pets.com");
        DotCom dotcomTwo = new DotCom();
        dotcomTwo.setName("eToys.com");
        DotCom dotcomThree = new DotCom();
        dotcomThree.setName("Go2.com");
        dotComsList.add(dotcomOne);
        dotComsList.add(dotcomTwo);
        dotComsList.add(dotcomThree);

        System.out.println("Your goal is to sink three dot coms.");
        System.out.println("Pets.com, eToys.com, Go2.com");
        System.out.println("Try to sink them all in the fewest number of guesses.");

        for(DotCom dotCom : dotComsList){
            ArrayList<String> newLocation = helper.placeDotCom(3);
            dotCom.setLocationCells(newLocation);
        }
    }

    private void startPlaying(){
        while(!dotComsList.isEmpty()){
            String userGuess = helper.getUserInput();
            checkUserGuess(userGuess);
        }
        finishGame();
    }

    public void checkUserGuess(String userGuess){
        numOfGuesses++;
        String result = "miss";
        for( DotCom dotCom : dotComsList){
            result = dotCom.checkYourself(userGuess);
            if(result.equals("hit")){
                System.out.println("Hit!");
                break;
            }
            if(result.equals("kill")){
                System.out.println("You sunk " + dotCom.getName() + "!");
                dotComsList.remove(dotCom);
                break;
            }
        }
        if(result.equals("miss")){
            System.out.println("You are Miss.");
        }
    }

    public void finishGame(){
        System.out.println("All dot coms are dead! Your stock is now worthless.");
        if(numOfGuesses <= 18){
            System.out.println("It only took you " + numOfGuesses + " guesses.");
        } else {
            System.out.println("Took you long enough. " + numOfGuesses + " guesses.");
        }
    }

    public static void main(String[] args) {
        DotComGame game = new DotComGame();
        game.setupGame();
        game.startPlaying();
    }
}
```

```java [DotCom.java]
package dotCom;

import java.util.ArrayList;

public class DotCom {
    private String name;
    private ArrayList<String> locationCells;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setLocationCells(ArrayList<String> los) {
        locationCells = los;
    }

    public ArrayList<String> getLocationCells() {
        return locationCells;
    }

    public String checkYourself(String userInput) {
        String result = "miss";
        int index = locationCells.indexOf(userInput);
        if (index >= 0) {
            locationCells.remove(index);
            if (locationCells.isEmpty()) {
                result = "kill";
            } else {
                result = "hit";
            }
        }
        return result;
    }
}
```

```java [GameHelper.java]
package dotCom;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class GameHelper {
    private static final String alphabet = "abcdefg";
    private int gridLength = 7;
    private int gridSize = 49;
    private int[] grid = new int[gridSize];
    private int comCount = 0;

    public String getUserInput() {
        String inputLine = null;
        System.out.println("Enter a letter and a number (e.g., a0, b3):   ");
        try {
            BufferedReader is = new BufferedReader(new InputStreamReader(System.in));
            inputLine = is.readLine();
            if (inputLine.length() == 0) return null;
        } catch (IOException e) {
            System.out.println("IOException:  " + e);
        }
        return inputLine;
    }

    public ArrayList<String> placeDotCom(int comSize) {
        ArrayList<String> alphaList = new ArrayList<String>();
        String[] alphaCords = new String[comSize];
        String temp = null;
        int[] coords = new int[comSize];
        int attempts = 0;
        boolean success = false;
        int location = 0;

        comCount++;
        int incr = 1;
        if ((comCount % 2) == 1) {
            incr = gridLength;
        }

        while (!success & attempts++ < 200) {
            location = (int) (Math.random() * gridSize);
            int x = 0;
            success = true;
            while (success && x < comSize) {
                if (grid[location] == 0) {
                    coords[x++] = location;
                    location += incr;
                    if (location >= gridSize) {
                        success = false;
                    }
                    if (x > 0 && (location % gridLength == 0)) {
                        success = false;
                    }
                } else {
                    success = false;
                }
            }
        }

        int x = 0;
        int row = 0;
        int column = 0;
        while (x < comSize) {
            grid[coords[x]] = 1;
            row = (int) (coords[x] / gridLength);
            column = coords[x] % gridLength;
            temp = String.valueOf(alphabet.charAt(column));
            alphaList.add(temp.concat(Integer.toString(row)));
            x++;
        }

        return alphaList;
    }
}
```

:::

## 5. 使用函数库(Java API)

在Java API中，类是被包装在包中， 要使用API的类，必须知道在哪个包中。

如我们使用的`ArrayList`，他在`java.util`包中。 `System`和`Math`类在`java.lang`包中。

`java.lang`包是自动导入的， 其他的包需要手动导入。

```java
// 第一种使用
import java.util.ArrayList; // 导入ArrayList类
import java.util.*  // 导入所有类

// 第二种使用
java.util.ArrayList<String> myList = new java.util.ArrayList<String>();
```

## 6. 函数问答

1. **使用import会把程序变大吗? 编译过程会把包或者类包进入嘛?**
    - `import`与C的`include`并不相同，`import`引入也只是省下前面的包名称而已
    - 并不会因此而变大变慢
2. **为何不需引入`String`和`System`类**
    - 是提前引入的包， 很基础的包，java本身知道去哪里找
3. **自己写入的包需要包在包中嘛?**
    - 是的，后续章节会介绍这个。

