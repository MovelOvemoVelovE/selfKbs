来自《你不知道的 JS》书籍的知识点总结。总有一些不知道或者理解错误的地方需要学习，这本书是前端 js 开发者必读的一本书。

::: tip

上卷主要是**作用域**、**this 指向**及**对象原型**知识点。

:::

# 1、作用域

每个语言都有存储在变量的值，那么变量存储在哪里? 程序又是如何找到他们?

设计一套良好的规则来存储变量，方便以后找到、操作变量，这套规则就称之为**作用域。**

## 编译原理

了解作用域，需要先了解下编译原理。

尽管通常称 js 为一门**动态**或**解释执行语言**，但事实上是一门**编译语言**。

js 引擎进行编译的步骤和传统编译语言相似，某些程度上甚至更加复杂。

**传统编译语言**源代码执行会经历三个步骤，称之为**编译**：

- 分词/词法分析
  - 将字符组成的代码字符串，转换为有意义的词法单元。
- 解析/语法分析
  - 将词法单元流(数组)转换为元素逐级嵌套的代表了程序语法结构的树，这个树称之为：AST(抽象语法树 Abstract Syntax Tree)
- 代码生成
  - AST 转换为可执行代码过程称之为代码生成

:::warning

javascript**任何代码片段在执行前都要进行编译**

:::

## 理解作用域

要理解作用域，首先需要理解 3 个角色：

- 引擎
  - 负责 js 的编译和执行
- 编译器
  - 引擎好朋友，负责语法分析和代码生成
- 作用域
  - 引擎另一个朋友，负责收集、维护所有声明标识符(变量)的一系列查询，且有一套严格的规则。

### 对话

以`var a = 2`为例子。 我们看到的是一个声明语句，而对于引擎来说并非如此。

引擎认为这里有两个完全不同声明， 一个是编译器编译时，另一个是引擎运行时。

第一步： 遇到了`var a`， 编译器询问作用域是否已经有一个同名变量存在于作用域中， 如果是则忽略继续编译；否则会声明一个新变量在作用域中，并命名为 a

第二步：`a = 2`引擎运行时询问作用域，是否存在 a 变量，存在则使用变量，不存在则继续查询变量(上级作用域)， 找到并赋值。

### 编译器术语

引擎运行时，会查找变量。**查询类型**有两种： LHS 和 RHS。

简单的理解可以是： LHS(找到变量的源头，本身)和 RHS(获取变量的值)

看下面的几个简单例子：

```js
var a = 2;

// RHS引用， 只为得到a的值并传递给console
console.log(a);

// LHS引用，找到a变量本身，给它赋值为2
a = 2;
//-----
function foo(a) {
  console.log(a);
}
/**
 * 首先是一个RHS引用，找到foo函数的值然后给它传参2
 * 然后是 a = 2隐式操作, LHS引用，找到a变量本身，给它赋值为2
 * 最后是 console.log(a), RHS引用，找到a的值给console
 */
foo(2);
```

更进一步的理解程度例子：

```js
function foo(a) {
  var b = a;
  return a + b;
}
var c = foo(2);
/**
 * LHS引用(3处)
 * var c =
 * var b =
 * a = 2 隐式操作，参数赋值
 */

/**
 * RHS引用(4处)
 * foo()
 * = a
 * a + b(2次)
 */
```

### 作用域嵌套

当一个块或函数嵌套在另一个块和函数内，就发生了作用域嵌套。

当前作用域无法找到变量，引擎会在外层作用域继续查找，直到最外层作用域(全局作用域)为止。

### 异常

为什么要区分 LHS 和 RHS 呢?

因为在变量还没有声明的情况下，这两种查询引用行为是不一样的。

考虑以下代码.

```js
function foo(a) {
  // ReferenceError
  console.log(a + b);
  b = a;
}
foo(2);
```

第一次对 b 进行 RHS 引用时，未找到变量， 引擎抛出**ReferenceError**异常。

而当 LHS 查询时，会创建一个具有该名称的变量，并返回(非严格模式)。

如果 RHS 引用查询时，对非函数值进行调用，或者对 null、undefined 进行属性操作，则会抛出另一个**TypeError**异常。

# 2.词法作用域

前面提到过，大部分语言编译器第一阶段叫做 词法化。 词法作用域就是定义在词法阶段的作用域。

换句话说： 词法作用域就是你写代码时将变量和作用域写在哪里决定的。

## 欺骗语法

如果说词法作用域完全由写代码时，函数所声明为止来定义，那么怎么才能在运行时修改?

有两种方法：

1. eval()
2. with

### eval()

```js
function foo(str, a) {
  eval(str);
  console.log(a, b);
}
var b = 2;
foo("var b = 3", 1); // 1, 3
```

### with

普通用法可以是:

```js
var obj = {
  a: 1,
  b: 2,
  c: 3,
};
obj.a = 4;
obj.b = 5;
obj.c = 6;

with (obj) {
  a = 7;
  b = 8;
  c = 9;
}
```

但是会有副作用

```js
function foo(obj) {
  with (obj) {
    a = 2;
  }
}
var obj = {};
foo(obj);
console.log(obj.a); // undefined
console.log(a); // 2
```

# 3.函数/块作用域

函数作用域的含义是指: 属于这个函数的全部变量可以在整个函数范围内使用及复用。

除了函数作用域，快作用域也是现在 js 常见的作用域单元。

常见的块级作用域有: 配合 let/const、try..catch 等

# 4.提升

在 javascript 中： 任何声明在某个作用域的变量，都将附属于这个作用域。

而变量声明出现的位置与作用域有特殊微妙的联系。

看以下代码：

```js
a = 2;
var a;
console.log(a); // 2
console.log(b); // undefined
var b = 2;
```

在编译器看来， `var a = 2`是理解为`var a`和`a=2`两个阶段， 而从最终结果来看：**变量和函数声明都从它们代码所在位置被移动到了最上面**，也叫做**变量提升。**

> 函数声明也可以被提升，函数表达式不会被提升(理解为是`undefined()`的报错)

**如下代码：**

```js
foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
  // xxx
};
```

在上面中，`foo`的函数表达式提升后为`undefined`，会报`TypeErroe`的错误。

虽然函数声明可以提升，但是作为了函数表达式的名称标识符则也无法在作用域提升。代码理解如下：

```js
var foo
foo()
bar()
foo = function (){
   var bar = ...self...
}
```

## 函数优先提升

函数和变量重复同名声明，那么函数声明优化提升(更上面)，然后是变量

```js
foo(); // 1

var foo;
function foo() {
  console.log(1);
}
foo = function () {
  console.log(2);
};
```

# 5.作用域闭包

闭包，一个在 js 语言中非常重要又难以掌握的、近乎神话的概念。

总觉得闭包是一个神秘的知识点，掌握后功力大涨。 但**其实闭包无处不在，需要做的是能够识别和拥抱它**

## 初识闭包

当函数可以**记住并访问**所在的词法作用域，就产生了闭包，**即使在其词法作用域外执行。**

来看下面这段代码:

```js
function foo() {
  var name = "kakarotto";
  function bar() {
    console.log(name);
  }
  return bar;
}

var _bar = foo();
_bar(); // 这就是闭包
```

以上`bar`函数词法作用域可以访问 foo 内部的作用域， 而后我们`return bar`

当调用`foo()`后，得到了`bar`函数，**它在自己定义的词法作用域外执行。** 也就是所谓的：**闭包可以使得函数继续访问定义时的词法作用域**

## 闭包随处可见

本质上说，**无论何时何地，访问自身词法作用域的函数被当做第一级的值类型到处传递，都是使用了闭包。 定时器、callback、eventListener、ajax 等异步回调的使用！本质上都是在使用闭包**

看以下代码:

```js
function asyncFn(user) {
  let age = 23;
  setTimeout(() => {
    console.log(user.name, age);
  }, 1000);
}

asyncFn({ name: "zhangsan" });
```

在定时器中，即使在 1000ms 后，依旧可以访问传递的参数及`asyncFn`作用域中的变量，这也在使用闭包。

## 经典循环和闭包

如果还是很混乱，那么来看经典的循环和闭包问题。

来看下面一段代码:

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}
```

我们的预期是依次输出 0~4，。**但事实是输出了 5 次 5。**

这是因为：延迟函数的回调会在循环结束后才执行，而此时执行时访问的并不是想象中**词法作用域的 i，**，因为它没有使用闭包。

---

那么我们使用 IIFE(立即执行函数)包含一下可以吗?

```js
for (var i = 0; i < 5; i++) {
  (function () {
    setTimeout(function () {
      console.log(i);
    }, 0);
  })();
}
```

**并不可以！这是因为上一节《闭包随处可见》中说到，必须访问他们的词法作用域才有效闭包!**

```js
for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 0);
  })(i);
}
```

**这样就可以实现功能，因为访问了自身的词法作用域，有了一些实质的内容**

# 6.动态作用域

javascript 的作用域是**词法作用域**， 那我们需要了解下**动态作用域(后面 this 指向的表亲)**

来看以下代码：

```js
function foo() {
  console.log(a); //  {1}行
}

function bar() {
  var a = 2;
  foo();
}

var a = 3;
bar(); // 输出3
```

由于 javascript 中是词法作用域， 在定义`foo`函数的代码中，`{1}行`没有找到`a`，那么就会找到全局作用域！

## 假设为动态作用域

动态作用域是不关心函数和作用域如何声明、何处声明的，而是基于调用栈！关心何处调用执行。

那么按照动态作用域，代码输出应该为`3`

**javascript 中并不具有动态作用域！只有词法作用域！this 的机制在某种程度上很像动态作用域**

# 7.this

先简单了解下 this(第二部分详细介绍)。

ES6 引入了箭头函数， 引入意义不只是去掉了`function`关键字，还有个最重要的原因，那就是**实现词法作用域**。

**来看以下代码问题！**

```js
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(function () {
        this.count++;
        console.log(this.count);
      }, 100);
    }
  },
};
var count = 999;

obj.cool(); // 1000
```

对象的方法操作对象遭到了**莫名(this 问题)** 的干扰！

## 解决问题

首先在 ES6 之前我们可以怎么解决呢? **词法作用域方案**， 使用一个`self`变量在词法分析阶段保留住 this 绑定问题。

```js
var obj = {
  count: 0,
  cool: function coolFn() {
    var self = this;
    if (self.count < 1) {
      setTimeout(function () {
        self.count++;
        console.log(self.count);
      }, 100);
    }
  },
};
```

---

ES6 的箭头函数也可以解决问题，因为它**使用词法作用域覆盖了 this 指向值**

---

# 第二部分 this

# 1. 消除 this 误解

this 对 js 开发者来说再熟悉不过(或许现在使用框架后淡化了)， 弄懂 this 之前需要消除一下关于 this 误解。

- 指向函数本身
- 指向函数作用域
  - **this 和词法作用域混合使用，一定要提醒自己，这是无法实现的！**

## this 定义

**this 的机制是怎么样的呢?**

this 是在运行时进行绑定的(**动态作用域表亲**)，而不是编写时的词法作用域绑定。它的**上下文取决于函数调用时**的各种条件，与声明位置、如何声明无关。

> 每当一个函数调用，会创建一个活动记录(执行上下文)， 这个记录会包含函数的调用栈、函数方法、传入参数等。 this 就是它的一个属性

# 2. this 全面解析

## 2.1 调用位置

理解 this 绑定过程之前，**首先要理解调用位置**。

调用位置就是函数在代码中被调用(**不是被声明**)的位置。只有仔细分析后，才能回答 this 到底引用的是什么?

在分析中，最重要的就是**分析调用栈(call stack-为了到达当前执行位置所调用的所有函数)。** 调用位置就在当前正在执行函数的**前一个调用中**

看以下代码:

```js
ccc();
function ccc() {
  // 当前调用栈为 ccc
  // 因此当前调用位置是全局作用域
  console.log("ccc");
  bbb(); // bbb的调用位置在这里
}
function bbb() {
  // 当前调用栈是 ccc => bbb
  // 因此当前调用位置是ccc中
  console.log("bbb");
  aaa(); // aaa的调用位置
}
function aaa() {
  debugger; // 查看chrome => 开发者工具 => 源代码 => call stack中可以看到
  // 当前调用栈是 ccc => bbb => aaa
  // 因此当前调用位置是bbb中
  console.log("aaa");
}
```

## 2.2 绑定规则

找到了**调用位置**，我们可以四条规则和**调用位置**判断如何决定了 this 的绑定对象。

### 默认绑定

默认绑定是绑定规则中的默认应用。

场景为：**非严格模式下的函数独立调用时**

```js
var foo = function () {
  console.log(this.a);
};
var a = 123;
foo();
```

当函数直接调用，分析**调用位置**为全局作用域。

### 隐式绑定

`object`或某上下文的属性调用，绑定为他的上下文对象

```js
function foo() {
  console.log(this.name);
}
var obj = {
  name: "kaka",
  foo,
};

var name = "rotto";

obj.foo(); // kaka
```

> 对象引用链调用，取最后一层位置
>
> `obj.obj2.foo() // 打印为obj2的name`

#### 隐式绑定丢失

隐式绑定会存在 this 丢失问题，绑定结果会应用默认绑定。

**使用变量赋值接受了隐式绑定方式的函数**

请看下面代码：

```js
function foo() {
  console.log(this.name);
}
var obj = {
  name: "a",
  foo,
};
var bar = obj.foo; // 赋值
var name = "global name";
bar(); // 'global name' 绑定丢失
// ----------------
function doFn(callback) {
  callback();
}
doFn(obj.foo); // 'global name' 绑定丢失,现在是全局作用域
```

## 2.3 显式绑定

**通过 call()和 apply()方法的第一个参数直接指定 this 对象**(js 中绝大多数函数及自己创建的函数都提供了这两个方法)

**可惜，这两个方法仍然不能解决丢失问题。**

可以在显示绑定基础上，使用"**硬绑定**"或"**api 调用上下文**"来实现：

看以下**硬绑定代码**

```js
function foo() {
  console.log(this.name);
}
var obj = {
  name: "a",
  foo,
};

var bar = function (cb) {
  // 1. 显示绑定后返回给bar
  return cb.apply(obj, arguments);
};
// 2. js提供的硬绑定方法
var bar2 = foo.bind(obj);
// 3. 调用其他api上下文
var bar3 = [1, 2, 3, 4].forEach(foo, obj);
```

## 2.4 new 绑定

这是最后的一条绑定规则，通过`new`关键字绑定为**创建的新对象**。

首先需要消除一个误会。那就是在 javascript 中的**构造函数和 new 实例化**

js 的构造函数只是**被 new 操作符调用的函数**，并不属于某个类，也不会实例化一个类。

实际上并不存在所谓的**构造函数**，只有对函数的**构造调用**。

使用 new 调用函数会执行下面操作：

1. 创建一个全新的对象
2. 新对象被执行`[[原型]]`连接
3. 绑定函数调用的 this
4. 函数没有返回对象，自动返回这个创建的新对象。

## 2.5 优先级

当我们判断 this 绑定规则，可以根据优先级来逐步判断。

new 绑定 => 显示绑定 => 隐式绑定 => 默认绑定

## 2.6 绑定例外

1. 当显式绑定/硬绑定时传入`null`或`undefined`，在调用时会被忽略，实际应用为：**默认绑定规则(全局 this)**

1. 箭头函数的 this，使用函数的**词法作用域**。

> 在第一种情况下，确实想要绑定`null`或`undefined`，我们可以使用`object.create(null)`创建一个新对象，可以达到一个效果

## 2.7 软绑定

在显示绑定中提到过可以使用 bind 来实现硬绑定，但是硬绑定存在一个问题。

看以下代码：

```js
var bar = foo.bind(obj);
var bar2 = bar.bind(obj2);
// bar2的this在硬绑定一次后，无法二次使用隐式、显式绑定了
bar();
bar2();
```

那我们可以实现一个软绑定，让他默认绑定一个值，且保留隐式和显式二次绑定的能力。

看以下代码：

```js
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function (obj) {
    var fn = this;
    var allArgs = [].slice(arguments, 1);
    var bound = function () {
      // 处理this逻辑
      const bindThis = !this || this === (window || global) ? obj : this;
      // 执行并返回原函数
      return fn.apply(bindThis, allArgs.concat([].slice.call(arguments)));
    };
    // 返回处理后的函数
    return bound;
  };
}
```

---

# 第三部分 对象

## 1. 对象类型

在 javascript 中，有**7+1 种数据类型**。

- 基本类型
  1. string
  1. number
  1. boolean
  1. null
  1. undefined
  1. bigInt
  1. symbol
- object

js 中还有一些子对象类型，**有 9 种**。它们实际上只是一些内置函数，可供`new`操作符构造调用。

1. String
2. Number
3. Boolean
4. Object
5. Function
6. Array
7. Date
8. RegExp
9. Error

## 2. 复制对象

js 中的复制对象，有两种： 浅拷贝和深拷贝。

浅拷贝是复制出对象值，而不是它的引用地址。通常 ES6 的`Object.assign({}, oldObj)`

深拷贝是除了复制出对象，对象的属性、方法的值都复制出来。(JSON 安全)的对象可以使用`JSON.parse(JSON.stringify())`

## 3. 属性描述符

ES5 后增加了属性描述符、可以直接检测属性特性的方法。

分别有：`writable`(可写)、`configurable`(可配置)、`Enumerable`(枚举)。这里有几点小知识点。

- `Object.getOwnPropertyDescriptor(obj, key)`查看属性描述符描述

- `configurable=true`可以使用`Object.defineProperty()`修改属性描述符

- 当属性不可配置时，可以修改`writable=false`,但是不可以设置为`true`

- 不可配置时，也禁止删除属性

## 4. 不变性

> ES5 设置属性、对象不可改变的方法都是**浅不可变**。

- 设置常量： `writable`和`configurable`都设置为 false
- 禁止扩展： `Object.PreventExtensions()`禁止添加新属性
- 密封： `Object.seal()`禁止扩展且不可`configurable=false`
- 冻结： `Object.freeze()`密封且`wriable=false`

## 5. getter/setter

对象的取值及修改的`[[GET]]`/`[[PUT]]`操作，可以通过定义 getter、setter 来设置， 这个属性被定义为**访问描述符**

## 6. 存在性

访问对象的属性，可能是 undefined。 那么如何得知是存储的 undefined 还是属性不存在所以返回的 undefined?

可以通过：

- `key in object`
- `obj.hasOwnProperty(key)`
- `Object.getOwnPropertyNames(obj)`

属性描述符中的`enumerable`决定了属性是否可枚举。 如果设置 false，以上 2 种方法还是可以检测到。

只想获取可枚举属性：

- `Object.keys()`
- `for...in`
- `obj.propertyIsEnumerable(key)`

# 第四部分 原型

到底啥玩意是原型? 原型干了啥?

这一节可以得到一个答案。

## 1. [[Prototype]]

javascript 的对象中，有一个特殊内置属性：`[[Prototype]]`,**实际上是对于其他对象的引用**

查看以下代码：

```js
var obj = {
  a: 2,
};
var myObj = Object.create(obj);
console.log(myObj.a); // 2
```

> `Object.create()`可以将`[[protorype]]`关联到参数并返回新对象。
>
> 后面会介绍它的原理

`myObj`自身没有`a`属性， 那么就需要查找对象的`[[Prototype]]`链，直到查找完整条`[[prototype]]`链。

> 使用`for...in`和`in`操作符 都会检查`[[prototype]]`链

### 1.1 Object.prototype

但是哪里是`[[prototype]]`的尽头呢?

所有普通的`[[prototype]]`链最后都会指向内置的`Object.prototype`。它包含了很多内置功能，比如`toString()`、`.valueOf()`

### 1.2 属性设置及屏蔽

`obj.age = 2`这种对象属性的赋值或修改，完整过程得了解下：

1. 首先如果是`obj`本身包含了`age`的普通数据访问属性，那么会修改
2. 如果不直接存在在 obj 上，会遍历`[[prototype]]`链，
   - 如果找不到`age`，直接新增到`obj`上
3. 如果即在`obj`又在`[[prototype]]`链上层，那么就会发生**屏蔽**(**`obj`属性会屏蔽掉所有原型链的属性**)。

**下面分析下如果不直接存在于`obj`，而存在于原型链上面的情况。**

1. 如果原型链上存在且**不是只读**`writable!=false`，那么直接在`obj`上添加， 它是**屏蔽属性**

2. 如果原型存在但**是已读**， 那么**会被忽略(严格模式报错)**

3. 如果原型存在且**是 setter**, 那么**一定会调用 setter**， 不会触发**屏蔽**

> 以上第 2 种和第 3 种如果也想要屏蔽，那么不使用`=`来赋值， 可以使用`Object.defineProperty()`

## 2. “类”

现在有一个核心问题: 为什么一个对象要关联到另一个对象呢? 原型这种对其他对象的引用是为了什么? 需要理解下`[[prototype]]`**不是**什么?

实际上 javascript 才是真正被称为**面向对象**的语言，因为它可以不通过类，来直接创建对象。

在 javascript 中实际上根本就不存在类! **在 javascript 中只有对象！！**

### 2.1 “类”函数

在 js 中一直有一种奇怪行为被滥用，那就是**模仿类**。

```js
function Foo() {}
var foo = new Foo();

console.log(Foo.prototype.constructor === Foo); // true
console.log(foo.constructor === Foo); // true
```

以上代码通过`new`关键字让我们觉得构造了类的实例，`Foo()`的调用方式也很像初始化类时类构造函数的调用方式。**让我们感觉`Foo`像是一个类**

除此之外`Foo.prototype(声明函数时)`有一个公有且不可枚举的属性`.constructor`，这个属性引用的是对象关联的函数，而通过`new Foo()`创建对象也有这个属性。也就是我们打印的 2 个`true`

> 实际上 foo 对象本身并没有这个`.constructor`属性，虽然它确实指向了`Foo`函数。**下一小节详解**

> 在 js 世界的惯例，**类名称要大写**，以至于如果你用**new 来调用小写函数**或者**不用 new 来调用首字母大写函数**，会被人骂你菜。 但是对引擎来说**首字母大写毫无意义**

### 2.2 构造函数 or 调用

`Foo`本身并不是构造函数，只是当使用`new`来调用函数，会把**函数调用**变为一个**构造函数调用**，`new`会**劫持**调用并用构造对象形式来调用它。

### 2.3 模仿类

来看 js 中**模仿类**的两个行为：

```js
function Foo(name) {
  this.name = name;
}
Foo.prototype.getName = function () {
  return this.name;
};

var a = new Foo("a");
var b = new Foo("b");
console.log(a.getName()); // a
console.log(b.getName()); // b
```

以上代码有两个**面向类**的行为：

- `this.name=name`像是给类实例封装的属性值
- `Foo.prototype.getName`像是给`Foo.prototype`对象添加了一个函数后，`a`和`b`都可以正常使用了?

看起来像是创建`a`、`b`对象时将`Foo.prototype`复制给这两个对象? **并不是**

**这里是通过之前说到的`[[prototype]]`**, 只是在创建过程中，将`a`、`b`的`[[prototype]]`关联到了`Foo.prototype`上，查找属性`name`或者`getName`发现没有就会通过委托在`Foo.prototype`上找到。

### 2.4 回顾`.constructor`

**之前说到了`.constructor`属性**， 让我们以为创建的对象`a.constructor === Foo`，但并非如此。

来看一下代码：

```js
function Foo(name) {
  this.name = name;
}
Foo.prototype = {}; // 一个空对象

var a = new Foo();
console.log(a.constructor === Foo); // false
console.log(a.constructor === Object); // true
```

上面代码实际发生了什么? **实际上`a`并没有`.constructor`属性，他会委托给`[[prototype]]`链上的`Foo.prototype`， 如果没有(默认是有的，我们给置空了)，会继续委托，最后到了所有对象委托链的最顶端`Object.prototype`**

### 2.5 检查**类**关系

假设有一个对象`a`，怎么寻找它委托的对象?

- `instanceof`可以检查**对象**和**函数**，对象链上是否有指向`Fn.prototype`的对象
- `b.isPrototypeOf(c)`
- `Object.getPrototypeOf(a) === Fn.prototype`
- `a.__proto__ === Fn.prototype`

### 2.6 原型链

**如果在对象上没有找到属性，引擎就会继续在对象`[[prototype]]`关联的对象上寻找，如果后者还是没有找到，那么继续查找它的`[[prototype]]`， 这一系列的对象查找连接就叫做原型链**

## 3. ES6 的 Class

ES6 引入的 Class 语法糖解决了什么问题?

1. 语法更加简洁
2. 不用使用杂乱的`.prototype`
3. `extends`直接继承，不再使用`Object.create()`或`._proto_`和`Object.setPrototypeOf()`

### 3.1 陷阱

Class 基本上是`[[prototype]]`的语法糖就会意识到一个陷阱所在，如果修改了父**类**的一个方法，那么所有**子类**和**实例对象**都会收到影响，他们并不是**复制对象**，而是基于`[[prototype]]`的实时委托

```js
class C {
  constructor() {
    this.num = Math.random();
  }
  rand() {
    console.log(`Random: ${this.num}`);
  }
}

var c1 = new C();
c1.rand(); // Random: 0.123456789

C.prototype.rand = function () {
  console.log("我被修改了");
};
var c2 = new C();
c1.rand(); // 我被修改了
c2.rand(); // 我被修改了
```

> ---结束---
