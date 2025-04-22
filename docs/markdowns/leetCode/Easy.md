:::tip

世界上只有两种脑子，一种是刷过算法的，一种是没刷过算法的。

刷过算法的脑子多少有点..小可爱

:::

## 数组查找两数之和的下标 <Badge type="tip" text="2025.04.12" />

```ts
function twoSum(nums: number[], target: number): number[] {
  // 使用哈希表存储数组元素和索引
  let map = new Map<number, number>();
  // 遍历数组
  for (let i = 0; i < nums.length; i++) {
    // 计算当前元素需要的补数
    let complement = target - nums[i];
    // 如果补数在哈希表中，返回当前索引和补数的索引
    if (map.has(complement)) {
      // 补数的索引在哈希表中
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }
  return [];
}
```

## 回文数 <Badge type="tip" text="2025.04.14" />

题目是给出整数 x，判断 x 是否是回文数。

第一反应是用字符串来做，直接反转字符串比较

```ts
function isPalindrome(x: number): boolean {
  if (x >= 0 && x < 10) return true;
  let xArr = x.toString().split("");
  let xArrReverse = xArr.reverse();
  let xArrReverseJoin = xArrReverse.join("");
  if (xArrReverseJoin === x.toString()) {
    return true;
  }
  return false;
}
```

:::danger 思路优化

转为字符串的空间、时间复杂度都不太好， 那么就进一步考虑下优化。

可以考虑数字的特性：

- 边界排除所有负数、个位数为 0 的数
- 反转后半部分的数字就可以判断
- 反转数字的方式：
  1. 数字最后一位通过`%10`去除
  2. 数字除以 10，向上取整去掉最后一位，然后继续`%10`取第二位，以此循环
- 是否翻转过半了?
  1. 偶数情况下： 由于原数字一直在不断被截取最后一位，当新数字等于原数字时，说明已经翻转过半了
  2. 奇数情况下： 由于原数字一直在不断被截取最后一位，当新数字大于原数字时，说明已经翻转过半了

:::

```ts
function isPalindrome(x: number): boolean {
  // 边界情况处理
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  // 翻转的结果数字
  let reverseNumber: number = 0;
  while (x > reverseNumber) {
    // 取余数得到最后一位数字
    reverseNumber = reverseNumber * 10 + (x % 10);
    // 除以10去掉最后一位数字
    x = Math.floor(x / 10);
  }
  // 奇数情况下给去掉中间的数字
  return x == reverseNumber || x == Math.floor(reverseNumber / 10);
}
```

## 罗马数字转整数 <Badge type="tip" text="2025.04.14" />

罗马数字字符和对应数字如下：

| 字符 | 数字 |
| :--: | :--: |
|  I   |  1   |
|  V   |  5   |
|  X   |  10  |
|  L   |  50  |
|  C   | 100  |
|  D   | 500  |
|  M   | 1000 |

另外还有一种情况： 如 4 不是`IIII`, 而是`IV`， 9 不是`VIIII`, 而是`IX`。

I 放在 V 和 X 的前面，表示 1 减去 5 和 10。
X 放在 L 和 C 的前面，表示 10 减去 50 和 100。
C 放在 D 和 M 的前面，表示 100 减去 500 和 1000。

```ts
function romanToInt(s: string): number {
  let result: number = 0;
  // 枚举对象，存储罗马数字和对应的整数值
  let emum = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  while (s.length) {
    // 取出前两个字符
    let first = s[0];
    let second = s[1];
    // 如果第二个字符存在，并且第一个字符对应的值小于第二个字符对应的值
    // 说明是存在 IX = 9 这种情况
    if (second && emum[first] < emum[second]) {
      // 题目说明了不会存在 IL这种不合法的情况。不用判断
      result += emum[second] - emum[first];
      s = s.slice(2);
    } else {
      result += emum[first];
      s = s.slice(1);
    }
  }
  return result;
}
```

## 最长公共前缀 <Badge type="tip" text="2025.04.14" />

给出一个字符串数组，找出其中最长的公共前缀。

```ts
function longestCommonPrefix(strs: string[]): string {
  let result: string[] = [];
  // 抽出第一个字符串
  let [firstStr, ...restStrs] = strs;
  // 循环第一个字符串
  for (let i = 0; i < firstStr.length; i++) {
    // 如果其余字符串的当前字符和第一个字符串的当前字符相同
    // 则将当前字符加入结果数组中
    if (restStrs.every((str) => str[i] === firstStr[i])) {
      result.push(firstStr[i]);
    }
  }
  return result.join("");
}
```

## 有效的括号 <Badge type="tip" text="2025.04.14" />

括号的对称性，构成了栈的结构， 栈顶的元素一定是最后入栈的元素，且一定是先出栈的元素(也就是先闭合)

```ts
function isValid(s: string): boolean {
  let ENUM = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  // 使用栈的数据结构， 后进先出
  // 遇到右箭头那么就栈顶推出一个左箭头
  const leftStack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const chart = s[i];
    // 左括号入栈
    if (chart in ENUM) {
      leftStack.push(chart);
    } else if (Object.values(ENUM).includes(chart)) {
      // 如果是右箭头， 那么就判断栈顶是否有左箭头
      const left = leftStack.pop();
      // 栈顶匹配不对
      if (ENUM[left as string] !== chart) {
        return false;
      }
    }
  }
  // 栈没有清空
  if (leftStack.length) {
    return false;
  }
  return true;
}
```

## 合并两个有序链表 <Badge type="tip" text="2025.04.14" />

给定两个链表，按照有序的顺序合并两个链表。

:::info

链表结构 val 当前值，next 为下一个值。 如下:

```ts
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
```

:::

```ts
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  // 创建一个虚拟链表头节点， 方便操作
  const dummyHead = new ListNode(-1);
  // 当然节点指针
  let current = dummyHead;
  // 一直到有一个链表为空
  while (list1 && list2) {
    // 比较两个链表的当前节点， 将较小的节点连接到结果链表中
    if (list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    // 切换当前指针
    current = current.next;
  }
  // 连接剩余的节点
  current.next = list1 || list2;

  return dummyHead.next;
}
```

## 删除有限数组中的重复项 <Badge type="tip" text="2025.04.14" />

给定一个有序数组，删除重复项，使得每个元素只出现一次，返回新数组的长度。 并且数组的前(新数组的长度)个元素就是新数组的内容

**原地算法，不使用额外的空间**

```ts
function removeDuplicates(nums: number[]): number {
  // 双指针法， 快慢指针
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    // 如果快指针和慢指针不相等， 那么就将快指针的值赋值给慢指针的下一个位置
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  // 返回长度， 注意是索引加1
  return slow + 1;
}
```

## 移除元素 <Badge type="tip" text="2025.04.15" />

给定一个数组，删除指定的元素，返回新数组的长度。

使用快慢指针来实现，快指针遍历数组，慢指针记录不等于指定元素的下标。

```ts
function removeElement(nums: number[], val: number): number {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    // 如果快指针和慢指针不相等， 那么就将快指针的值赋值给慢指针的下一个位置
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
  }
  // 返回长度， 注意是索引加1
  return slow;
}
```

## 找到字符串第一个匹配项的小写法 <Badge type="tip" text="2025.04.15" />

这道题就是实现`str.indexOf`方法。

:::code-group

```ts [indexOf.ts]
function strStr(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;
  if (haystack.length < needle.length) return -1;
  return haystack.indexOf(needle);
}
```

```ts [暴力匹配.ts]
// 空间会比indexOf方法多， 但是时间复杂度是O(n*m)的暴力匹配算法
function strStr(haystack: string, needle: string): number {
  for (let i = 0; i < haystack.length; i++) {
    let flag = true;
    for (let j = 0; j < needle.length; j++) {
      // 如果当前字符不相等， 那么就跳出循环
      if (haystack[i + j] !== needle[j]) {
        flag = false;
        break;
      }
    }
    // 循环结束目标字符串仍然为true，则说明找到了
    if (flag) {
      return i;
    }
  }
  // 没有return出去，则是-1
  return -1;
}
```

```ts [KMP算法.ts]
function strStr(haystack: string, needle: string): number {
  const n = haystack.length,
        m = needle.length;
  // 如果空字符串，返回 0
  if (m === 0) {
    return 0;
  }
  // 设置一个数组，存储前缀和后缀的匹配长度
  const pi = new Array(m).fill(0);
  // 构建前缀数据
  for (let i = 1, j = 0; i < m; i++) {
    while (j > 0 && needle[i] !== needle[j]) {
      j = pi[j - 1];
    }
    if (needle[i] == needle[j]) {
      j++;
    }
    pi[i] = j;
  }
  // 循环遍历 haystack 字符串，看看
  for (let i = 0, j = 0; i < n; i++) {
    while (j > 0 && haystack[i] != needle[j]) {
      j = pi[j - 1];
    }
    if (haystack[i] == needle[j]) {
      j++;
    }
    if (j === m) {
      return i - m + 1;
    }
  }
  // 如果没有找到，返回 -1
  return -1;
}
```

:::

:::tip IMPORTANT! 
 
这道题的精髓是学习 KMP 算法！

KMP算法是三个人在1977年发表的算法, 一般是用于 字符串中快速查找子串的经典算法。 避免了在匹配失败时重复比较已经匹配过的字符串， 提高匹配效率。

:::

### KMP算法的原理

#### 前缀函数

KMP算法，需要了解一个概念： 前缀函数。  举个例子：

有字符串`aabaaab`， 前缀函数值为 0, 1, 0, 1, 2, 2, 3。

- π(0) = 0, 因为是`a`，没有真前后缀。 任何字符串π(0)=0都成立
- π(1) = 1, 因为是`aa`，真前后缀是`a`，长度为 1
- π(2) = 0, 因为是`aab`，没有真前后缀
- π(3) = 1, 因为是`aaba`，真前后缀是`a`，长度为 1
- π(4) = 2, 因为是`aabaa`，真前后缀是`aa`，长度为 2
- π(5) = 2, 因为是`aabaaa`，真前后缀是`aa`，长度为 2
- π(6) = 3, 因为是`aabaaab`，真前后缀是`aab`，长度为 3

#### 前缀函数的性质

长度为 `m` 的字符串，所有求解 前缀函数的 总时间复杂度是严格 O(m)的。 且是增量算法， 即可以一边读取字符串一边求解当前索引的前缀函数。

:::tip

以下： `π` 为前缀函数， `i` 为当前索引， `s` 为字符串， `s[0: π(i)-1]`是选中字符串的特定长度。

:::

1. **π(i) <= π(i-1) + 1**: 
  - 传入前缀函数的索引 绝对是**小于等于**传入前一索引的值 + 1。
  - 因为假如是 **3索引**前后缀是值(字符长度) **4**, 往后挪一位， **4**索引前后缀也相同最多也只能是 **5**
2. 如果 `s[i] == s[π(i-1)]`那么 `π(i) = π(i-1) + 1`：
  - 论证依据不提.没啥用也不是研究生。 
  - 如果字符串 前i项等于 字符串前 **前缀函数i-1**项 就等于 前缀函数是递增的。

那么根据 这两个特性确定算法的思路。



## 搜索插入位置 <Badge type="tip" text="2025.04.16" />

给定一个 排序升序数组和一个目标值，返回**目标值在数组中的索引**，**如果不存在，则返回它将会被插入的位置**。

```ts
function searchInsert(nums: number[], target: number): number {
  const n = nums.length;
  let left = 0, right = n - 1, ans = n;
  while (left <= right) {
    // 防止溢出
      let mid = ((right - left) >> 1) + left;
      if (target <= nums[mid]) {
          ans = mid;
          right = mid - 1;
      } else {
          left = mid + 1;
      }
  }
  return ans;

};
```

## 最后一个单词的长度 <Badge type="tip" text="2025.04.17" />

一个仅有空格和若干字符形成的字符串，找到最后一个单词的长度

```ts
function lengthOfLastWord(s: string): number {
    return s.trim().split(' ').pop()?.length || 0;
};
```

## 加1 <Badge type="tip" text="2025.04.17" />

给定一个整数数组，分别对应位数，然后进行整数的加减，最后返回数组。

如 `[1,2,3]` + 1 = `[1,2,4]` 

`[9, 9, 9]` + 1 = `[1, 0, 0, 0]`

```ts
function plusOne(digits: number[]): number[] {
  // 设置一个标志位，表示是否需要继续循环
  // 如果当前位是9，则需要进位，设置为true
  // 如果当前位不是9，则不需要进位，设置为false
  let isContinue = true;
  // 逆循环
  for(let i = digits.length - 1; i >= 0; i--){
    if(!isContinue) break;
    
    if(digits[i] === 9){
      // 如果当前位是9，则进位，设置为0
      digits[i] = 0;
      // 如果是第一位进位，添加1
      if(i === 0){
        digits.unshift(1);
        break
      }

    }else {
      // 如果当前位不是9，则不需要进位，直接加1即可
      digits[i]++;
      isContinue = false
    }
  }
  return digits;
};
```

## 二进制求和 <Badge type="tip" text="2025.04.18" />


:::code-group

```ts [暴力转换.ts]
// 直接转换为10进制， 然后进行计算。 必须使用 BigInt ， 否则会溢出
function addBinary(a: string, b: string): string {
   // 使用 BigInt 直接解析二进制字符串
   const aBigInt = BigInt("0b" + a); // 将二进制字符串转换为 BigInt
   const bBigInt = BigInt("0b" + b); // 将二进制字符串转换为 BigInt
 
   const sum = aBigInt + bBigInt; // BigInt 相加
   return sum.toString(2); // 转换为二进制字符串)
};
```

```ts [模拟二进制加法.ts]
function addBinary(a: string, b: string): string {
  // 返回答案
  let answer = "";
  // 
  let carry = 0;
  // 最长循环的长度
  let lastLength = Math.max(a.length, b.length);
  for (let i = 0; i < lastLength; i++) {
    // 从后往前取值
    // 取值时如果没有值则用0代替
    const aNum = Number(a[a.length - 1 - i] || 0);
    const bNum = Number(b[b.length - 1 - i] || 0);
    // 当前位数的和
    const sum = aNum + bNum + carry;
    // `
    // ${求和， 但是可能已经有剩下的carry为1， 所以需要模2，类似与 999，每一位都需要进} 
    // ${已经计算的值}
    // `
    answer = (sum % 2) + answer;
    // 消耗一次2，向下取整
    carry = Math.floor(sum / 2);
  }
  // 循环结束后还有剩余的 溢出进1 直接加在最前面即可
  if (carry) {
    answer = carry + answer;
  }
  return answer
}
```

```ts [位运算处理.ts]
function addBinary(a: string, b: string): string {
  // 位运算
  let x = BigInt('0b' + a);
  let y = BigInt('0b' + b);

  while (y !== 0n) {
    const carry = x & y;
    x = x ^ y;
    y = carry << 1n;
  }

  return x.toString(2);
};
```

:::

## x的平方根 <Badge type="tip" text="2025.04.22" />


::: code-group

```ts [数学公式推导.ts]
function mySqrt(x: number): number {
    if(x == 0){
        return 0;
    }
    let ans = Math.floor(Math.exp(Math.log(x) * 0.5));
    return (ans + 1) * (ans + 1) <= x ? ans + 1 : ans;
};
```

```ts [二分法.ts]

```

```ts [牛顿迭代法.ts]

```

:::