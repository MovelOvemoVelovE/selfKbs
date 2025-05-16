学习中夹杂着一些小细节的东西。 像极了我们读书时，用小蓝🖊或者小红🖊在笔记旁边标注的小型重要知识点。

这些知识点或许不会影响大局的学习，但是同样尤为重要，且在后续章节可能会忽略掉这些已经标注好的小型知识点。

# 一、语法

## System.out.println与System.out.print

同样都是输出，只不过`println`会在输出后换行，`print`不会换行。

## 加强for循环

使用循环数组的循环，列出每项

```java
for (int cell : locationCells) {
  System.out.println(cell);
}
```

# 二、对象

## 子类继承

子类extends父类，除了可以覆盖父类的组件实例及方法，也可以延申扩充父类的方法

```java
public class Child extends Parent {
  public void getMoney() {
      super.getMoney(); // 调用父类方法
      // 子类扩展的方法
  }
}
```

## 垃圾回收

创建对象存放在**堆**的内存区域， java根据对象大小来分配内存空间。

当某个对象被java虚拟机觉察到不会再使用，那么对象被**标记**，内存不足则会被垃圾回收

# 三、数据类型

## String => int

```java
Integer.parseInt("123");
```

## 强制编译器转换(double => int)

```java
int i = (int) (Math.random() * 100);
```

# 四、进阶

## headFirst设计模式

在学习完`headFirstJava`后，接下来可以学习`headFirst设计模式`， 该书籍是对设计模式的深入讲解。

# 五、编译器

## 万能对象

编译器是根据**引用类型**来判断哪些`methods`可以调用，而不是根据`Object`确实本身的类型。