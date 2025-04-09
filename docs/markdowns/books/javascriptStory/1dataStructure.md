# 栈

数组可以再任意位置上删除或添加元素，有时候，需要一种添加或删除元素时更加可控，有两种类似数组的数据结构：栈和队列。

## 栈概念

栈是一种遵从**后进先出（LIFO）原则**的**有序**集合。新添加或待删除的元素都保存在**栈的同一端**，称作**栈顶**，另一端就叫**栈底**。

在栈里，**新元素都靠近栈顶**，旧元素都接近栈底。

栈使用的例子如；餐厅叠放的盘子、一摞书。

在编程中，栈被用在编程语言的编译器、内存中保存变量、方法调用，浏览器历史记录(返回按钮)

## 栈结构

### 1. 简单的栈

```js
class Stack {
    items: any[]
    constructor(){
      this.items = []
    }
    // 推入栈
    push(element:any){
      this.items.push(element)
    }
    // 弹出栈
    pop(){
      return this.items.pop()
    }
    // 查看栈顶元素
    peek(){
      return this.items[this.items.length-1]
    }
    // 判断栈是否为空
    isEmpty(){
      return this.items.length === 0
    }
    // 栈的大小
    size(){
      return this.items.length
    }
  }
```

### 2. js对象栈

使用数组创建栈，大部分方法时间复杂度为O(n), 且数组是有序集合，意味着会占用更多内存空间。

使用对象创建栈，时间复杂度为O(1), 保证元素也是有序排列，占用内存空间少。

```js
class Stack {
  items: Titem
  count: number
  constructor(){
    this.items = {}
    this.count = 0
  }
  push(el:any){
    this.items[this.count] = el
    this.count++
  }
  empty(){
    return this.count === 0
  }
  size(){
    return this.count
  }
  pop(){
    // 是否为空栈
    if(this.empty())return
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  peek(){
    if(this.empty())return
    return this.items[this.count-1]
  }
  clear(){
    this.items = {}
    this.count = 0
  }
  toString(){
    if(this.empty())return ''
    let ObjString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      ObjString = `${ObjString}, ${this.items[i]}`      
    }
    return ObjString
  }
 }
```

# 队列与双端队列

## 队列概念

队列是遵循**先进先出（FIFO，也称为先来先服务）原则**的一组有序的项。队列在**尾部**添加**新元素**，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

队列的例子如：排队买票、打印文件。

## 队列结构

```js
class Queue {
  constructor() {
    // 存储队列元素
    this.items = {}
    // 控制队列长度
    this.count = 0
    // 记录第一个元素
    this.lowestCount = 0
  }
  // 队列大小
  size() {
    return this.count - this.lowestCount
  }
  // 判断队列为空
  isEmpty() {
    return this.size() === 0
  }
  // 添加新元素到队列的尾部
  enqueue(element: object) {
    this.items[this.count] = element
    this.count++
  }
  // 移出队列
  dequeue(){
    if(this.isEmpty())return
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }
  // 返回队列第一个元素
  peek(){
    if(this.isEmpty())return
    return this.items[this.lowestCount]
  }
  // 清空队列
  clear(){
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }
  // 打印方法
  toString(){
    if(this.isEmpty())return ''
    let objString = `${this.items[this.lowestCount]}`
    for(let i = this.lowestCount + 1; i < this.count; i++){
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}
```

## 双端队列概念

双端队列(deque，或称 double-ended queue)是一种允许同时从前端和后端添加、移除的特殊队列。

双端队列的例子如： 一个刚买了票的人如果忘了付钱，就可以直接回到队伍的头部。另外，在队伍末尾的人赶时间，他可以直接离开队伍。

计算机科学中： 用户进行了一个操作，该操作会被存在一个双端队列中（就像在一个栈里）。当用户点击撤销按钮时，该操作会被从双端队列中弹出，表示它被从后面移除了。

## 双端队列结构

双端队列是一种特殊队列，所以部分方法如`isEmpty`、`size`、`clear`、`toString`与队列相同。

```js
type TItem = {
  [key: number]: object
}
class Deque {
  items: TItem
  count: number
  lowestCount: number
  constructor() {
    // 存储队列元素
    this.items = {}
    // 控制队列长度
    this.count = 0
    // 记录第一个元素
    this.lowestCount = 0
  }
  // 队列大小
  size() {
    return this.count - this.lowestCount
  }
  // 判断队列为空
  isEmpty() {
    return this.size() === 0
  }
  // 清空队列
  clear(){
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }
  // 打印方法
  toString(){
    if(this.isEmpty())return ''
    let objString = `${this.items[this.lowestCount]}`
    for(let i = this.lowestCount + 1; i < this.count; i++){
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
  // 前端添加新的元素
  addFront(element: any){
    // 如果为空，后端添加
    if(this.isEmpty()){
      this.addBack(element)
      return
    }
    // 如果队列已经移出过某些元素，当前最前端元素的序列>0， 直接放在最前端之前。
    if(this.lowestCount > 0){
      this.lowestCount--
      this.items[this.lowestCount] = element
      return
    }
    for(let i = this.count; i > 0; i--){
      this.items[i] = this.items[i - 1]
    }
    // 
    this.count++
    this.lowestCount = 0
    this.items[this.lowestCount] = element
  }
  // 后端添加新的元素(与Queue队列的enqueue方法相同)
  addBack(element: any){
    this.items[this.count] = element
    this.count++
  }
  // 与Queue 队列的dequeue方法相同
  removeFront(){
    if(this.isEmpty())return
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }
  // 与Stack pop方法相同
  removeBack(){
    if(this.isEmpty())return
    this.count--
    const result = this.items[this.count]  
    delete this.items[this.count]
    return result  
  }
  // 与Queue peek方法相同
  peekFront(){
    if(this.isEmpty())return
    return this.items[this.lowestCount]
  }
  // 与Stack peek方法相同
  peekBack(){
    if(this.isEmpty())return
    return this.items[this.count - 1]
  }
}
```

## 使用队列/双端队列来解决问题

### 1. 循环队列-击鼓传花

队列经常被应用在计算机领域和我们的现实生活，出现了一些队列的修改版本，其中的一种叫作**循环队列**。

循环队列一个例子就是击鼓传花：孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就退出圆圈、结束游戏。重复这个过程，直到只剩一个孩子（胜者）.

```js
function hotPotato(elementList, num){
  const queue = new Queue()
  // 淘汰者列表
  const eliminatorList = []
  // 参加游戏者进入队列
  for(let i = 0; i < elementList.length; i++){
    queue.enqueue(elementList[i])
  }
  while (queue.size() > 1) {
    // 传花开始
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    // 传花结束 淘汰一人
    eliminatorList.push(queue.dequeue())
  }
  return {
    // 胜者出列!
    winner: queue.dequeue(),
    // 淘汰者出列
    eliminatorList
  }
}
const res = hotPotato(['John', 'Jack', 'Camila', 'Ingrid', 'Carl'], 9)
console.log(res)
```

### 2. 回文检查器

回文检查器也是可以直接使用双端队列简单处理。

```js
function palindromeChecker(aString){
  if(!aString || (aString !== null && aString.length === 0)){
    return false
  }
  const deque = new Deque()
  const lowerString = aString.toLocaleLowerCase().split(' ').join('')
  let isEqual = true
  let firstChar, lastChar;
  // 填充队列
  for(let i = 0; i < lowerString.length; i++){
    deque.addBack(lowerString.charAt(i))
  }
  // 当队列长度大于1, 且循环当前轮次为回文
  while(deque.size() > 1 && isEqual){
    // 首部元素
    firstChar = deque.removeFront()
    // 尾部元素
    lastChar = deque.removeBack()
    if(firstChar !== lastChar){
      isEqual = false
    }
  }
}
```

# 链表

存储有序元素的集合，使用数组的方式存储，但是数组的缺点是插入和删除元素非常慢，因为数组的元素位置需要移动。

**链表**存储有序的元素集合，不同于数组的是，元素在内存中不是连续放置，每个元素包含了自身的节点和一个指向下一元素的引用(指针、链接)组成。

链表的例子：一列火车由一系列车厢组成，很容易分离车厢，改变位置、添加、删除它。

## 链表结构

```js
// 工具类，创建链表节点
class Node {
    constructor(element) {
        // 保存节点
        this.element = element
        // 下一节点指向默认为null
        this.next = null
    }
}
// 工具函数， 比较相等的
function defaultEquals(a, b) {
    return a === b
}
/**
 * 链表类
 * push: 尾增
 * insert: 特定位置插入
 * getElementAt: 获取元素索引
 * remove: 链表移除一个元素
 * indexOf 返回元素在链表索引
 * removeAt: 移除元素
 * isEmpty: 链表是否为空
 * size: 获取链表长度
 * toString: 输出链表
 */
class LinkedList {
    constructor(equalsFn = defaultEquals) {
        // 链表长度
        this.count = 0
        // 首部元素的指向
        this.head = undefined
        // 比较相等方法
        this.equalsFn = equalsFn
    }
    // 创建循环迭代到目标位置
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head
            for (let i = 0; i < index && current != null; i++) {
                current = current.next
            }
            return current
        }
        return undefined
    }
    // 尾部增加元素
    push(element) {
        const node = new Node(element)
        let current
        // 如果链表为空 直接设置
        if (this.head == null) {
            this.head = node
        } else {
            current = this.head
            // 从第一项一直找到最后一项插入
            while (current.next != null) {
                current = current.next
            }
            current.node = node
        }
        // 链表长度增加
        this.count++
    }
    // 移除元素【索引移除】
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            // 移除元素默认为首部元素
            let current = this.head
            if (index === 0) {
                // 要首删，直接设置顶部元素为第二个元素
                this.head = current.next
            } else {
                let previous
                // 循环到index要删除元素， 设置前一位元素的next为后一位元素
                for (let i = 0; i < index; i++) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
            }
            this.count--
            return current.element
        }
        return undefined
    }
    // 重构移除元素
    removeAt2(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head
            if (index === 0) {
                this.head = current.next
            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            this.count--
            return current.element
        }
        return undefined
    }
    // 任意位置插入元素
    insert(index, element){
        if(index >= 0 && index <= this.count){
            const node = new Node(element)
            if(index === 0){
                const current = this.head
                node.next = current
                this.head = node
            }else {
                const previous = this.getElementAt(index - 1)
                const current = previous.next
                previous.next = node
                node.next = current
            }
            this.count++
            return true
        }
        return false
    }
    // 获取元素索引
    indexOf(element){
        let current = this.head
        for(let i = 0; i < this.count && current != null; i++){
            if(this.equalsFn(element, current.element)){
                return i
            }
            current = current.next
        }
        return -1
    }

    // 移除元素
    remove(element) {
        const index = this.indexOf(element)
        return this.removeAt2(index)
    }
    size() {
        return this.count
    }
    // 链表是否为空
    isEmpty() {
        return this.size() === 0
    }
    getHead() {
        return this.head
    }
    toString(){
        if(this.head == null){
            return ''
        }
        let objString = `${this.head.element}`
        let current = this.head.next
        for(let i = 1; i < this.size() && current != null; i++){
            objString = `${objString},${current.element}`
            current = current.next
        }
        return objString
    }
}
```

## 双向链表

链表有多种类型，双向链表的引用(指针)是双向的，有指向上一个元素的，也有指向下一个元素的。

### 结构代码

重写insert方法，控制next和prev的指向。

```js
class DoublyNode extends Node {
    constructor(element, next, prev) {
        super(element, next)
        this.prev = prev
    }
}

class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals){
        super(equalsFn)
        // 最后一个元素的指针
        this.tail = undefined
    }
    insert(index, element) {
        if(index >= 0 && index <= this.count){
            const node = new DoublyNode(element)
            let current = this.head
            // 首增
            if(index === 0){
                // 空链表
                if(this.head == null){
                    this.head = node
                    this.tail = node
                }else {
                    node.next = this.head
                    current.prev = node
                    this.head = node
                }
                // 尾增
            }else if(index === this.count){
                current = this.tail
                current.next = node
                node.prev = current 
                this.tail = node
            }else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                node.next = current
                previous.next = node
                current.prev = node
                node.prev = previous                
            }
            this.count++
            return true
        }
        return false
    }
    removeAt(index) {
        if(index >= 0 && index < this.count){
            let current = this.head
            // 首删
            if(index === 0){
                this.head = current.next
                // 只有一项
                if(this.count === 0){
                    this.tail = undefined
                }else {
                    this.head.prev = undefined
                }
                // 尾删
            }else if(index === this.count - 1){
                current = this.tail
                this.tail = current.prev
                this.tail.next = undefined
                // 中间删
            }else {
                current = this.getElementAt(index)
                const previous = current.prev
                previous.next = current.next
                current.next.prev = previous
            }
            this.count--
            return current.element
        }
        return undefined
    }
}
```

## 循环链表

循环链表与链表的区别在于， 最后一个元素的next(`tail.next`)指向的是第一个元素(`head`)

**双向循环链表**则是由指向`head`元素的`tail.next`和指向`tail`的`head.prev`

### 结构代码

```js
class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
    }
    // 重写任意位置插入元素
    insert(element, index) {
        if(index >= 0 && index <= this.count){
            const node = new Node(element)
            let current = this.head
            // 首增
            if(index === 0){
                // 空链表
                if(this.head == null){
                    this.head = node
                    node.next = this.head
                }else {
                    // 链表非空
                    node.next = current
                    current = this.getElementAt(this.size())
                    this.head = node
                    current.next = this.head
                }
            }else {
                const previous = this.getElementAt(index - 1)
                node.next = previous.next
                previous.next = node
            }
            this.count++
            return true
        }
        return false
    }
    // 重写移除元素
    removeAt(index) {
        if(index >= 0 && index < this.count){
            let current = this.head
            // 移除首元素
            if(index === 0){
                if(this.size() === 1){
                    this.head = undefined
                }else {
                    const removed = this.head
                    current = this.getElementAt(this.size())
                    this.head = this.head.next
                    current.next = this.head
                    current = removed
                }
            }else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            this.count--
            return current.element
        }
        return undefined
    }
}
```

## 有序链表

有序链表是保持元素有序的链表结构，除了使用**排序算法**之外，还可以将**元素插入到正确位置**来保证有序性。

### 结构代码

```js
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
}

function defaultCompare(a, b){
    if(a === b)return 0
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare){
        super(equalsFn)
        this.compareFn = compareFn
    }
    getIndexNextSortedElement(element){
        let current = this.head
        for(let i = 0; i < this.size() && current; i++){
            const comp = defaultCompare(element, current.element)
            if(comp === Compare.LESS_THAN){
                return i
            }
            current = current.next
        }
        return i
    }
    insert(element, index = 0){
        if(this.isEmpty()){
            return super.insert(element, 0)
        }
        const pos = this.getIndexNextSortedElement(element)
        return super.insert(element, pos)
    }
}
```

# 栈-链表

可以使用链表`LinkedList`及其变种数据结构来创建其他的数据结构。

下面是一个使用链表来创建栈数据结构

```js
class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList(); // {1}
    }
    push(element) {
        this.items.push(element); // {2}
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.removeAt(this.size() - 1); // {3}
    }
}
```

# 集合

集合是一组无序且唯一的项组成。

ES6中Set类就是一种集合，我们自己创建Set类，额外提供交集、并集、差集此类运算

## 集合类代码

使用对象存储数据，添加add、delete、has、clear、size、values方法。

```js
class Set {
    constructor() {
        this.items = {}
    }
     // 是否存在
    has(element){
        // 仅对象字面量存在
        return  Object.prototype.hasOwnProperty.call(this.items, element)
        // 原型链是否存在
        return element in items
    }
    // 添加元素
    add(element){
        if(!this.has(element)){
            this.items[element] = element
            return true
        }
        return false
    }
    // 删除元素
    delete(element){
        if(this.has(element)){
            delete this.items[element]
            return true
        }
        return false
    }
    // 清除集合
    clear(){
        this.items = {}
    }
    // 元素数量
    size(){
        return Object.keys(this.items).length
    }
    // 集合转数组
    values(){
        return Object.values(this.items)
    }
}
```

## 集合运算

写入并集、交集、差集、子集等方法

```js
class Set {
    constructor() {
        this.items = {}
    }
     // 是否存在
    has(element){
        // 仅对象字面量存在
        return  Object.prototype.hasOwnProperty.call(this.items, element)
        // 原型链是否存在
        return element in items
    }
    // 添加元素
    add(element){
        if(!this.has(element)){
            this.items[element] = element
            return true
        }
        return false
    }
    // 删除元素
    delete(element){
        if(this.has(element)){
            delete this.items[element]
            return true
        }
        return false
    }
    // 清除集合
    clear(){
        this.items = {}
    }
    // 元素数量
    size(){
        return Object.keys(this.items).length
    }
    // 集合转数组
    values(){
        return Object.values(this.items)
    }
    // 并集
    union(otherSet){
        const unionSet = new Set()
        this.values().forEach(value => unionSet.add(value))
        otherSet.values().forEach(value => unionSet.add(value))
        return unionSet
    }
    // 交集
    intersection(otherSet){
        const intersectionSet = new Set()
        const values = this.values()
        for(let i = 0; i < values.length; i++){
            if(otherSet.has(values[i])){
                intersectionSet.add(values[i])
            }
        }
        return intersectionSet
    }
    // 差集
    difference(otherSet){
        const differenceSet = new Set()
        this.values().forEach(value => {
            if(!otherSet.has(value)){
                differenceSet.add(value)
            }
        })
        return differenceSet
    }
    // 子集
    isSubsetOf(otherSet){
        if(this.size() > otherSet.size()){
            return false
        }
        let isSubset = true
        this.values().every(value => {
            if(!otherSet.has(value)){
                isSubset = false
                return false
            }
            return true
        })
        return isSubset
    }
}
```

## ES6的Set类

ES6原生set就是一个集合，但是并没有提供交集、并集等方法。

可以模拟下这些集合方法。

```js
const setV = new Set()
setV.add('a')
setV.add('a')
setV.add('c')
const setVV = new Set()
setVV.add('b')
setVV.add('b')
setVV.add('E')
// 并集
const union = (setA, setB) =>{
    const unionAb = new Set([...setA, ...setB])
    return unionAb
}

// 交集
const intersection = (setA, setB) =>{
    const intersectionSet = new Set()
    setA.forEach(item => {
        if(setB.has(item)){
            intersectionSet.add(item)
        }
    })
    return intersectionSet
}

// 差集
const difference = (setA, setB) =>{
    const differenceSet = new Set()
    setA.forEach(item => {
        if(!setB.has(item)){
            differenceSet.add(item)
        }
    })
    return differenceSet
}
```

# 字典

字典存储[键,值]， 其中键名用来查询特定元素。 

字典也被称为映射、符号表、关联数组。

字典例子有： chrome|开发者工具的 memory标签，执行快照，可以看到内存的对象及对用地址引用(`@<数>`)

## 代码结构

字典的方法则有：

- `set` 添加元素
- `remove` 删除元素
- `hasKey` 是否存在
- `get` 获取元素
- `clear` 清空字典
- `size` 字典大小
- `keys` 获取键
- `values` 获取值
- `keyValues` 获取键值对
- `forEach` 遍历字典
- `isEmpty` 是否为空

代码如下：

```js
// 保证键名为字符串
function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class ValuePair{
    constructor(key, value){
        this.key = key;
        this.value = value;
    }
    toString(){
        return `[#${this.key}: ${this.value}]`;
    }
}

class Dictionary {
    constructor(toStrFn = defaultToString) {
      this.toStrFn = toStrFn;
      this.table = {};
    }
    hasKey(key){
        return this.table[this.toStrFn(key)] != null;
    }
    set(key, value){
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false
    }
    remove(key){
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false
    }
    get(key){
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    // 返回所有valuePair对象
    keyValues(){
        return Object.values(this.table);
    }
    keys(){
        return this.keyValues().map(valuePair => valuePair.key);
    }
    values(){
        return this.keyValues().map(valuePair => valuePair.value);
    }
    size(){
        return Object.keys(this.table).length;
    }
    isEmpty(){
        return this.size() === 0;
    }
    clear(){
        this.table = {};
    }
    toString(){
        if (this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`;
        }
        return objString;
    }
    forEach(callbackFn){
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
    }
}

// 使用:
const dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');
console.log(dictionary.hasKey('Gandalf'));
console.log(dictionary.size())
```

## 散列表

本节会创建HashTable类，也叫做HashMap类。 是Dictionary类的散列表实现方式。

散列算法是尽可能快的在数据结构找到一个值。 之前查找值都是需要迭代整个数据结构找到它， 散列函数可以快速索引。

### 散列表代码结构

```js
// 保证键名为字符串
function defaultToString(item) {
    if (item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}

class ValuePair{
    constructor(key, value){
        this.key = key;
        this.value = value;
    }
    toString(){
        return `[#${this.key}: ${this.value}]`;
    }
}

class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {}
    }
    // 散列函数
    loseloseHashCode(key){
        if(typeof key === 'number'){
            return key
        }
        const tableKey = this.toStrFn(key)
        let hash = 0
        // ASCII码转化为
        for(let i = 0; i < tableKey.length; i++){
            hash += tableKey.charCodeAt(i)
        }
        // 规避操作数超过最大安全范围
        return hash % 37
    }
    hashCode(key){
        return this.loseloseHashCode(key)
    }
    put(key, value){
        if(key !== null && value !== null){
            const position = this.hashCode(key)
            this.table[position] = new ValuePair(key, value)
            return true
        }
        return false
    }
    get(key){
        const valuePair = this.table[this.hashCode(key)]
        return valuePair ? valuePair.value : undefined
    }
    remove(key){
        const hash = this.hashCode(key)
        const valuePair = this.table[hash]
        if(valuePair !== null){
            delete this.table[hash]
            return true
        }
        return false
    }
    size(){
        return Object.keys(this.table).length
    }
    isEmpty(){
        return this.size() === 0
    }
    toString(){
        if(this.isEmpty()){
            return '';
        }
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
        for (let i = 1; i < keys.length; i++) {
            objString = `{${objString}, ${keys[i]} => ${this.table[keys[i]].toString()}}`;
        }
        return objString;
    }
}

// 使用
const hash1 = new HashTable()
hash1.put('Gandalf', 'gandalf@email.com')
hash1.put('John', 'johnsnow@email.com')
hash1.put('Tyrion', 'tyrion@email.com')
console.log(hash1.get('Gandalf')) // gandalf@email.com
console.log(hash1.hashCode('Gandalf')) // 19
```

### 散列表和散列集合

在一些编程语言中，还有散列集合的实现。

散列集合是一个集合，但是插入、删除、获取都是使用hashCode函数。

### 散列表冲突

有时候， 一些键有相同散列值。 不同的值在表中对应相同位置，我们称之为冲突。

查看以下代码：

```js
const hash = new HashTable();
hash.put('Ygritte', 'ygritte@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Jack', 'jack@email.com');
hash.put('Jasmine', 'jasmine@email.com');
hash.put('Jake', 'jake@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.put('Athelstan', 'athelstan@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Aethelwulf', 'aethelwulf@email.com')
hash.put('Sargeras', 'sargeras@email.com'); 

console.log(hash.toString())
// {4 => [#Ygritte: ygritte@email.com]}, 
// {5 => [#Aethelwulf: aethelwulf@email.com]} 
// {7 => [#Athelstan: athelstan@email.com]} 
// {8 => [#Jasmine: jasmine@email.com]} 
// {9 => [#Jake: jake@email.com]} 
// {10 => [#Sargeras: sargeras@email.com}]}
```

散列函数的冲突解决方案：

- 分离链接
- 线性探查

只需要重写put、get、remove方法即可。

#### 1. 分离链接

在散列表的位置上创建一个**链表**，将元素存储在里面。

```js
class HashTableSeparateChaining {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    put(key, value){
        if(key !== null && value !== null){
            const position = this.hashCode(key);
            if(this.table[position] == null){
                this.table[position] = new LinkedList();
            }
            this.table[position].push(new ValuePair(key, value));
            return true;
        }
        return false;
    }
    get(key){
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if(linkedList !== null && !linkedList.isEmpty()){
            let current = linkedList.getHead();
            while(current != null){
                if(current.element.key === key){
                    return current.element.value;
                }
                current = current.next;
            }
        }
        return undefined;
    }
    remove(key){
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if(linkedList !== null && !linkedList.isEmpty()){
            let current = linkedList.getHead();
            while(current != null){
                if(current.element.key === key){
                    linkedList.remove(current.element);
                    if(linkedList.isEmpty()){
                        delete this.table[position];
                    }
                    return true;
                }
                current = current.next;
            }
        }
        return false
    }
}
```

#### 2. 线性查探

线性查探是添加元素时如果位置被占则往后找一个空位置。 如果移除元素了，线性探查有两种方法解决：

1. 软删除： 设置一个标识符，当元素被删除时，标识符设置为true，当元素被添加时，标识符设置为false。
2. 校验是否有必要移动到之前位置。

#### 4. 不如更换散列函数

```js
djb2HashCode(key) {
  const tableKey = this.toStrFn(key); // {1}
  let hash = 5381; // {2}
  for (let i = 0; i < tableKey.length; i++) { // {3}
    hash = (hash * 33) + tableKey.charCodeAt(i); // {4}
  }
  return hash % 1013; // {5}
} 
```

## Map类

Es6提供了Map类，可以基于Map类来开发Dictionary类。

## WeakMap

WeakMap类是Map类的一种变体，它与Map类不同之处在于：

- WeakMap的键只能是对象。
- WeakMap没有entries、keys、values方法。只能通过键来获取值。

# 递归

## 斐波那契数列

斐波那契数列：是一个由 0 1 1 2 3 5 8 13 21 34... 组成的数列。

初始版本如下：

```js
function fibonacciIterative(n){
    if(n < 1)return 0
    if(n <= 2)return 1
    let initPrevP = 0
    let initPrev = 1
    let fibN = n
    for(let i = 2; i <= n; i++){
        fibN = initPrev + initPrevP
        initPrevP = initPrev
        initPrev = fibN
    }
    console.log("🚀🚀 ~ fibonacciIterative ~ fibN:", fibN)
    return fibN
}
```

递归版本如下：

```js
function fibonacciIterative(n){
    if(n < 1)return 0
    if(n <= 2)return 1
    return fibonacciIterative(n - 1) + fibonacciIterative(n - 2)
}
// 记忆化版
function fibonacciIterative(n){
    const memo = [0, 1]
    const fibonacci = n => {
        if(memo[n] != null) return memo[n]
        return memo[n] = fibonacci(n - 1) + fibonacci(n - 2)
    }
    return fibonacci(n)
}
```

# 树

树是一种非顺序数据结构， 对于存储需要快速查找数据非常有用。

树例子现实中最常见的就是： 家谱、公司组织架构

## 相关术语

- **根节点**：位于树顶部的节点， 没有父节点
- **内部节点**：至少有一个节点的节点
- **外部节点**或**叶节点**： 没有子节点的节点
- **子树**：节点和它的后代构成
- **深度属性**:节点有几个祖先节点
- **树高度**：所有节点深度的最大值

## 二叉树和二叉搜索树

**二叉树(BT)**节点最多只能由两个子节点，分别为左侧、右侧子节点。

**二叉搜索树(BST)**是二叉树的一种，**只允许在左侧存储比父节点小的值，在右侧存储比父节点大的值**。

## 二叉搜索树代码结构

```js
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
}

function defaultCompare(a, b){
    if(a === b)return 0
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

class Node {
    constructor(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(compareFn = defaultCompare){
        this.compareFn = compareFn;
        this.root = null;
    }
    insert(key){
        if(this.root == null){
            this.root = new Node(key);
        }else{
            this.insertNode(this.root, key);
        }
    }
    insertNode(node, key){
        if(this.compareFn(key, node.key) === Compare.LESS_THAN){
            if(node.left == null){
                node.left = new Node(key);
            }else{
                this.insertNode(node.left, key);
            }
        }else {
            if(node.right == null){
                node.right = new Node(key);
            }else{
                this.insertNode(node.right, key);
            }
        }
    }
    // 是否存在
    search(key){
        return this.searchNode(this.root, key)
    }
    searchNode(node, key){
        if(node == null){
            return false;
        }else{
            if(this.compareFn(key, node.key) === Compare.LESS_THAN){
                return this.searchNode(node.left, key);
            }else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN){
                return this.searchNode(node.right, key);
            }else{
               return true;
            }
        }
    }
    // 中序遍历
    inOrderTraverse(callback){
        this.inOrderTraverseNode(this.root, callback);
    }
    // 中序遍历方法: 从最小到最大顺序访问节点 
    inOrderTraverseNode(node, callback){
        if(node != null){
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    // 先序遍历
    preOrderTraverse(callback){
        this.preOrderTraverseNode(this.root, callback);
    }
    // 先序遍历方法: 从上到下 从左到右访问。
    // 应用为生成文档、打印结构化文档
    preOrderTraverseNode(node, callback){
        if(node != null){
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    // 后续遍历
    postOrderTraverse(callback){
        this.postOrderTraverseNode(this.root, callback);
    }
    // 后续遍历方法：计算目录及子目录空间大小
    postOrderTraverseNode(node, callback){
        if(node != null){
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    min(){
        return this.minNode(this.root);
    }
    minNode(node){
        let current = node;
        while(current.left != null){
            current = current.left;
        }
        return current
    }
    max(){ 
        return this.maxNode(this.root)
    }
    maxNode(node){
        let current = node;
        while(current.right != null){
            current = current.right;
        }
        return current
    }
    remove(key){
        this.root = this.removeNode(this.root, key)
    }
    removeNode(node, key){
        if(node == null)return null;
        // 如果查找的键比当前小 沿着树左边找到下一个节点
        if(this.compareFn(key, node.key) === Compare.LESS_THAN){
            node.left = this.removeNode(node.left, key);
            return node;
        // 如果查找的键比当前大， 沿着右边找到下一个节点
        }else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN){
            node.right = this.removeNode(node.right, key);
            return node;
        // 查找了整个键了
        }else {
            // 如果是叶节点
            if(node.left == null && node.right == null){
                node = null;
                return node;
            // 如果是单侧的内部节点
            }else if(node.left == null){
                node = node.right;
                return node;
            }else if(node.right == null){
                node = node.left;
                return node;
            }
            // 如果是双侧的内部节点
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }
}
```

## 自平衡树

二叉搜索树BST存在一个问题，取决于你添加的节点数， 如果树的一边特别深，而其他分支只有几层。 那么在添加、删除节点的时候，会有性能问题。 

为了解决这个问题， 有一种树叫做 Adelson-Velskii-Landi树(AVL树)， 是一种自平衡二叉搜索树。

### 1. 概念

AVL树是一种自平衡树。添加或移除节点时，AVL树会尝试保持自平衡。

任意一个节点（不论深度）的左子树和右子树高度最多相差 1。

添加或移除节点时，AVL树会尽可能尝试转换为完全树。

### 2. 代码结构

AVL是BST的一种，所以我们需要扩展BST类。 然后覆盖维持AVL平衡的方法，也就是： insert、insertNode、removeNode。

需要在重写方法内，校验AVL的平衡因子，如果匹配到需求会将逻辑应用于树的自平衡。

```js
class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn
        this.root = null
    }
    // 计算节点高度
    getNodeHeight(node) {
        if (node == null) return -1
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
    }
    getBalanceFactor(node) {
        const BalanceFactor = {
            UNBALANCED_RIGHT: 1,
            SLIGHTLY_UNBALANCED_RIGHT: 2,
            BALANCED: 3,
            SLIGHTLY_UNBALANCED_LEFT: 4,
            UNBALANCED_LEFT: 5
        }
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }
    // 左左旋转
    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }
    // 右右旋转
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }
    // 左右旋转
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }
    // 右左旋转
    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }
    insert(key) {
        this.root = this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        // BST插入节点
        if(node == null){
            return new Node(key)
        }else if(this.compareFn(key, node.key) === Compare.LESS_THAN){
            node = this.insertNode(node.left, key)
        }else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN){
            node = this.insertNode(node.right, key)
        }else {
            return node
        }
        // 检测是否需要平衡
        const balanceFactor = this.getBalanceFactor(node)
        if(balanceFactor === BalanceFactor.UNBALANCED_LEFT){
            if(this.compareFn(key, node.left.key) === Compare.LESS_THAN){
                node = this.rotationLL(node)
            }else {
                return this.rotationLR(node)
            }
        }
        if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT){
            if(this.compareFn(key, node.right.key) === Compare.BIGGER_THAN){
                node = this.rotationRR(node)
            }else {
                return this.rotationRL(node)
            }
        }
        return node
    }
    removeNode(node, key){
        node = super.removeNode(node, key)
        if(node == null) return node
        const balanceFactor = this.getBalanceFactor(node)
        if(balanceFactor === BalanceFactor.UNBALANCED_LEFT){
            const balanceFactorLeft = this.getBalanceFactor(node.left)
            if(balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT){
                return this.rotationLL(node)
            }
            if(balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT){
                return this.rotationLR(node)
            }
        }
        if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT){
            const balanceFactorRight = this.getBalanceFactor(node.right)
            if(balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT){
                return this.rotationRR(node)
            }
            if(balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT){
                return this.rotationRL(node)
            }
        }
        return node
    }
}
```

### 3. 红黑树

AVL是一种自平衡二叉搜索树，它只适用于多次插入和删除的自平衡树。

节点遵循以下规则：

1. 节点非红即黑
2. 根节点是黑节点
3. 叶子节点是黑节点
4. 红节点的子节点必须是黑节点
5. 不能有相邻的红节点，一个红节点不可能有红的父节点或者子节点。
6. 从根节点到每个叶子节点，经过的黑节点数量是相同的。

### 4. 红黑树代码结构

```js
const Colors = {
    RED: 0,
    BLACK: 1
}

class RedBlackNode extends Node {
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED; // {6}
        this.parent = null; // {7}
    }
    isRed() {
        return this.color === Colors.RED;
    }
}

class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }
    insert(key) {
        if (this.root == null) {
            this.root = new RedBlackNode(key)
            this.root.color = Colors.BLACK
        } else {
            const newNode = this.insertNode(this.root, key)
            this.fixTreeProperties(newNode)
        }
    }
    insertNode(node, key) {
        if(this.compareFn(node) === Compare.LESS_THAN){
            if(node.left == null){
                node.left = new RedBlackNode(key)
                node.left.parent = node
                return node.left
            }else {
                return this.insertNode(node.left, key)
            }
        }else if(node.right == null){
            node.right = new RedBlackNode(key)
            node.right.parent = node
            return node.right
        }else {
            return this.insertNode(node.right, key)
        }
    }
    fixTreeProperties(node) {
        while (node && node.parent && node.parent.isRed() && node.color !== Colors.BLACK) {
            let parent = node.parent
            const grandParent = parent.parent
            if (grandParent && grandParent.left === parent) {
                const uncle = grandParent.right
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED
                    parent.color = Colors.BLACK
                    uncle.color = Colors.BLACK
                    node = grandParent
                }else {
                    if(node === parent.right){
                        this.rotationRR(parent)
                        node = parent
                        parent = node.parent
                    }
                    this.rotationLL(grandParent)
                    parent.color = Colors.BLACK
                    grandParent.color = Colors.RED
                    node = parent
                }
            }else {
                const uncle = grandParent.left
                if(uncle && uncle.color === Colors.RED){
                    grandParent.color = Colors.RED
                    parent.color = Colors.BLACK
                    uncle.color = Colors.BLACK
                    node = grandParent
                }else {
                    if(node == parent.left){
                        this.rotationLL(parent)
                        node = parent
                        parent = node.parent
                    }
                    this.rotationRR(grandParent)
                    parent.color = Colors.BLACK
                    grandParent.color = Colors.RED
                    node = parent
                }
            }
        }
        this.root.color = Colors.BLACK
    }
    rotationLL(node){
        const temp = node.left
        node.left = temp.right
        if(temp.right && temp.right.parent){
            temp.right.parent = node
        }
        temp.parent = node.parent
        if(!node.parent){
            this.root = temp
        }else {
            if(node === node.parent.left){
                node.parent.left = temp
            }else {
                node.parent.right = temp
            }
        }
        temp.right = node
        node.parent = temp
    }
    rotationRR(node){
        const temp = node.right
        node.right = temp.left
        if(temp.left && temp.left.parent){
            temp.left.parent = node
        }
        temp.parent = node.parent
        if(!node.parent){
            this.root = temp
        }else {
            if(node === node.parent.left){
                node.parent.left = temp
            }else {
                node.parent.right = temp
            }
        }
        temp.left = node
        node.parent = temp
    }
}
```

# 二叉堆和堆排序

堆数据结构是一种特殊的**二叉树**，所以也叫做**二叉堆**。

能高效、迅速找出最大、最小值，常被应用于优先队列。 **堆排序算法**是使用的**二叉堆**数据类型。

## 1. 特性

1. 是一颗完整的二叉树，每一层都**必须有左右两侧子节点**，**最后一层尽可能为左侧节点**。 这就是**结构特性**
2. 二叉堆不是最大就是最小堆。 分别允许迅速导出树的最大、最小值。 这就是**堆特性**。

> 二叉堆不一定是二叉搜索树，二叉堆每个子节点都会大于等于或小于等于父节点。   
>
> 二叉搜索树则是左侧小于，而右侧大于。

## 2. 创建最小堆
TODO 二叉堆


# 图

TODO 图

# 排序算法

```js
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
}

function defaultCompare(a, b){
    if(a === b)return 0
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]]; // ES2015 的方式
}
```

## 1. 冒泡排序

```js
function modifiedBubbleSort(arr, compareFn = defaultCompare) {
    const { length } = arr
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (compareFn(arr[j], arr[j + 1]) === Compare.BIGGER_THAN) {
                swap(arr, j, j + 1)
            }
        }
    }
    return arr
}
```

## 2. 选择排序

找到最小值放到第一位， 然后继续循环找到最小值，然后放到第二位。 循环直到结束。

```js
function selectionSort(arr, compareFn = defaultCompare){
    const { length } = arr
    let minIdx;
    for (let i = 0; i < length; i++) {
        // 假设当前为最小值 保存索引
        minIdx = i
        for (let j = i + 1; j < length; j++) {
            if (compareFn(arr[minIdx], arr[j]) === Compare.BIGGER_THAN) {
                minIdx = j
            }
        }
        if (minIdx !== i) {
            swap(arr, i, minIdx)
        }
    }
    console.log("🚀🚀 ~ selectionSort ~ arr:", arr)
    return arr
}
```

## 3. 插入排序

将数组拆分为两部分，左边是有序的，右边是无序的。

第一层循环的当前元素， 与左侧有序的数组不断对比，直到找到一个比它小的值，然后插入进左侧。

```js
function insertionSort(arr, compareFn = defaultCompare) {
    const { length } = arr
    let temp
    for (let i = 0; i < length; i++) {
       let j = i
       temp = arr[i]        
       while (j > 0 && compareFn(arr[j - 1], temp) === Compare.BIGGER_THAN) {
            arr[j] = arr[j - 1]
            j--
       }
       arr[j] = temp
    }
    console.log("🚀🚀 ~ insertionSort ~ arr:", arr)
    return arr
}
```

## 4. 归并排序

> 数组的sort方法，Mozilla firefox使用的是归并排序。
>
> 归并排序是一种**分而治之**算法，将数组切分为小数组，排序完成后归并为一个大数组。

由于是 分治算法，所以也是需要递归。  声明**两个函数**， 一个用于**将大数组拆分为小数组并调用排序辅助函数**， 另一个则是**排序辅助函数，合并归并小数组为大数组**

```js
function mergeSort(arr, compareFn = defaultCompare){
    // 算法为递归算法， 需要一个终止条件 如果只有1个元素则是已经排序
    if(arr.length > 1){
        const { length } = arr
        const middle = Math.floor(length / 2)
        // 将数组拆分
        const left = mergeSort(arr.slice(0, middle), compareFn)
        const right = mergeSort(arr.slice(middle), compareFn)
        arr = merge(left, right, compareFn)
    }
    console.log("🚀🚀 ~ mergeSort ~ arr:", arr)
    return arr
}

function merge(left, right, compareFn){
    let i = 0 
    let j = 0
    const result = []
    while(i < left.length && j < right.length){
        result.push(
            compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]
        )
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}
```

## 5. 快速排序

快速排序也许是最常用排序算法，复杂度为 **O(nlog(n))**。

与归并排序一致，也是使用了**分而治之**的方法，将原始数字分为较小数组。

> chrome使用的sort方法源码使用的是 快速排序的变体。
>
> 主体思路是从数组中间选择值为**主元**， 创建双指针，左侧找到比主元大的，右侧找到比主元小的然后交换他们。


```js
// 排序递归函数
function quick(array, left, right, compareFn){
    let index // 帮助分离数组较小、较大值
    if(array.length > 1){
        // 主元为划分后的返回值
        index = partition(array, left, right, compareFn)
        // 较小值数组还有元素
        if(left < index - 1){
            quick(array, left, index - 1, compareFn)
        }
        // 较大值数组还有元素
        if(index < right){ 
            quick(array, index, right, compareFn)
        }
    }
    return array
}
// 划分数组 且交换
function partition(array, left, right, compareFn){
    // 中间值作为主元
    const pivot = array[Math.floor((right + left) / 2)]
    // 初始化指针为 两端指针
    let i = left
    let j = right
    // 指针不交叠就执行划分操作
    while(i <= j){
        // 左指针找到比主元大的元素
        while(compareFn(array[i], pivot) === Compare.LESS_THAN){
            i++
        }
        // 右指针找到比主元小的元素
        while(compareFn(array[j], pivot) === Compare.BIGGER_THAN){
            j--
        }
        // 左指针不能超过右指针 交错
        if(i <= j){
            // 交换位置 并移动指针
            swap(array, i, j)
            i++
            j--
        }
    }
    // 返回左指针 用于分离子数组
    return i
}

// 主方法 调用排序函数
function quickSort(array, compareFn = defaultCompare){
    return quick(array, 0, array.length - 1, compareFn)
}

console.log(quickSort(arr))
```

## 6. 计数排序

计数排序是**分布式排序**。 使用已组织好的辅助数据结构(桶)，记录元素在数组中出现的次数。

所有元素技术完成后，临时数组排好序且可迭代构建排序后的结果数组。

```js
function countingSort(array){
    // 如果数组长度为1 不需要排序
    if(array.length < 2) return array
    // 找到数组最大值并 创建一个从0到最大值的计数数组
    const maxValue = findMaxValue(array)
    const counts = new Array(maxValue + 1)
    // 统计数组元素 按序(索引) 出现次数
    array.forEach( item => {
        if(!counts[item]){
            counts[item] = 0
        }
        counts[item]++
    } )
    // 负数作为索引会出现排序问题
    let sortIndex = 0
    // 循环计数数组 item: 是出现次数 idx: 是索引也是原数组的值
    counts.forEach( (item, idx) => {
        while(item > 0){
            array[sortIndex++] = idx
            item--
        }
    })
    return array
}

function findMaxValue (array){
    let max = array[0]
    array.forEach( v => {
        if(v > max){
            max = v
        }
    })
    return max
}
```

## 7. 桶排序

桶排序(箱排序)也是**分布式排序算法**。  将元素分为不同的桶(较小数组)， 在使用简单的排序算法如(插入排序)，对 每个桶排序后合并为结果数组。

```js
function bucketSort(array, bucketSize = 5){
    if(array.length < 2)return array
    // 将元素拆分放置桶
    const buckets = createBuckets(array, bucketSize)
    // 执行桶
    return sortBuckets(buckets)
}

function insertionSort(arr, compareFn = defaultCompare) {
    const { length } = arr
    let temp
    for (let i = 0; i < length; i++) {
       let j = i
       temp = arr[i]        
       while (j > 0 && compareFn(arr[j - 1], temp) === Compare.BIGGER_THAN) {
            arr[j] = arr[j - 1]
            j--
       }
       arr[j] = temp
    }
    return arr
}

/**
 * 计算桶容量、初始化桶数据(矩阵)、元素放置桶中
 * @param {Array} array 数组
 * @param {Number} bucketSize  桶数
 */
function createBuckets(array, bucketSize){
    let minValue = array[0]
    let maxValue = array[0]
    array.forEach( item => {
        // 找出数组的最大值、最小值
        if(item < minValue){
            minValue = item
        }else if(item >maxValue){
            maxValue = item
        }
    })
    // 计算差值稀疏程度 决定桶容量
    let bucketCount = Math.floor( (maxValue - minValue) / bucketSize ) + 1
    const buckets = []
    // 初始化桶结构
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = []        
    }
    // 元素分别扔入桶中
    array.forEach( (item, idx) => {
        const insertBucketIdx = Math.floor( (item - minValue) / bucketSize )
        buckets[insertBucketIdx].push(item)
    })
    return buckets
}

function sortBuckets(buckets){
    const sortedArray = []
    buckets.forEach( item => {
        if(item != null){
            insertionSort(item)
            sortedArray.push(...item)
        }
    })
    return sortedArray
}
```

## 8. 基数排序

基数排序也是一个**分布式算法**， 是根据数字的有效位来将整数放置桶中。

例如10进制，则有10个桶， 从个位数开始进行排序。

```js
function radixSort(array, radixBase = 10){
    if(array.length < 2)return array
    let minValue = array[0]
    let maxValue = array[0]
    array.forEach( item => {
        // 找出数组的最大值、最小值
        if(item < minValue){
            minValue = item
        }else if(item >maxValue){
            maxValue = item
        }
    })
    let significantDigit = 1
    while( (maxValue - minValue) / significantDigit >= 1 ){
        array = countingSortForRadix(array, radixBase, significantDigit, minValue)
        significantDigit *= radixBase
    }
    return array
}

function countingSortForRadix(array, radixBase, significantDigit, minValue){
    let bucketsIndex;
    const buckets = []
    const aux = []
    for(let i = 0; i < radixBase; i++){
        buckets[i] = 0
    }
    for(let i = 0; i < array.length; i++){
        // 计算出当前元素 significantDigit 位的数字
        bucketsIndex = Math.floor((array[i] - minValue) / significantDigit) % radixBase
        buckets[bucketsIndex]++
    }
    for(let i = 1; i < radixBase; i++){
        buckets[i] += buckets[i - 1]
    }
    for(let i = array.length - 1; i >= 0; i--){
        // 计算出当前元素 significantDigit 位的数字
        bucketsIndex = Math.floor((array[i] - minValue) / significantDigit) % radixBase
        aux[--buckets[bucketsIndex]] = array[i]
    }
    for(let i = 0; i < array.length; i++){
        array[i] = aux[i]
    }
    return array
}
```

# 搜索算法

之前实现的BinarySearchTree的search方法和LinkedList的indexOf都是搜索算法，只不过不知道他们的正式名称。

## 1. 顺序搜索

顺序搜索或线性搜索都是最基本的搜索算法，也是**最低效的**搜索算法。

机制是将每一个元素都和我们要找的元素进行比较。

```js
const DOES_NOT_EXIST = -1

function defaultEquals(a, b) {
    return a === b
}
function sequentialSearch(array, value, equalsFn = defaultEquals){
    for (let i = 0; i < array.length; i++) {
        if (equalsFn(value, array[i])) {
            return i
        }
    }
    return DOES_NOT_EXIST
}
```

## 2. 二分搜索

二分搜索原理与猜数字的游戏类似， 某人说 猜1-100的整数，而我们报数，对方回应是高了还是低了。

**这个算法是要求数据结构是已经排序的了。**

```js
function binarySearch(array, value, compareFn = defaultEquals){
    const sortedArray = quickSort(array)
    let low = 0
    let high = sortedArray.length - 1
    while(lesserOrEqual(low, high, compareFn)){
        const mid = Math.floor((low + high) / 2)
        const element = sortedArray[mid]
        if(compareFn(element, value) === Compare.LESS_THAN){
            low = mid + 1
        }else if(compareFn(element, value) === Compare.BIGGER_THAN){
            high = mid - 1
        }else {
            return mid
        }
    }
    return DOES_NOT_EXIST
}

function lesserOrEqual(left, right, compareFn){
    const comp = compareFn(left, right)
    return comp === comp.LESS_THAN || comp === Compare.EQUALS
}
```

## 3. 内插搜索

TODO 理解深刻后写入

# 随机算法

Fisher-Yates随机算法

```js
function shuffle(array){
    for (let i = 0; i < array.length; i++) {
        const randomIdx = Math.floor(Math.random() * ( i + 1 ))
        swap(array, i, randomIdx)
    }
    return array
}
```

# 算法设计与技巧

## 1. 分而治之

分而治之是将问题分成多个与原问题相似的小问题，递归解决后合并解决原问题。

## 2. 动态规划



## 3. 贪心算法



## 4. 回溯算法


# 算法复杂度

大O表示法，将算法按照消耗的时间进行分类，分析算法时，通常遇到以下几类函数:

| 符号 | 名称 |
| --- | --- |
| O(1) | 常数 |
| O(log(n)) | 对数 |
| O((log(n))c) | 对数多项式 |
| O(n) | 线性 |
| O(n²) | 二次的 |
| O(n^c) | 多项式的 |
| O(c^n) | 指数的 |
