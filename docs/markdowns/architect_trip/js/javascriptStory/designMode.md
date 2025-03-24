<!-- ---
theme: vuepress
highlight: tomorrow-night
--- -->

> **学习《javascript设计模式与开发实践》总结。**

有些人说，在动态语言javascript的世界是没有设计模式这个概念的。我们需要了解下不同的声音，从什么是设计模式入手。

GoF总结了23种软件开发设计模式中，对设计模式的概念是：**在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案。**

# 一、js的面向对象

javascript没有提供传统面向对象语言中的类继承，而是通过**原型委托**的方式实现对象与对象之间的继承。

## 1.1 编程语言

编程语言大体可以分为两类： **静态类型语言**和**动态类型语言**。 各自的优缺点如下：

- 静态类型语言优点：
  
  1. 编译时可以发现类型不匹配的错误
  
  2. 因为数据类型明确的规定，可以使编译器进行优化工作，提高执行速度。

- 静态类型语言缺点：
  
  1. 迫使程序员按照**强契约**来编写程序
  
  2. 类型声明意味着**更多的代码**, 从而分散了**思考业务逻辑的注意力**

- 动态类型语言优点：
  
  1. 编写代码量少，看起来更加简洁，可阅读性更强

- 动态类型语言缺点：
  
  1. 无法保证变量类型，**导致运行期才会暴露的类型相关错误**

> 鸭子类型： 鸭子类型通俗点来说：“如果它走起路来像鸭子，叫起来也是鸭子，那么它就是鸭子。”
> 
> 在动态类型语言的面向对象设计中，**鸭子类型**的概念至关重要，可以轻松在动态类型语言中，**面向接口编程而不是面向实现编程**
> 
> "面向接口编程"是设计模式最重要的思想，在js中，面向接口编程与主流的静态语言实现也并不相同。

"鸭子类型"可以举例为： 一个对象如果有push和pop方法，而且提供了正确的实现，那么它就可以当做是栈。

## 1.2 多态

多态一词来源于希腊文 polymorphism。可以读作： poly(复数) + morph(形态) + ism。

多态的实际定义是： **同一操作用于不同对象上面，可以产生不同解释和执行结果**。

多态最根本的作用是通过把过程化的条件分支语句，转换为对象的多态性，从而消除这些条件分支语句。

---

一个简单的例子： 我们在使用地图api时，第一次选用了高德地图的api代码如下：

```js
var map = {
  show: function(){
    console.log('高德地图渲染')
  }
}
var renderMap = function(){
  map.show()
}
renderMap()
```

当某天转换了地图api的选用，我们使用百度地图，那么又该如何继续书写现有代码呢？

```js
var baiduMap = {
  show: function(){
    console.log('百度地图渲染')
  }
}

var renderMap = function(type){
  if(type == 'google'){
    map.show()
  }else if(type == 'baidu'){
    baiduMap.show()
  }
  // ...
}
```

**上面的代码虽然完成了功能，但是极度脆弱，如果增加了腾讯地图，apple地图有需要重写renderMap函数**，可以抽离代码。将**做什么**和**怎么去做**分开。

```js
var renderMap = function(map){
  if(map.show instanceof Function){
    map.show()
  }
  // ...
}
```

Martin Fowler在《重构：改善既有代码的设计》写到： 多态的最根本好处在于，你不必再向对象询问"你是什么类型"而后根据回答调用对象的某个行为。 上面的代码则是验证了这一点。

## 1.3 原型模式

第一个设计模式————原型模式。 

原型模式并不单是一种设计模式，也被称为是一种编程泛型。

从设计模式角度来讲，原型模式是用于创建对象的一种模式，如果想要创建一个对象，不关心对象的具体类型，而是通过找到对象，然后克隆创建一个一模一样的对象。

原型模式关键在于语言本身是否提供了clone方法，ES6提供了`Object.create()`方法:

```js
function Plane(){
  this.blood = 100
  this.attckLevel = 1
  this.defenseLevel = 1
}
var plane = new Plane()
plane.attckLevel = 2
plane.defenseLevel = 2
plane.blood = 200
var clonePlane = Object.create(plane)
console.log(clonePlane); 
// {blood: 200, attckLevel: 2, defenseLevel: 2}
```

克隆对象的方法是上述代码，但是原型模式并不是为了得到一个一模一样的对象，而是提供某种便捷方式去创建对象，克隆只是过程和手段。

在javascript中，本身就是一门基于原型的面向对象语言，在这里称为**原型编程泛型**更为合适。

### 1.3.1 规则

原型编程泛型有一些基本规则：

- 所有数据都是对象
- 要得到一个对象，不是实例化类，而是找到对象作为原型并克隆
- 对象会记住他的原型
- 对象无法响应某种请求，会将请求委托给它的原型。

以上规则在javascript中也可以列举。

### 1.3.2 js中的原型继承

1. 在javascript中除了undefined都可以理解为对象

2. js中是没有类的概念，即使是使用new关键字来实例化，本质也是先克隆Object.prototype对象，然后进行额外操作

3. 记住他的原型，ES6的`Object.getPrototypeOf(obj)`或暴露的`__proto__`也可以验证这点

4. 例如数组的各类方法其实都是定义在原型上，我们通过字面量创建数组，并没有定义诸如`forEach`方法等，但是可以使用。 这是委托给了原型。

new实例化的内部可以简单看做以下代码执行：

```js
function Person(name){
  this.name = name;
}
Person.prototype.getName = function(){
  return this.name;
}
var objectFactory = function(){
  // 从通用原型Object.prototype克隆一个新的原型
  var obj = new Object(),
      // objectFactory(原型, 构造器参数)截取构造器原型
      Constructor = [].shift.call(arguments);
  // 指向正确的原型
  obj.__proto__ = Constructor.prototype;
  // 剩余参数浇给构造器调用
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}

var a1 = objectFactory(Person, 'a1')
var a2 = new Person('a2')
// true 结果是一致的
console.log(Object.getPrototypeOf(a1) === Object.getPrototypeOf(a2) === Person.prototype)
```

# 二、this/call/apply

在js中，this关键字总是让初学者迷惑。`Function.prototype.call`和`Function.prototype.apply`也广泛使用，有必要在设计模式前稍微了解。

## 2.1 this

### 2.1.1 this指向

除去不常用的with和eval外，可大致分为四种情况：

1. 作为对象的方法调用时：**指向该对象**
2. 作为普通函数时：**指向globalThis**
3. 构造器调用：**指向返回的对象**
4. call/apply调用：**传入的this参数**

## 2.2 call/apply

两个方法作用是一模一样，只是传入参数的形式不同，第一个参数都是this的指向，第二个参数不同。

> 第一个参数传入null, this指向为默认的宿主对象。

apply第二个参数为数组或类数组，而call第二个参数为**解构后**的数组形式。

### 2.2.1 bind()

大部分浏览器已经实现了内置的bind方法，我们也可以实现一个简单的`Function.prototype.bind()`。

```js
function myBind(){
  var self = this,
      // bind绑定时的this
      context = [].shift.call(arguments),
      // 绑定时的参数
      args = [].slice.call(arguments);
  return function(){ // 返回一个新的参数
      // 执行新的函数首先是正确的this(为绑定时参数)
      // 参数绑定时候为args保存下来，第二次参数则是执行时参数
    return self.apply(context, [].concat(args, [].slice.call(arguments)))
  }
}
```

# 三、闭包和高阶函数

## 3.1 闭包

> 主是设计模式。稍微了解即可。

闭包形成与变量作用域和变量的生存周期密切相关。

变量作用域即是变量的有效范围。

变量的生存周期，如果是全局变量生存周期是永久的，除非主动销毁。 而如果是函数内局部变量，当退出函数时，变量会随着调用结束而销毁。

---

闭包的作用： 封装变量、延续变量生命周期。

## 3.2 高阶函数

高阶函数是指至少满足下列2个条件之一的函数：

1. 函数可以作为参数被传递
2. 函数可以作为返回值被返回

---

设计模式的部分开始，接下来介绍**javascript**的另外的14种设计模式。

---

# 四、单例模式(第一种)

单例模式的定义： 保证仅有一个实例，并提供全局访问点。

单例模式是一种常用的模式，比如线程池、全局缓存、window对象等。

## 4.1 实现单例模式

全局变量并不是单例模式，很容易造成命名污染，且很容易被覆盖。

而解决命名污染有两种方式： 命名空间和闭包。

### 4.1.1 命名空间

```js
// 静态命名空间
var namespace1 = {
  // a: xxx, b:xxx
}
// 动态命名空间
var myApp = {}
myApp.nameSpace = funcion(name){
  // nameSpace(first.second)调用
  var parts = name.split('.'),
      current = myApp;
  for(var k in parts){
    // 如果没则创建一个子空间
    if(!current[ parts[k] ]){
      current[ parts[k] ] = {}
    }
    // 如果有，则赋值为子空间，为了检测和操作下层子空间
    current = current[parts[k]]
  }
}
myApp.nameSpace('event')
myApp.nameSpace('dom.style')
// 以上代码可以等同于:
myApp = {
  event:{},
  dom: {
    style: {}
  }
}
```

### 4.1.2 闭包封装

```js
var myApp = (function(){
  return {
    getSome(){}
  }
})()
```

## 4.2 惰性实例

惰性实例指的是在需要的时候才创建实例。 **这也是单例模式的重点。**

### 4.2.1 类形式

```js
class Singleton {
  constructor(name) {
    this.name = name
  }
}
// 只有在调用getInstance时才会创建一个实例
Singleton.getInstance = function() {
  var instance = null
  return function(name){
    if(!instance){
      instance = new Singleton(name)
    }
    return instance
  }
};
```

### 4.2.2 全局变量形式

上述是基于"类"的单例模式，现在则是与全局变量结合的惰性单例。

```js
var createSingleton = (function(){
  var obj = null
  return function(){
    if(!obj){
      obj = {}
    }
    return obj
  }
})()
```

### 4.2.3 单一职责原则

通过一个例子来实际完成惰性单例以及了解什么叫**单一职责原则**。

单一职责原则指的是：就一个类(对象和函数)而言，应该仅有一个引起它变化的原因。 承担多职责，会造成低内聚、高耦合的脆弱设计。

项目中，对于登录操作，登录所用弹窗可以使用单例模式，代码如下：

```js
var createLoginLayer = (function(){
  var div;
  return function(){
    if(!div){
      div = document.createElement('div');
      div.innerHTML = '登录弹窗'
      div.style.display = 'none'
      document.body.appendChild(div)
    }
    return div
  }
})()

document.getElementById('btn').onclick = function(){
  var loginLayer = createLoginLayer()
  loginLayer.display = 'block'
}
```

上述代码符合单例模式及惰性特性，但是违反了单一职责原则，即：创建对象和管理单例都在createLoginLayer内。 

如果下次需要创建页面的唯一iframe、某个标签，那么函数需要重新照抄一遍。

我们需要将管理单例的职责(不变的部分分离出来)，形成通用惰性单例，通过传递创建对象的callback来创建对象完成结合。

```js
// 管理单例、不变部分
var getSingle = function(callback){
  var result
  return function(){
    return result || (result = callback.apply(this, arguments))
  }
}
// 创建对象、变化部分
var createxxx = function(){
  var div = document.createElement('div');
  div.innerHTML = '登录弹窗'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}
var createxxx2 = function(){
  var iframe = document.createElement('iframe');
  // ...xxx
}

// 使用
var createLoginLayer = getSingle(createxxx)
document.getElementById('btn').onclick = function(){
  var loginLayer = createLoginLayer()
  loginLayer.display = 'block'
}
```

# 五、策略模式(第二种)

策略模式的定义是： 定义一系列算法，将它们一个个封装起来，并且使它们可以相互替换(相互替换主要是针对静态类型语言)。

> 将不变的部分和变化的部分隔开几乎是每个设计模式的主题，策略模式也不例外。
> 
> 策略模式的目的是将算法的使用和算法的实现隔离开来。

## 5.1 绩效工资及重构

计算年终奖为例，绩效为S则有四倍工资，A三倍、B两倍，现在代码实现：

```js
var calculateBonus = function(perfomanceLevel, salary){
  switch(perfomanceLevel){
    case 'S':
      return salary * 4;
    case 'A':
      return salary * 3;
    case 'B':
      return salary * 2;
  }
}
```

上述代码没有问题，但是我们需要将不变和变化分别隔离，变化的则是绩效等级、奖金算法。重构代码如下：

```js
var strategies = {
  "S": function(salary) {
    return salary * 4;
  },
  "A": function(salary) {
    return salary * 3;
  },
  "B": function(salary) {
    return salary * 2;
  }
}
var calculateBonus = function(level, salary) {
  return strategies[level](salary);
}
calculateBonus('S', 20000);
```

## 5.2 多态在策略模式的体现

通过策略模式重构代码，消除原代码的条件语句，所有跟计算有关逻辑不放入策略Context，而是分布在各个策略对象中。Context并没有计算能力，而是将职责委托给某个策略对象。当对这个对象发出请求时，会返回不同计算结果。这正是对象多态的体现。

## 5.3 表单校验的策略模式

当我们在提交表单时，需要对表单进行校验，最初代码如下：

```js
var registerForm = document.getElementById('registerForm');

registerForm.onsubmit = function(){
  if(registerForm.userName.value === ''){
    alert('用户名不能为空');
    return false;
  }
  if(registerForm.password.value === ''){
    alert('密码不能为空');
    return false;
  }
  if(!/^[a-zA-Z0-9]{6,12}$/.test(registerForm.phoneNumber.value)){
    alert('密码必须为6-12位字母或数字');
    return false;
  }
}
```

上述代码的缺点显而易见：

1. 函数庞大，设计了多个条件分支
2. 函数缺乏弹性，如果想要修改或新增校验规则，需要深入到`registerForm.onsubmit`的函数内部，这违反了**开发-封闭**原则
3. 算法复用性差，另一个表单想要使用，那么就需要复制的漫天遍野。

---

策略模式重构：

```js
// 策略对象
var strategies = {
  isNonEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  }
}

// 提前了解我们准备如何调用校验
var validaFunc = function(){
  var validator = new Validator()
  // 添加一些校验规则，可变
  validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空')
  validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位')
  validator.addMult(registerForm.phoneNumber, 
    [
      {strategy: 'isNonEmpty', errorMsg: '电话号码不能为空'},
      {strategy: 'isMobile', errorMsg: '手机号码格式不正确'},
    ]
  )
  // 开始校验并获得校验结果
  var errMsg = validator.start()
  return errMsg
}
// 表单提交事件
registerForm.onsubmit = function () {
  // 调用校验函数，有返回值则说明未通过校验
  var errMsg = validaFunc()
  if (errMsg) {
    alert(errMsg)
    return false
  }
}

// 编写Validator类
class Validator {
  constructor() {
    this.cache = []
  }
  // 根据上面代码结果来反推类代码
  add(dom, rule, errorMsg){
    // 第二参数为 minLength:6 或 isNonEmpty
    var ary = rule.split(':')
    // 策略对象的事件分别加入
    this.cache.push(function(){
      var strategy = ary.shift() // minLength/isNonEmpty
      ary.unshift(dom.value) // [value, 6] / [value]
      ary.push(errorMsg)  // [value,6,errorMsg] / [value, errorMsg]
      return strategies[strategy].apply(dom, ary)
    })
  }
  // 单表单多校验规则
  addMult(dom, rules){
    var self = this
    for (let i = 0, rule; rule = rules[i++];) {
      var strategyAry = rule.strategy.split(':')
      var errorMsg = rule.errorMsg
      self.cache.push(function(){
        var strategy = strategyAry.shift()
        strategyAry.unshift(dom.value)
        strategyAry.push(errorMsg)
        return strategies[strategy].apply(dom, strategyAry)
      })
    }
  }
  // 开始校验
  start(){
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
      var msg = validatorFunc() // 开始校验
      if (msg) {
        return msg
      }
    }
  }
}
```

## 5.4 策略模式优缺点

优点：

1. 策略模式利用组合、委托、多态等技术，避免多重条件语句
2. 对**开发-封闭原则**的完美支持，使得易于切换、理解、扩展
3. 算法也可以复用、避免重复粘贴

---

缺点：

1. 增加许多策略类或对象
2. 违反了**知识最少原则**，想要使用必须进入到strategy中，了解到各个strategy的不同点。

# 六、代理模式(第三种)

代理模式定义：为一个对象提供一个代用品或占位符，以便控制对它的访问。

代理模式的关键是：不方便直接访问一个对象或不满足需要的时候，提供一个替身对象来控制对原对象的访问。实际访问的是替身对象，替身对象对请求做出处理再转发给本体对象。

## 6.1 保护代理和虚拟代理

一个例子是 小明想要追女神，但是女神只要开宝马的或者年龄大的男人，心情好的时候追求概率增加等，那么可以让小红作为代理去执行送花的操作。

这里的小红代理可以帮女神过滤掉 没宝马的、年龄小的，这就叫保护代理。

小明将操作交给了小红代理去执行，小红只会在女神心情好的时候执行送花操作，这叫做虚拟代理。

## 6.2 虚拟代理合并http请求

我们做一个文件同步的上传功能，当选中checkbox，对应的文件则会同步到另一个服务器。

最初代码如下：

```js
var synchronousFile = function(id){
  console.log(`开始同步文件， id为：${id}`)
}
var checks = document.getElementsByTagName('input')
for(var i = 0; i < checks.length; i++){
  checks[i].onclick = function(){
    if(this.checked){
      synchronousFile(this.id)
    }
  }
}
```

---

以上代码频繁的网络请求将会带来相当大的开销和卡顿。 

解决方法可以是设置代理函数收集一段时间内请求，最后一次性发送给服务器。

```js
var proxySynchronousFile = (function(){
  var cache = [], // 保存一段时间内需要上传的数据
      timer; // 定时器，时间段
  return function(id){
    cache.push(id)
    if(timer){ // 不会覆盖已启动定时器
      return
    }
    timer = setTimeout(function(){
      synchronousFile(cache.join(',')) // id集合，执行本体操作
      clearTimeout(timer)
      timer = null
      cache.length = 0
    },2000)
  }
})()
// 点击事件替换为代理事件
checks[i].onclick = function(){
  if(this.checked){
    proxySynchronousFile(this.id)
  }
}
```

## 6.3 缓存代理

缓存代理可以缓存一些开销大的运算结果，如果参数一致或特殊情况，可以直接返回缓存结果。

现有求乘积的函数mult，如果传入参数之前传入过则直接返回缓存的计算结果。

```js
var mult = function(){
  console.log('开始计算乘积')
  var a = 1
  // 不在乎其他边界情况 简单例子
  for(let i = 0, l = arguments.length; i < l; i++){
    a = a * arguments[i]
  }
  return a
}

var proxyMult = (function(){
  var cache = {}
  return function(){
    var args = Array.prototype.join.call(arguments)
    if(args in cache){
      return cache[args]
    }
    return cache[args] = mult.apply(this, arguments)
  }
})()

// 两次调用，只计算一次
proxyMult(12,34)
proxyMult(12,34)
```

## 6.4 高阶函数进阶代理

上节代码只能代理乘积，但是可以通过传入fn，然后通用代理函数。

```js
var proxyFunc = (function(fn){
  var cache = {}
  return function(){
    var args = Array.prototype.join.call(arguments)
    if(args in cache){
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
})()
```

## 6.5 其他代理

代理模式变体很多，考虑在js的适用性，目前了解即可。

1. 防火墙代理：控制网络资源访问
2. 远程代理：为一个对象在不同地址空间提供局部代理。
3. 保护代理：对应有不同访问权限情况
4. 智能引用代理：取代简单指针，访问对象时执行附加操作。比如计算对象引用次数
5. 写时复制代理：用于复制一个庞大对象情况。延迟复制过程，当对象真正被修改，才进行复制。 DLL(操作系统动态链接库)

# 七、迭代器模式(第四种)

迭代器模式定义：指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

一个简单的迭代器模式each函数：

```js
var each = function(ary, callback){
  for(var i = 0; i < ary.length; i++){
    callback(ary[i], i, ary);
  }
}
each([1,2,3], function(item, index, ary){
  console.log(item, index, ary)
})
```

## 7.1 内部/外部迭代器

刚刚编写的each函数属于**内部迭代器**。 函数内部已经定义好了迭代规则，它完全接受了这个迭代过程，外部只需要初始调用一次。

### 7.1.1 外部迭代器

外部迭代器必须显式得请求迭代下一个元素。ES6中所有实现了迭代器协议的都是迭代器。下面是简易版代码：

```js
var iterator = function(obj){
  var current = 0
  var next = function(){
    current += 1
  }
  var isDone = function(){
    return current >= obj.length
  }
  var getCurItem = function(){
    return obj[current]
  }
  return {
    next,
    isDone,
    getCurItem
  }
}
```

# 八、发布-订阅模式(第五种)

发布-订阅者模式又叫做观察者模式，定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变，所有依赖与它的对象都将得到通知。

## 8.1 现实中的发布-订阅

小明看上一套房子，到了售楼处才发现已售罄，售楼处告知还有一些尾盘推出，具体什么时候未知。  

小明记下售楼处的电话，以后每天都会打电话问是否可购买。除了小明还有几万人每天都会咨询这个问题。

现实情况也不会是上面那样，售楼公司会记下所有要购买的用户，当可购买的节点出现时(发布)，售楼处变会通知所有用户(订阅)。

## 8.2 发布-订阅模式作用

1. 广泛应用异步编程中，这是一种替代传递回调函数的方案

2. 取代对象之间硬编码的通知机制，一个对象不用再显式地调用另外一个对象的某个接口。

DOM事件也算是发布-订阅模式的使用。

## 8.3 售楼处实现

以下代码则是一种发布-订阅，可以直接订阅依赖、然后发布消息。

```js
// 定义售楼处
var salesOffices = {};
// 缓存列表，存放订阅者的callback
salesOffices.clientList = {}
// 订阅依赖关联
salesOffices.listen = function(key, fn){
  if(!this.clientList[key]){
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn);
}
// 发布消息函数
salesOffices.trigger = function(){
  // 取出消息类型
  var key = Array.prototype.shift.call(arguments)
  // 该消息的callback集合
  var fns = this.clientList[key]
  // 无订阅操作则返回
  if( !fns || fns.length === 0 ){
    return false
  }
  // 循环执行订阅者回调
  for(var i = 0, fn; fn = fns[i++];){
    fn.apply(this, arguments)
  }
}
// 订阅消息
salesOffices.listen('squareMeter88', function(price){
  console.log('价格= ' + price)
})
salesOffices.listen('squareMeter88', function(price){
  console.log('88平米的订阅生效了')
})
salesOffices.trigger('squareMeter88', 200000)
// 价格= 200000
// 88平米的订阅生效了
```

## 8.4 发布-订阅通用实现

以上只是例子，其他售楼处情况又要重写一次？

javascript作为一门解释执行的语言，给对象动态添加职责是理所当然的。

```js
var buser = {
  clientList: {},
  listen(key, fn){
    if(!this.clientList[key]){
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger(){
    var key = Array.prototype.shift.call(arguments);
    var fns = this.clientList[key];
    if(!fns || fns.length === 0){
      return false;
    }
    for(var i = 0, fn; fn = fns[i++];){
      fn.apply(this, arguments);
    }
  }
}
// 定义安装函数，定义后可安装发布-订阅
var instanllEvent = function(obj){
  for(var i in buser){
    obj[i] = buser[i];
  }
}
// 使用
var salesOffices = {}
instanllEvent(salesOffices)
```

## 8.5 增加取消订阅

短信、邮件订阅后都是提供取消订阅功能，这里可以简单实现：

```js
remove(key, fn){
  var fns = this.clientList[key]
  // 如果key对应消息没被人订阅，则返回
  if(!fns){
    return false;
  }
  if(!fn){
    fns && (fns.length = 0)
  }else {
    for(var j = fns.length - 1; j >= 0; j--){
      var _fn = fns[j];
      if(_fn === fn){
        fns.splice(j, 1);
      }
    }
  }
}
```

## 8.6 必须先订阅再发布吗?

我们了解都是订阅者订阅消息，随后发布者发布消息。 而如果顺序颠倒，发布者发布了一条消息，那么按照之前的模式，这条消息就石沉大海。

如同qq的离线消息一样的效果，等接收人上线后，消息推送过来。

为了满足这个需求，需要建立一个存放离线事件的堆栈，当事件发布时，如果此时还没有订阅，那么将发布事件的动作包裹在一个函数内，这个包装函数将被推入堆栈中。等有对象来订阅事件，遍历堆栈且一次执行(也就是重新执行)。

## 优缺点

优点:

1. 时间上解耦
2. 对象之间解耦

---

缺点：

1. 创建订阅者本身消耗时间和内存
2. 订阅一个消息后，可能一次都未发送，但是始终存在于内存中
3. 弱化对象之间联系过度使用的话，对象之间的必须联系被深埋背后，导致难以追踪维护和理解。

# 九、命令模式(第六种)

## 9.1 定义、用途

假设有一个餐厅，我们是点餐员。那么一天的工作是： 客人点餐或打来订餐电话，我们将需求写在清单上并交给厨房，客人并不关心什么厨师怎么帮他做菜。 餐厅还需要满足客人定时预约服务，譬如几时几分来就餐，且可以按照清单顺序来排队炒菜。

而这个订餐信息清单，则是命令模式的命令对象。

命令模式是最简单和优雅的模式之一，命令模式的命令指的是 **一个执行某些特定事情的指令**。

命令模式的最常用场景是： **有时需要向某些对象发送请求，但是并不知道请求的接受者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接受者能够消除彼此之间的耦合关系。**

## 9.2 例子-菜单程序

假设我们正在编写一个app, 有若干button，由于项目分工问题，某个程序员负责绘制按钮元素，另外程序员负责编写点击按钮后的具体行为。

负责绘制按钮元素的代码可以如下：

```js
// 绑定dom点击事件
var bindClick = function(button, fn){
  button.addEventListener('click', fn);
}
// 主菜单界面命令对象
var MenuBar = {
  refresh: function(){
    console.log('刷新菜单界面')
  }
}
// 二级菜单命令对象
var SubMenu = {
  refresh: function(){
    console.log('刷新子菜单')
  },
  add(){
    console.log('添加子菜单')
  },
  delete(){
    console.log('删除子菜单')
  }
}
// 使用
bindClick(document.getElementById('menu-bar'), MenuBar.refresh)
bindClick(document.getElementById('sub-menu-add'), SubMenu.add)
```

## 9.3 js的命令模式

javascript高阶函数可以非常方便的实现命令模式，命令模式在javascript语言中是一种隐形模式。

# 十、组合模式(第七种)

## 10.1 扫描文件夹

文件夹与文件之间关系，非常适合用组合模式来描述。 文件夹内既可以有文件，又可以有文件夹，最终组合成一棵树。 

不论是复制一个文件夹(不论任何子文件类型)还是杀毒软件扫描文件夹。

编写代码如下:

```js
// Folder
class Folder {
  constructor(name) {
    this.name = name;
    this.files = [];
  }
  add(file) {
    this.files.push(file);
  }
  scan(){
    console.log('开始扫描文件夹' + this.name);
    for (let i = 0, file, files = this.files; file = files[i++];) {
      file.scan();
    }
  }
}
// File
class File {
  constructor(name){
    this.name = name 
  }
  add(){
    throw new Error('文件不能添加文件')
  }
  scan(){
    console.log('开始扫描文件' + this.name)
  }
}

// 实际操作情况
var folder = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var file1 = new File('JavaScript设计模式与开发实践');
var file2 = new File('JavaScript高级程序设计');
var file3 = new File('JavaScript权威指南');
folder1.add(file1);
folder1.add(file2);
// 组合后的对象
folder.add(folder1);
folder.add(file3);
// 只需要调用最顶级即可
folder.scan()
```

## 10.2 值得注意的地方

### 10.2.1 组合模式不是父子关系

组合模式的树形结构会误认为是组合后的对象，这不正确。

组合模式是HAS-A(聚合)的关系，而不是IS-A(父子、继承)关系。 他们能够合作的关键是拥有相同的接口。

### 10.2.2 对叶对象操作的一致性

除了要有相同的接口，另一个必要条件是对一组叶对象的操作**必须具有一致性**

如果对全体员工发元旦过节费，可以组合。 但是如果是要生日，那么就不太有用武之地。


## 10.3 引用父对象

保存对父对象的引用，可以在删除文件时发挥作用。 因为我们删除文件实际上是在上层文件夹中删除该文件。

改写Folder和File类，增加属性及remove方法:

```js
// Folder
class Folder {
  constructor(name) {
    this.name = name;
    this.parent = null;
    this.files = [];
  }
  add(file) {
    // 设置加入的文件parent为自己
    file.parent = this
    this.files.push(file);
  }
  scan(){}
  remove(){
    // 如果为null 则说明是顶级文件夹或根本没掌握到的文件
    if(!this.parent)return
    for(let i = 0, files = this.parent.files; i < files.length; i++){
      var file = files[i]
      if(file === this){
        return files.splice(i,1)
      }
    }
  }
}
// File
class File {
  constructor(name){
    this.name = name 
    this.parent = null    
  }
  add(){}
  scan(){}
  remove(){
    if(!this.parent)return
    for(let i = 0, files = this.parent.files; i<files.length; i++){
      var file = files[i]
      if(file === this){
        return files.splice(i,1)
      }
    }
  }
}
```

## 10.4 何时使用组合模式?

1. 表示对象部分-整体的层次结构。  不确定有多少层次，只需要对最顶层对象进行操作，做统一操作。
2. 同意对待树中所有对象。 叶对象还是组合对象自己会做自己正确的事情。

# 十一、模板方法模式(第八种)

基于继承的设计模式————模板方法模式。

## 11.1 定义和组成

模板方法模式是一种只需使用继承就可以实现的非常简单的模式。

模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。 

在模式中，子类实现中的相同部分被上移到父类，而降不同的部分留待子类来实现。

# 十二、享元模式(第九种)

享元(flyweight)模式是一种用于性能优化的模式。fly在这里是苍蝇、蝇量级的意思。

享元模式的核心是运用共享技术来有效支持大量细粒度的对象。

如果系统创建了大量相似对象而导致内存占用过高，那么享元模式就有用了。

## 12.1 初识享元模式

假设有一个内衣工厂，产品目前有50件男内衣和50件女内衣。为了推销，要生产塑料模特来穿上衣服并展示。 

初始代码可以这样写：

```js
class Model{
  constructor(sex, underwear){
    this.sex = sex;
    this.underwear = underwear;
  }
  takePhoto(){
    console.log(`sex: ${this.sex} underwear: ${this.underwear}`)
  }
}
for(let i = 0; i < 50; i++){
  let model = new Model('male', 'underwear'+i);
  model.takePhoto();
}
for(let i = 0; i < 50; i++){
  let model = new Model('female', 'underwear'+i);
  model.takePhoto();
}
```

---

上述代码创建了100个对象， 其实大家都知道只需要2个对象(塑料模特)，而后换上不同衣服则可以完成需求。

```js
var maleModel = new Model('male');
var femaleModel = new Model('female');

for(var i = 0; i < 50; i++){
  maleModel.underwear = 'underwear' + i
  femaleModel.underwear = 'underwear' + i
  maleModel.takePhoto();
  femaleModel.takePhoto();
}
```

## 12.2 内部状态和外部状态

享元模式要求将对象的属性划分为内部状态和外部状态。目标是尽量减少共享对象的数量。

状态的划分经验指引可以总结为：

1. 内部状态存储于对象内部
2. 内部状态可以被对象共享
3. 内部状态独立于具体场景，通常不会改变
4. 外部状态取决于具体场景，并且根据场景变化而变化，且不可共享。

我们将外部状态剥离出来的对象称为了共享对象，在最终使用时通过组装后完成了一个完整的对象。而组装的过程是需要花费一定的时间，从而减少系统内存在的对象数量。 **因此，享元模式是一种用时间换空间的优化模式**

# 十三、职责链模式(第十种)

职责链模式定义是：使多个对象都有机会处理请求，从而避免请求的接受者和发送者之间的耦合关系，将对象连接成一条链，并沿着这条链传递请求，直到有一个对象处理它为止。

## 13.1 例子

职责链模式在现实中可以类比为， 在高峰期的公交车上，需要刷卡，但是我们人挤人并排站，这时可以通过传递人，不断的传递最终到机器前刷完成支付。

在实际开发过程中，我们假设有一个电商网站，经过了分别交纳500元和200元定金的两轮预定后(订单已生效), 现在到了正式购买的阶段。

针对支付过定金的用户有一定的优惠政策，已经支付过500元定金的用户会受到100元的商城优惠券，200元定金用户可以收到50元优惠券。而没有支付定金用户只能普通购买，且无库存时不一定可以买到。

流程转换为代码：

```js
/**
 * orderType: 1为500定金 2为200定金 3为普通用户
 * pay: true、false 支付状态。 如果为false指没有支付定金。
 * stock:库存状态。 如果=0 指没有库存。
*/
var order = function(orderType, pay, stock){
  if(orderType === 1){
    if(pay === true){
      console.log('500定金用户，且支付定金，可得到100优惠券');
    }else{
      if(stock > 0){
        console.log('普通购买，无优惠券');
      }else{
        console.log('库存不足');
      }
    }
    return
  }
  if(orderType === 2){
    if(pay === true){
      console.log('200定金用户，支付定金，可得到50优惠券');
    }else{
      if(stock > 0){
        console.log('普通购买，无优惠券');
      }else{
        console.log('库存不足');
      }
    }
    return
  }
  if(orderType === 3){
    if(stock > 0){
      console.log('普通购买，无优惠券');
    }else{
      console.log('库存不足');
    }
  }
}
```

---

上述代码。。一言难尽。 使用职责链模式重构代码。

## 13.2 职责链模式重构

```js
var order500 = function(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预购，得到100优惠券');
    } else {
        order200(orderType, pay, stock);
    }
}

var order200 = function(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预购，得到50优惠券');
    } else {
        orderNormal(orderType, pay, stock);
    }
}

var orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('手机库存不足');
    }
}
```

现在重构完成后，其实只是将不同逻辑提炼为独立的函数，这违反了封闭-开放模式，如果中间500与200之间多了一层300，又该如何书写? 必须深入到函数内部来重写逻辑。

## 13.3 更灵活可拆分的职责链节点

我们定义一下Chain，他拥有属性successor，表示了链的下一个节点， 还拥有一个方法passRequest，传递请求给下一个节点。

```js
class Chain {
  constructor(fn){
    this.fn = fn
    this.successor = null
  }
  setNextSuccessor(successor){
    return this.successor = successor
  }
  passRequest(){
    var ret = this.fn.apply(this, arguments)
    if(ret === 'nextSuccessor'){
      return this.successor && this.successor.passRequest.apply(this.successor, arguments)
    }
    return ret
  }
}

var chain500 = new Chain(order500)
var chain200 = new Chain(order200)
var chainNormal = new Chain(orderNormal)

chain500.setNextSuccessor(chain200)
chain200.setNextSuccessor(chainNormal)

chain500.passRequest(1, true, 500) // 500元定金预购，得到100优惠券
chain500.passRequest(2, true, 500) // 200元定金预购，得到50优惠券
chain500.passRequest(3, true, 500) // 普通购买，无优惠券
chain500.passRequest(1, false, 0) // 手机库存不足

// 如果中间穿插新的节点。如增加300的定金
var order300 = function(){
  // xxx
}
var chain300 = new Chain(order300)
chain500.setNextSuccessor(chain300)
chain300.setNextSuccessor(chain200)
```

原来的order函数也需要稍微修改，配合Chain类来使用。

```js
var order500 = function(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预购，得到100优惠券');
    } else {
      // 配合passRequest函数的判断
      return 'nextSuccessor'
    }
}
```

## 13.4 js的函数式特性

```js
Function.prototype.after = function(fn){
  var self = this;
  return function(){
    var ret = self.apply(this, arguments);
    if(ret === 'nextSuccessor'){
      return fn.apply(this, arguments);
    };
    return ret;
  }
}

var order = order500.after(order200).after(orderNormal)
```

# 十四、中介者模式(第十一种)

中介者模式是迎合迪米特法则的一种实现。迪米特法则也叫做**最少知识原则**，是指一个对象应该尽可能少的了解另外的对象(类似不与陌生人说话)。

对象之间如果耦合度太高，当发生改变时，彼此会相互影响。 中介者模式中对象之间几乎不知道彼此的存在，只能通过终结者来互相影响。

## 14.1 优缺点及实际

优点是 使得对象之间得以解耦，以中介者和对象之间的一对多关系取代了对象之间的网状多对多关系。

缺点是 新增一个中介者对象，因为对象之间交互的复杂性，转移为了中介者对象的复杂性，使得中介者对象经常是巨大的。

中介者对象可以方便的对模块或对象进行解耦，但对象之间并非一定需要解耦。 一般来说，如果对象之间的复杂耦合导致调用和维护出现了困难，而且耦合度随着项目的变化呈现指数级的增长曲线，那么就应该考虑使用中介者模式了。

## 14.2 购买商品

我们现在有手机，且知道库存如下：

```js
var goods = {
  red: 3,
  blue: 6
}
```

我们有表单，下拉框选择颜色，输入购买数量，以及一个按钮显示"放入购物车"(库存不足显示库存不足)， HTML代码:

```html
<body>
  选择颜色： <select id="colorSelect">
    <option value="">请选择</option>
    <option value="blue">blue</option>
    <option value="red">red</option>
  </select>
  输入购买数量： <input type="number" id="numInput">
  <hr>
  您选择了颜色： <div id="colorInfo"></div><br/>
  您输入了数量： <div id="numInfo"></div><br/>
  <button id="btn" disabled="true">情选择手机颜色和购买数量</button>
</body>
```

接下来编写js代码，完成相应的功能。包括了动态给div复制innerHTML、判断按钮状态、数据的合法性判断等。

```js
// 下拉框
var colorSelect = document.getElementById("colorSelect");
// 数字输入框
var numberInput = document.getElementById("numberInput");
// 颜色div
var colorInfo = document.getElementById("colorInfo");
// 数量div
var numberInfo = document.getElementById("numberInfo");
// 按钮
var btn = document.getElementById("btn");

var goods = {
  red: 3,
  blue: 5
}
// 下拉框改变事件
colorSelect.onchange = function() {
  // 获取选中的值
  var color = this.value,
      number = numberInput.value,
      stock = goods[color];
  colorInfo.innerHTML = color;
  if(!color){
    // ...没颜色逻辑
  }
  if( ((number - 0) | 0) !== number - 0 ){
    // ...不是正整数逻辑
  } 
  if(number > stock){
    // 选择数量超过库存量逻辑
  }
  btn.disabled = false
  btn.innerHTML = '加入购物车'
}
// 数字input改变事件
numberInput.onchange = function() {
  var color = colorSelect.value,
      number = this.value,
      stock = goods[color];
  numberInfo.innerHTML = number;
  if(!color){
    // ...没颜色逻辑
  }
  if( ((number - 0) | 0) !== number - 0 ){
    // ...不是正整数逻辑
  } 
  if(number > stock){
    // 选择数量超过库存量逻辑
  }
}
```

## 14.3 引入中介者

上述太过冗余，如果说现在手机商品新增了内存属性、新增了LED和liquid屏幕等属性，又需要继续不停的书写相似的代码。

引入中介者! html事件只负责通知中介者被改变了，并将自身当做参数传递中介者，让中介者知道自己的客户(操作者)是谁。 剩下事情交给中介者。

```js

var goods = {
  "red|32G": 3,
  "red|64G": 5,
  "blue|32G": 2,
  "blue|64G": 8
}

var mediator = (function(){
  // 保存所有表单、div对象
  var colorSelect = document.getElementById("colorSelect"),
      memorySelect = document.getElementById("memorySelect"),
      numberInput = document.getElementById("numberInput"),
      colorInfo = document.getElementById("colorInfo"),
      numberInfo = document.getElementById("numberInfo"),
      memoryInfo = document.getElementById("memoryInfo"),
      btn = document.getElementById("btn");
  return {
    changed(obj){
      var color = colorSelect.value,
          memory = memorySelect.value,
          number = numberInput.value,
          stock = goods[color + "|" + memory];
      if(obj === colorSelect){
        colorInfo.innerHTML = color;
      }else if(obj === memorySelect){
        memoryInfo.innerHTML = memory;
      }else if(obj === numberInput){
        numberInfo.innerHTML = number;
      }
      if(!color){/** */}
      if(!memory){/** */}
      if(((number - 0) | 0) !== number - 0){/** */}
      btn.disabled = false
      btn.innerHTML = '加入购物车'
    }
  }
})()

colorSelect.onchange = function(){
  mediator.changed(this)
}
memorySelect.onchange = function(){
  mediator.changed(this)
}
```

# 十五、装饰者模式(第十二种)

在传统面向对象的语言中，给对象增加功能常常使用继承的方式，但是继承不太灵活，还会带来很多问题。一方面超类和子类之间存在强耦合，当超类改变的时候，子类也会改变。 另一方面继承这种复用方式，称之为"白箱复用"。 白箱是相对可见性而言的。 在继承中，超类内部细节对于子类开放，继承常常被认为是破坏了封装性。

装饰者模式可以在不改变对象的基础上，在程序运行期间给对象动态添加职责。 而这种**给对象动态增加职责的方式称之为装饰者模式**。

## 15.1 js的装饰者

```js
var plane = {
  fire(){
    console.log('发射子弹');
  }
}
var missileDecorator = function(){
    console.log('发射导弹');
}
var atomicBombDecorator = function(){
    console.log('发射原子弹');
}
var fire1 = plane.fire;
plane.fire = function(){
  fire1()
  // 装饰第一次
  missileDecorator()
}
var fire2 = plane.fire;
plane.fire = function(){
  fire2()
  // 装饰第二次
  atomicBombDecorator()
}
```

## 15.2 AOP装饰函数

以上代码不止会有this被劫持问题、还会有如果装饰功能、次数过多。 使用AOP来做一个完美的函数动态增加功能。

首先是`Function.prototype.before`和`Function.prototype.after`方法。

```js
Function.prototype.before = function(beforeCb){
  // 保留原函数的this指向
  var _this = this;
  return function(){
    // 调用前函数
    beforeCb.apply(this, arguments);
    // 调用原函数， 返回原函数的返回值
    return _this.apply(this, arguments);
  }
}
Function.prototype.after = function(afterCb){
  // 保留原函数的this指向
  var _this = this;
  return function(){
    // 调用原函数， 保存原函数的返回值
    var ret = _this.apply(this, arguments);
    // 调用后函数
    afterCb.apply(this, arguments);
    return ret
  }
}
document.getElementById = document.getElementById.before(function(id){
  console.log('before');
}).after(function(id){
  console.log('after');
})
var btn = document.getElementById('btn')
```

# 十六、状态模式(第十三种)

状态模式是一种非同寻常的优秀模式，也是解决某些需求场景的最好方法。虽然状态模式并不是一种简单到一目了然的模式(往往还会带来代码量的增加)，但是明白了状态模式精髓，一定会发现他无与伦比的好处。

定义是： **允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。**

## 16.1 初识状态模式-反例

想象一个电灯，电灯上面只有一个开关。 当电灯开着的时候，按下开关则切换到关闭状态。当电灯关闭的时候，按下开关则切换到开启状态。

编写代码如下：

```js
class Light {
  constructor(){
    // 电灯初始状态
    this.state = 'off'
    this.button = null
  }
  init(){
    var button = document.createElement('button')
    var self = this
    button.innerHTML = '开关'
    this.button = document.body.appendChild(button)
    this.button.onclick = function(){
      self.buttonWasPressed()
    }
  }
  buttonWasPressed(){
    if(state == 'off'){
      this.state = 'on'
    }else if(state == 'on'){
      this.state = 'off'
    }
  }
}
```

---

可是如果出现高级开关，第一次按为打开弱光、第二次为强光、第三次为关闭，那么就需要修改按钮代码。

```js
buttonWasPressed(){
    if(state == 'off'){
      this.state = 'weakLight'
    }else if(state == 'weakLight'){
      this.state = 'strongLight'
    }else if(state == 'strongLight'){
      this.state = 'off'
    }
  }
```

上面的反例有很多缺点：

1. buttonWasPressed函数违反了开放-封闭原则，每次新增light状态都需要改动代码
2. 所有跟状态有关的行为，都被封装在一个函数内，以后继续增加状态超级强光、极光。这还只是示例，实际的代码会庞大的多
3. 状态切换不明显，只是赋值state而已
4. 状态切换的if..else，或者switch语句都不明显，难以阅读和维护。

## 16.2 状态模式改进重构

```js
var FSM = {
  off: {
    buttonWasPressed: function(){
      console.log("弱光")
      this.curState = FSM.weak
    }
  },
  weak: {
    buttonWasPressed: function(){
      console.log('强光')
      this.curState = FSM.strong
    }
  },
  strong: {
    buttonWasPressed: function(){
      console.log('关灯')
      this.curState = FSM.off
    }
  }
}

class Light {
  constructor(){
    this.curState = FSM.off
    this.button = null
  }
  init(){
    var button = document.createElement('button')
    var self = this 
    this.button = document.body.appendChild(button)
    this.button.onclick = function(){
      self.curState.buttonWasPressed(self)
    }
  }
}
```

# 十七、适配器模式(第十四种)

适配器模式作用是解决两个软件实体间的接口不兼容的问题。 适配器的别名是包装器(wrapper)，是相对简单的模式。

## 17.1 适配器例子

渲染广东省地图，我们拿到了第三方资源的所有城市及ID，并成功渲染：

```js
var getCity = function(){
  var gdCity = [
    {name: 'shenzhen', id: 1},
    {name: 'dongguan', id: 2}
  ]
  return gdCity
}

var render = function(fn){
  console.log('开始渲染广东地图')
  const res = fn()
  document.write(JSON.stringify(res))
}
render(getCity)
```

---

但是这些数据太过老旧，我们另外找到了一些数据，但是数据结构发生了变化，除了大动干戈的重写渲染代码，可以新增一个数据格式转换适配器。

```js
// 新的数据
var newAllCity = {
  shenzhen: 11,
  dongguan: 22,
  zhuhai: 13
}
// 适配器函数
var addressAdapter = function(fn){
  var address = {},
      oldAddress = fn();
    for( var i = 0, c; c = oldAddress[i++];){
      address[c.name] = c.id
    }
    address = {
      ...address,
      ...newAllCity
    }
    return function(){
      return address
    }
}
render(addressAdapter(getCity))
```

# 十八、设计原则和编程技巧

## 18.1 单一职责原则(SRP)

单一职责原则的职责被定义为： 引起变化的原因。 如果我们有两个动机去修改一个方法，那么就有两个职责。

SRP的体现为： 一个对象(方法)只做一件事情。

优点是： 降低单个类、对象、方法的复杂度，利于代码复用、单元测试。

缺点是： 增加代码复杂度，相互链接的困难度。

## 18.2 最少知识原则(LKP)

最少知识原则说的是 一个软件实体应当尽可能少的与其他实体发生互相作用。

## 18.3 开放-封闭原则(OCP)

开放-封闭原则最早有Efiiel语言设计者在著作《Object-Oriented Software Construction》定义：**软件实体等应该是可以扩展的，但是不可以修改的**

# 十九、重构代码

重构代码的一些要素，大致11种。

1. 提炼函数
2. 合并重复的条件片段
3. 条件分支语句提炼为函数
4. 合理使用循环
5. 提前让函数退出代替嵌套条件分支
6. 对象参数代替过长的参数列表(小心undefined)
7. 尽量减少参数数量
8. 少用三目运算符
9. 合理使用链式
10. 分解大型类
11. return退出多重循环